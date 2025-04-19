// src/services/Database.ts
import Dexie, { Table } from 'dexie';
import { GameState, Player } from '../utils/types';
import players from '../utils/players';

class JudgementDatabase extends Dexie {
    players!: Table<Player, number>;
    games!: Table<GameState, string>;

    constructor() {
        super('JudgementGameDB');
        this.version(1).stores({
            players: 'ID, Name, IsMF',
            games: 'id, createdAt, players.ID' // Index player IDs for faster lookups
        });
    }
}

export const db = new JudgementDatabase();


export async function initializeDatabase() {
    const playerData: Player[] = players;
    const existingCount = await db.players.count();
    if (existingCount === 0) {
        await db.players.bulkAdd(playerData);
    }
}
