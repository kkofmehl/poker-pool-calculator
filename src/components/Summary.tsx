import { useMemo } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, 
  Button 
} from '@mui/material';
import type { Player, Game, Transaction } from '../types';

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
      <Typography variant="h4" gutterBottom>
        Poker Pool Summary
      </Typography>

      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Player Balances
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Player</TableCell>
                <TableCell align="right">Balance</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {updatedPlayers.map((player) => (
                <TableRow key={player.id}>
                  <TableCell>{player.name}</TableCell>
                  <TableCell align="right">{formatMoney(player.balance)}</TableCell>
                  <TableCell>
                    {player.balance > 0 
                      ? <Typography color="success.main">Winning</Typography> 
                      : player.balance < 0 
                        ? <Typography color="error.main">Owes Money</Typography>
                        : <Typography color="text.secondary">Break Even</Typography>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Settlement Plan
        </Typography>
        
        {settlements.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {settlements.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{getPlayerNameById(transaction.from)}</TableCell>
                    <TableCell>{getPlayerNameById(transaction.to)}</TableCell>
                    <TableCell align="right">{formatMoney(transaction.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>No settlements needed. Everyone is even!</Typography>
        )}
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button variant="outlined" onClick={onBack}>
          Back to Games
        </Button>
        <Button variant="contained" color="error" onClick={onReset}>
          Reset All
        </Button>
      </Box>
    </Box>
  );
}; 