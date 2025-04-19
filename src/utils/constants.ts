import { GameState, PlayerState } from "./types";

export const GAME_INITIAL_STATE: GameState = {
    id: crypto.randomUUID(),
    players: [],
    currentRound: 1,
    status: 0,
    createdAt: Date.now(),
    loading: false,
};


export const PLAYER_INITIAL_STATE: PlayerState = {
    available: [],
    selected: [],
    checked: [],
};