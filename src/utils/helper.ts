import { StoreApi, UseBoundStore } from 'zustand'
import { Player } from '../utils/types';

type WithSelectors<S> = S extends { getState: () => infer T }
    ? S & { use: { [K in keyof T]: () => T[K] } }
    : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
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


function setValue(key: string, value: unknown) {
    console.log(value);
    localStorage.setItem(key, JSON.stringify(value));
}

function getValue(key: string) {
    return JSON.parse(localStorage.getItem(key) ?? "")
}


const rotatePlayers = (players: Player[]) => {
    const [firstPlayer, ...remainingPlayers] = players;
    return [...remainingPlayers, firstPlayer];
};

const sortPlayersByScore = (players: Player[]) => {
    return [...players].sort((p1, p2) => p2.TotalScore - p1.TotalScore);
};

export { setValue, getValue, createSelectors, rotatePlayers, sortPlayersByScore };