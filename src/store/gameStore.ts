// src/store/gameStore.ts
import { create } from 'zustand';
import { CheckboxOptions, GameMode, GameStore } from '../utils/types';
import { gameDB } from '../utils/db';
import { createSelectors, rotatePlayers } from '../utils/helper';
import { GAME_INITIAL_STATE } from '../utils/constants';

const useGameStore = create<GameStore>((set, get) => ({
  ...GAME_INITIAL_STATE,
  loadGameState: async (gameId) => {
    if (!gameId) return;
    set({ loading: true });
    try {
      const savedGame = await gameDB.loadGame(gameId);
      if (savedGame) {
        set({ ...savedGame, loading: false });
      }
    } catch (error) {
      console.error('Failed to load game:', error);
    } finally {
      set({ loading: false });
    }
  },
  toggleRound: async () => {
    const state = get();
    let newState = {};
    if (state.status === GameMode.IDLE) {
      newState = {
        status: state.status + 1,
        players: state.players.map((p) => ({ ...p, CurrentRoundScore: undefined })),
      };
    } else {
      newState = {
        status: state.status + 1,
      }
    }
    set(newState);
  },

  resetGame: async () => {
    const newState = GAME_INITIAL_STATE;
    set(newState);
    await gameDB.saveGame(newState);
  },
  updateStatus: async (status) => {
    const state = get();
    const newState = { ...state, status };
    set(newState);
    await gameDB.saveGame(newState);
  },

  updateCurrentScore: (index: number, value: number) => {
    set(state => {
      const updatedPlayers = [...state.players]; // Create new array
      updatedPlayers[index] = {
        ...updatedPlayers[index], // Copy player
        CurrentRoundScore: value  // Update score
      };
      return { players: updatedPlayers }; // Return new state
    });
  },

  completeRound: async (opts: CheckboxOptions) => {
    const state = get();
    const updatedPlayers = state.players.map(player => {
      const isSuccess = opts.get(player.ID);
      const currentRoundScore = player.CurrentRoundScore ?? 0;
      const roundScore = isSuccess ? 10 + currentRoundScore : 0;
      const existingScores = player.Scores ?? [];

      return {
        ...player,
        TotalScore: (player.TotalScore ?? 0) + roundScore,
        Scores: [...existingScores, roundScore],
        CurrentRoundScore: undefined,
        PrevRoundScore: currentRoundScore,
      };
    });

    const newState = {
      ...state,
      status: GameMode.IDLE, // Return to idle state
      players: rotatePlayers(updatedPlayers),
      currentRound: state.currentRound + 1,
    };
    await gameDB.saveGame(newState);
    set(newState);
  },

  undoRound: async () => {
    const state = get();
    const { status, players, currentRound } = state;
    if (status === GameMode.ROUND_EXECUTING) {
      set({ status: GameMode.ROUND_START });
      return;
    }
    const updatedPlayers = players.map(player => {
      // Get the player's scores array (or empty array if undefined)
      const scores = player.Scores ?? [];
      
      // Get the last score (from the current round) or 0 if no scores exist
      const lastScore = scores.length > 0 ? scores[scores.length - 1] : 0;
      
      return {
        ...player,
        // Subtract the last round's score from total
        TotalScore: (player.TotalScore ?? 0) - lastScore,
        // Remove the last score from the array
        Scores: scores.slice(0, -1),
        // Restore the current round score if it existed before completion
        CurrentRoundScore: player?.PrevRoundScore, // This will preserve if it exists
        PrevRoundScore: undefined
      };
    });
    const newState = {
      ...state,
      players: rotatePlayers(updatedPlayers, -1),
      currentRound: currentRound - 1,
      status: GameMode.UNDO
    };
    set(newState);
  },
}));

export default createSelectors(useGameStore);