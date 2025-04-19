// src/services/Database.ts
import Dexie, { Table } from 'dexie';
import { GameState, Player } from '../utils/types';

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
