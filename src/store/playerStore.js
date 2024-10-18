import { create } from 'zustand';
import players from '../constants/players';

export const usePlayersStore = create((set) => ({
  players: players, // Initial empty state for players
  setPlayers: (players) => set(() => ({ players })), // Set the players list
  resetPlayers: () => set((state) => ({
    players: state.players.map((player) => ({
      ...player,
      IsPlaying: false, // Reset IsPlaying status for all players
    })),
  })),
  updatePlayerStatus: (index, isPlaying) =>
    set((state) => {
      const updatedPlayers = [...state.players];
      updatedPlayers[index].IsPlaying = isPlaying;
      return { players: updatedPlayers };
    }),
}));
