export interface Player {
  id: string;
  name: string;
  balance: number;
}

export interface Game {
  id: string;
  wager: number;
  winnerId: string;
  date: string;
}

export interface Transaction {
  from: string;
  to: string;
  amount: number;
}

export interface AppState {
  players: Player[];
  games: Game[];
  currentPage: 'setup' | 'games' | 'summary';
} 