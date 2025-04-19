// src/services/GameDB.ts

import { GameState } from "./types";

export class GameDB {
    private static DB_NAME = 'JudgementGameDB';
    private static STORE_NAME = 'games';
    private static DB_VERSION = 1;

    private async getDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(GameDB.DB_NAME, GameDB.DB_VERSION);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(GameDB.STORE_NAME)) {
                    const store = db.createObjectStore(GameDB.STORE_NAME, { keyPath: 'id' });
                    store.createIndex('by_createdAt', 'createdAt');
                }
            };
        });
    }

    public async saveGame(gameData: GameState): Promise<void> {
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(GameDB.STORE_NAME, 'readwrite');
            const store = tx.objectStore(GameDB.STORE_NAME);

            // Create a clean object without methods
            const cleanGameData = this.sanitizeGameData(gameData);

            const request = store.put(cleanGameData);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
            tx.onerror = () => reject(tx.error);
        });
    }

    public async loadGame(gameId: string): Promise<GameState | null> {
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(GameDB.STORE_NAME, 'readonly');
            const store = tx.objectStore(GameDB.STORE_NAME);

            const request = store.get(gameId);

            request.onsuccess = () => resolve(request.result || null);
            request.onerror = () => reject(request.error);
        });
    }

    private sanitizeGameData(gameData: GameState): GameState {
        // Remove any non-serializable properties (functions, etc.)
        return {
            id: gameData.id,
            players: gameData.players.map(player => ({
                ID: player.ID,
                Name: player.Name,
                IsMF: player.IsMF,
                Profile: player.Profile,
                ColorCode: player.ColorCode,
                CurrentRoundScore: player.CurrentRoundScore,
                TotalScore: player.TotalScore,
                Scores: player.Scores ? [...player.Scores] : undefined
            })),
            currentRound: gameData.currentRound,
            status: gameData.status,
            createdAt: gameData.createdAt,
            loading: false // Ensure we never store loading state
        };
    }
}

export const gameDB = new GameDB();