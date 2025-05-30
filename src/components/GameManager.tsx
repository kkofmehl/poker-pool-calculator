import { useState } from 'react';
import { 
  Box, Button, Typography, TextField, FormControl, 
  InputLabel, Select, MenuItem, Paper, List, ListItem,
  ListItemText, Divider
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { Player, Game } from '../types';

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
      <Typography variant="h4" gutterBottom>
        Poker Pool Calculator - Games
      </Typography>

      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add New Game
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
          <TextField
            label="Wager Amount"
            type="number"
            value={wager}
            onChange={(e) => setWager(e.target.value)}
            InputProps={{ inputProps: { min: 0 } }}
            fullWidth
          />
          
          <FormControl fullWidth>
            <InputLabel id="winner-select-label">Winner</InputLabel>
            <Select
              labelId="winner-select-label"
              value={winnerId}
              label="Winner"
              onChange={handleWinnerChange}
            >
              {players.map((player) => (
                <MenuItem key={player.id} value={player.id}>
                  {player.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Button 
            variant="contained" 
            onClick={handleAddGame}
            disabled={!wager || !winnerId || isNaN(Number(wager)) || Number(wager) <= 0}
          >
            Add Game
          </Button>
        </Box>
      </Paper>

      {games.length > 0 && (
        <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Game History
          </Typography>
          <List>
            {games.map((game, index) => (
              <Box key={game.id}>
                {index > 0 && <Divider />}
                <ListItem>
                  <ListItemText
                    primary={`Game ${index + 1}`}
                    secondary={`Wager: $${game.wager.toFixed(2)} | Winner: ${getPlayerNameById(game.winnerId)} | ${new Date(game.date).toLocaleString()}`}
                  />
                </ListItem>
              </Box>
            ))}
          </List>
        </Paper>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button variant="outlined" onClick={onBack}>
          Back to Setup
        </Button>
        <Button 
          variant="contained" 
          onClick={onContinue} 
          disabled={games.length === 0}
        >
          View Summary
        </Button>
      </Box>
    </Box>
  );
}; 