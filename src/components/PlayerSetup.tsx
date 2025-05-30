import { useState } from 'react';
import { TextField, Typography, Box, List, ListItem, IconButton } from '@mui/material';
import type { Player } from '../types';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledCard } from './StyledCard';
import { AppHeader } from './AppHeader';
import { StyledButton } from './StyledButton';
import { GiEightBall } from 'react-icons/gi';

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
      <AppHeader title="Poker Pool Calculator" />
      
      <StyledCard>
        <Typography variant="body1" gutterBottom sx={{ color: 'white' }}>
          Enter the names of all players participating in the poker pool.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            label="Player Name"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
            variant="outlined"
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
          <StyledButton variant="contained" onClick={handleAddPlayer}>
            Add
          </StyledButton>
        </Box>
      </StyledCard>
      
      {players.length > 0 && (
        <StyledCard>
          <Typography variant="h6" gutterBottom sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
            <GiEightBall /> Players ({players.length})
          </Typography>
          <List>
            {players.map((player) => (
              <ListItem
                key={player.id}
                sx={{
                  borderRadius: '4px',
                  mb: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  },
                }}
                secondaryAction={
                  <IconButton edge="end" onClick={() => onRemovePlayer(player.id)} sx={{ color: 'rgba(255, 0, 0, 0.7)' }}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <Typography sx={{ color: 'white' }}>{player.name}</Typography>
              </ListItem>
            ))}
          </List>
        </StyledCard>
      )}
      
      <StyledButton
        variant="contained"
        color="primary"
        disabled={players.length < 2}
        onClick={onContinue}
        fullWidth
        sx={{ mt: 2 }}
      >
        Continue to Games
      </StyledButton>
      
      {players.length < 2 && (
        <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
          Add at least 2 players to continue
        </Typography>
      )}
    </Box>
  );
}; 