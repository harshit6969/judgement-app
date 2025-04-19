import { StoreApi, UseBoundStore } from 'zustand'
import { Player } from '../utils/types';

type WithSelectors<S> = S extends { getState: () => infer T }
    ? S & { use: { [K in keyof T]: () => T[K] } }
    : never

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
    _store: S,
) => {
    const store = _store as WithSelectors<typeof _store>
    store.use = {}
    for (const k of Object.keys(store.getState())) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ; (store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
    }

    return store
}

export const rotatePlayers = (players: Player[], direction: 1 | -1 = 1) => {
    if (players.length <= 1) return players;

    return direction === 1
        ? [...players.slice(1), players[0]]  // Forward rotation (default)
        : [players[players.length - 1], ...players.slice(0, -1)];  // Reverse rotation
};
export const sortPlayersByScore = (players: Player[]): Player[] => {
    return [...players].sort((p1, p2) => {
        const score1 = p1.TotalScore ?? 0;
        const score2 = p2.TotalScore ?? 0;
        return score2 - score1;
    });
};

export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }
    if (error && typeof error === 'object' && 'message' in error) {
        return String(error.message);
    }
    return 'An unknown error occurred';
}