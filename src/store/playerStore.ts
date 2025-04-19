// src/store/gameStore.ts
import { create } from 'zustand';
import { GameState, Player, PlayerState } from '../utils/types';
import { gameDB } from '../utils/db';
import { createSelectors } from '../utils/helper';
import { GAME_INITIAL_STATE, PLAYER_INITIAL_STATE } from '../utils/constants';

type PlayerStore = PlayerState & {
    togglePlayer: (player: Player) => void;
    toggleAllPlayers: (players: Player[]) => void;
    transferPlayers: (direction: 'left' | 'right') => void;
    initGame: (players: Player[]) => Promise<string>;
}

const PlayerStore = create<PlayerStore>((set, get) => ({
    ...PLAYER_INITIAL_STATE,
    togglePlayer: (player) => {
        const state = get();
        const checked = state.checked.includes(player)
            ? state.checked.filter(p => p !== player)
            : [...state.checked, player];
        set({ checked: checked });
    },
    toggleAllPlayers: (players) => {
        const state = get();
        const allSelected = state.checked.length === players.length;
        const checked = allSelected ? [] : [...players];
        set({ checked: checked });
    },
    transferPlayers: (direction) => {
        console.log(direction);
        const { available, selected, checked } = get();
        const isRight = direction === 'right';
        const playersToTransfer = isRight
            ? available.filter(player => checked.includes(player))
            : selected.filter(player => checked.includes(player));
        set({
            available: isRight
                ? available.filter(player => !checked.includes(player))
                : [...available, ...playersToTransfer],
            selected: isRight
                ? [...selected, ...playersToTransfer]
                : selected.filter(player => !checked.includes(player)),
            checked: [], // Clear checked after transfer
        });
    },
    initGame: async (players) => {
        const record: GameState = {
            ...GAME_INITIAL_STATE,
            players,
        }
        await gameDB.saveGame(record);
        return record.id;
    },
}));

const usePlayerStore = createSelectors(PlayerStore);

export default usePlayerStore;