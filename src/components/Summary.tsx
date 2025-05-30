import { useMemo } from 'react';
import { 
  Box, Typography, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import type { Player, Game, Transaction } from '../types';
import { AppHeader } from './AppHeader';
import { StyledCard } from './StyledCard';
import { StyledButton } from './StyledButton';
import { GiCoins, GiMoneyStack, GiSpades } from 'react-icons/gi';

interface SummaryProps {
  players: Player[];
  games: Game[];
  onBack: () => void;
  onReset: () => void;
}

export const Summary = ({ players, games, onBack, onReset }: SummaryProps) => {
  // Calculate updated balances for each player based on games
  const updatedPlayers = useMemo(() => {
    return players.map(player => {
      let balance = 0;
      
      // For each game
      games.forEach(game => {
        const wageredAmount = game.wager;
        
        // If this player won this game
        if (game.winnerId === player.id) {
          // Winner gets wager amount from each player (minus their own wager)
          balance += wageredAmount * (players.length - 1);
        } else {
          // Losers pay the wager amount
          balance -= wageredAmount;
        }
      });
      
      return { ...player, balance };
    });
  }, [players, games]);

  // Calculate settlement transactions
  const settlements = useMemo(() => {
    const transactions: Transaction[] = [];
    const debtors = updatedPlayers.filter(p => p.balance < 0);
    const creditors = updatedPlayers.filter(p => p.balance > 0);
    
    // Sort by amount (descending for creditors, ascending for debtors)
    debtors.sort((a, b) => a.balance - b.balance);
    creditors.sort((a, b) => b.balance - a.balance);
    
    // Create a copy of players to track remaining balances
    const remainingBalances = new Map<string, number>();
    updatedPlayers.forEach(p => remainingBalances.set(p.id, p.balance));
    
    // Settle debts
    for (const debtor of debtors) {
      let debtorRemaining = Math.abs(remainingBalances.get(debtor.id) || 0);
      
      for (const creditor of creditors) {
        if (debtorRemaining <= 0) break;
        
        const creditorRemaining = remainingBalances.get(creditor.id) || 0;
        if (creditorRemaining <= 0) continue;
        
        const transferAmount = Math.min(debtorRemaining, creditorRemaining);
        
        if (transferAmount > 0) {
          transactions.push({
            from: debtor.id,
            to: creditor.id,
            amount: transferAmount
          });
          
          // Update remaining balances
          remainingBalances.set(debtor.id, (remainingBalances.get(debtor.id) || 0) + transferAmount);
          remainingBalances.set(creditor.id, (remainingBalances.get(creditor.id) || 0) - transferAmount);
          debtorRemaining -= transferAmount;
        }
      }
    }
    
    return transactions;
  }, [updatedPlayers]);

  const getPlayerNameById = (playerId: string): string => {
    const player = players.find(p => p.id === playerId);
    return player ? player.name : 'Unknown player';
  };

  const formatMoney = (amount: number): string => {
    return `$${Math.abs(amount).toFixed(2)}`;
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <AppHeader title="Poker Pool Summary" />

      <StyledCard>
        <Typography variant="h6" gutterBottom sx={{ 
          color: 'white', 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1 
        }}>
          <GiMoneyStack /> Player Balances
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Player</TableCell>
                <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Balance</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {updatedPlayers.map((player) => (
                <TableRow 
                  key={player.id}
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                    '&:last-child td, &:last-child th': {
                      border: 0,
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  <TableCell sx={{ color: 'white' }}>{player.name}</TableCell>
                  <TableCell align="right" sx={{ color: 'white' }}>{formatMoney(player.balance)}</TableCell>
                  <TableCell>
                    {player.balance > 0 
                      ? <Typography color="#4caf50" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                          <GiCoins /> Winning
                        </Typography> 
                      : player.balance < 0 
                        ? <Typography color="#f44336" sx={{ fontWeight: 'bold' }}>Owes Money</Typography>
                        : <Typography color="text.secondary">Break Even</Typography>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledCard>

      <StyledCard>
        <Typography variant="h6" gutterBottom sx={{ 
          color: 'white', 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1 
        }}>
          <GiSpades /> Settlement Plan
        </Typography>
        
        {settlements.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>From</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>To</TableCell>
                  <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {settlements.map((transaction, index) => (
                  <TableRow 
                    key={index}
                    sx={{
                      '&:nth-of-type(odd)': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      },
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    <TableCell sx={{ color: 'white' }}>{getPlayerNameById(transaction.from)}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{getPlayerNameById(transaction.to)}</TableCell>
                    <TableCell align="right" sx={{ color: 'white' }}>{formatMoney(transaction.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography sx={{ color: 'white' }}>No settlements needed. Everyone is even!</Typography>
        )}
      </StyledCard>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <StyledButton variant="outlined" onClick={onBack} color="secondary">
          Back to Games
        </StyledButton>
        <StyledButton variant="contained" color="error" onClick={onReset}>
          Reset All
        </StyledButton>
      </Box>
    </Box>
  );
}; 