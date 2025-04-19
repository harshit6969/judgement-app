import players from "./players";
import { GameState, PlayerState } from "./types";

export const GAME_INITIAL_STATE: GameState = {
    id: crypto.randomUUID(),
    players: [],
    currentRound: 1,
    status: 0,
    createdAt: Date.now(),
    loading: true,
};


export const PLAYER_INITIAL_STATE: PlayerState = {
    available: players,
    selected: [],
    checked: [],
};