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

export const rotatePlayers = (players: Player[]) => {
    const [firstPlayer, ...remainingPlayers] = players;
    return [...remainingPlayers, firstPlayer];
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