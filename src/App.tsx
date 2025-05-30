import { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { PlayerSetup } from './components/PlayerSetup';
import { GameManager } from './components/GameManager';
import { Summary } from './components/Summary';
import type { Player, Game, AppState } from './types';

// Create a theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2e7d32', // Poker green
    },
    secondary: {
      main: '#c62828', // Cards red
    },
  },
});

// Local storage key for our app state
const STORAGE_KEY = 'poker-pool-calculator-state';

function App() {
  // Initialize state
  const [players, setPlayers] = useState<Player[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState<'setup' | 'games' | 'summary'>('setup');

  // Load state from local storage
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const { players, games, currentPage } = JSON.parse(savedState) as AppState;
        setPlayers(players);
        setGames(games);
        setCurrentPage(currentPage);
      } catch (error) {
        console.error('Failed to load saved state:', error);
      }
    }
  }, []);

  // Save state to local storage
  useEffect(() => {
    const state: AppState = {
      players,
      games,
      currentPage,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [players, games, currentPage]);

  // Player management
  const handleAddPlayer = (player: Player) => {
    setPlayers([...players, player]);
  };

  const handleRemovePlayer = (playerId: string) => {
    setPlayers(players.filter(player => player.id !== playerId));
  };

  // Game management
  const handleAddGame = (game: Game) => {
    setGames([...games, game]);
  };

  // Reset everything
  const handleReset = () => {
    setPlayers([]);
    setGames([]);
    setCurrentPage('setup');
  };

  // Navigation
  const navigateToGames = () => setCurrentPage('games');
  const navigateToSummary = () => setCurrentPage('summary');
  const navigateToSetup = () => setCurrentPage('setup');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {currentPage === 'setup' && (
        <PlayerSetup
          players={players}
          onAddPlayer={handleAddPlayer}
          onRemovePlayer={handleRemovePlayer}
          onContinue={navigateToGames}
        />
      )}
      
      {currentPage === 'games' && (
        <GameManager
          players={players}
          games={games}
          onAddGame={handleAddGame}
          onContinue={navigateToSummary}
          onBack={navigateToSetup}
        />
      )}
      
      {currentPage === 'summary' && (
        <Summary
          players={players}
          games={games}
          onBack={navigateToGames}
          onReset={handleReset}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
