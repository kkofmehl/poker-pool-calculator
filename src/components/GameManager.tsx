import { useState } from 'react';
import { 
  Box, Typography, TextField, FormControl, 
  InputLabel, Select, MenuItem, List, ListItem,
  ListItemText, Divider
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { Player, Game } from '../types';
import { AppHeader } from './AppHeader';
import { StyledCard } from './StyledCard';
import { StyledButton } from './StyledButton';
import { GiPokerHand, GiCardAceSpades } from 'react-icons/gi';

interface GameManagerProps {
  players: Player[];
  games: Game[];
  onAddGame: (game: Game) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const GameManager = ({ 
  players, 
  games, 
  onAddGame, 
  onContinue, 
  onBack 
}: GameManagerProps) => {
  const [wager, setWager] = useState<string>('');
  const [winnerId, setWinnerId] = useState<string>('');

  const handleAddGame = () => {
    if (!wager || !winnerId || isNaN(Number(wager)) || Number(wager) <= 0) {
      return;
    }

    onAddGame({
      id: Date.now().toString(),
      wager: Number(wager),
      winnerId,
      date: new Date().toISOString()
    });

    setWager('');
    setWinnerId('');
  };

  const handleWinnerChange = (event: SelectChangeEvent) => {
    setWinnerId(event.target.value);
  };

  const getPlayerNameById = (playerId: string): string => {
    const player = players.find(p => p.id === playerId);
    return player ? player.name : 'Unknown player';
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <AppHeader title="Poker Pool Games" />

      <StyledCard>
        <Typography variant="h6" gutterBottom sx={{ 
          color: 'white', 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1 
        }}>
          <GiPokerHand /> Add New Game
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
          <TextField
            label="Wager Amount"
            type="number"
            value={wager}
            onChange={(e) => setWager(e.target.value)}
            InputProps={{ inputProps: { min: 0 } }}
            fullWidth
            sx={{ 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4caf50',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
            }}
          />
          
          <FormControl fullWidth>
            <InputLabel 
              id="winner-select-label"
              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Winner
            </InputLabel>
            <Select
              labelId="winner-select-label"
              value={winnerId}
              label="Winner"
              onChange={handleWinnerChange}
              sx={{ 
                color: 'white',
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4caf50',
                },
                '.MuiSvgIcon-root': {
                  color: 'white',
                }
              }}
            >
              {players.map((player) => (
                <MenuItem key={player.id} value={player.id}>
                  {player.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <StyledButton 
            variant="contained" 
            onClick={handleAddGame}
            disabled={!wager || !winnerId || isNaN(Number(wager)) || Number(wager) <= 0}
          >
            Add Game
          </StyledButton>
        </Box>
      </StyledCard>

      {games.length > 0 && (
        <StyledCard>
          <Typography variant="h6" gutterBottom sx={{ 
            color: 'white', 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1 
          }}>
            <GiCardAceSpades /> Game History
          </Typography>
          <List>
            {games.map((game, index) => (
              <Box key={game.id}>
                {index > 0 && <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />}
                <ListItem sx={{
                  borderRadius: '4px',
                  mb: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  },
                }}>
                  <ListItemText
                    primary={
                      <Typography color="white">
                        Game {index + 1}
                      </Typography>
                    }
                    secondary={
                      <Typography color="rgba(255, 255, 255, 0.7)" variant="body2">
                        Wager: ${game.wager.toFixed(2)} | Winner: {getPlayerNameById(game.winnerId)} | {new Date(game.date).toLocaleString()}
                      </Typography>
                    }
                  />
                </ListItem>
              </Box>
            ))}
          </List>
        </StyledCard>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <StyledButton variant="outlined" onClick={onBack} color="secondary">
          Back to Setup
        </StyledButton>
        <StyledButton 
          variant="contained" 
          onClick={onContinue} 
          disabled={games.length === 0}
        >
          View Summary
        </StyledButton>
      </Box>
    </Box>
  );
}; 