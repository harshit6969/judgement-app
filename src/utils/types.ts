

export type Player = {
  ID: number;
  Name?: string;
  IsMF?: boolean;
  Profile?: string;
  ColorCode?: string;
  CurrentRoundScore?: number | undefined;
  TotalScore?: number;
  Scores?: number[];
};

export type PlayerState = {
  available: Player[];
  selected: Player[];
  checked: Player[];
};

export interface PlayerListItemProps {
  player: Player;
  checked: boolean;
}

export interface PlayerListProps {
  title: string;
  players: Player[];
}

export interface GameState {
  id: string;
  players: Player[];
  currentRound: number;
  status: number;
  createdAt: number;
  loading: boolean;
}
export type GameStore = GameState & {
  loadGameState: (gameId: string | undefined) => Promise<void>;
  toggleRound: () => Promise<void>;
  resetGame: () => Promise<void>;
  updateStatus: (status: GameState['status']) => Promise<void>;
  updateCurrentScore: (index: number, value: number) => void;
  completeRound: (opts: CheckboxOptions) => Promise<void>;
};


export type CheckboxOptions = Map<number, boolean>;


export type ThemeMode = 'light' | 'dark' | 'system';

export type Notification = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
};
export interface AppStore {
  // Theme management
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;

  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;

  // Loading states
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}
