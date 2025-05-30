import { useState } from 'react';
import { TextField, Button, Typography, Box, List, ListItem, IconButton, Paper } from '@mui/material';
import type { Player } from '../types';
import DeleteIcon from '@mui/icons-material/Delete';

interface PlayerSetupProps {
  players: Player[];
  onAddPlayer: (player: Player) => void;
  onRemovePlayer: (playerId: string) => void;
  onContinue: () => void;
}

export const PlayerSetup = ({ players, onAddPlayer, onRemovePlayer, onContinue }: PlayerSetupProps) => {
  const [newPlayerName, setNewPlayerName] = useState('');

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      onAddPlayer({
        id: Date.now().toString(),
        name: newPlayerName.trim(),
        balance: 0
      });
      setNewPlayerName('');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Poker Pool Calculator - Player Setup
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" gutterBottom>
          Enter the names of all players participating in the poker pool.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            label="Player Name"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
          />
          <Button variant="contained" onClick={handleAddPlayer}>
            Add
          </Button>
        </Box>
      </Box>
      
      {players.length > 0 && (
        <Paper elevation={2} sx={{ mb: 3, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Players ({players.length})
          </Typography>
          <List>
            {players.map((player) => (
              <ListItem
                key={player.id}
                secondaryAction={
                  <IconButton edge="end" onClick={() => onRemovePlayer(player.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <Typography>{player.name}</Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      
      <Button
        variant="contained"
        color="primary"
        disabled={players.length < 2}
        onClick={onContinue}
        fullWidth
      >
        Continue to Games
      </Button>
      
      {players.length < 2 && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Add at least 2 players to continue
        </Typography>
      )}
    </Box>
  );
}; 