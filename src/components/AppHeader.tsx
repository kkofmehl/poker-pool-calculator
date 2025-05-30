import { Box, Typography, useTheme } from '@mui/material';
import { GiEightBall, GiPokerHand } from 'react-icons/gi';

export const AppHeader = ({ title }: { title: string }) => {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 3,
        position: 'relative',
      }}
    >
      <Box 
        sx={{ 
          position: 'absolute', 
          left: 0, 
          display: 'flex', 
          alignItems: 'center',
          color: theme.palette.secondary.main,
          fontSize: '2rem'
        }}
      >
        <GiEightBall />
      </Box>
      
      <Typography 
        variant="h4" 
        component="h1" 
        align="center" 
        gutterBottom
        sx={{ 
          fontWeight: 'bold',
          color: '#ffffff',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          background: 'linear-gradient(to right, #2e7d32, #1e4620)',
          padding: '8px 24px',
          borderRadius: '4px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          letterSpacing: '1px',
        }}
      >
        {title}
      </Typography>
      
      <Box 
        sx={{ 
          position: 'absolute', 
          right: 0, 
          display: 'flex', 
          alignItems: 'center',
          color: theme.palette.secondary.main,
          fontSize: '2rem'
        }}
      >
        <GiPokerHand />
      </Box>
    </Box>
  );
}; 