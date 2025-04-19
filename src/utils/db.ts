// src/services/GameDB.ts

import { db } from "../services/player";
import players from "./players";
import { GameState, Player } from "./types";

export class GameDB {
    async saveGame(gameData: GameState): Promise<void> {
        // Convert to normalized structure
        const game: GameState = {
            id: gameData.id,
            players: gameData.players.map(p => ({
                ID: p.ID,
                CurrentRoundScore: p.CurrentRoundScore,
                TotalScore: p.TotalScore,
                Scores: p.Scores
            })),
            currentRound: gameData.currentRound,
            status: gameData.status,
            createdAt: gameData.createdAt,
            loading: false,
        };
        await db.games.put(game);
    }

    async loadGame(gameId: string): Promise<GameState | null> {
        const game = await db.games.get(gameId);
        if (!game) return null;

        // Get full player details
        const playerIds = game.players.map(p => p.ID);
        const players = await db.players
            .where('ID')
            .anyOf(playerIds)
            .toArray();

        // Merge static and dynamic player data
        const mergedPlayers = game.players.map(gamePlayer => {
            const player = players.find(p => p.ID === gamePlayer.ID)!;
            return {
                ...player,
                CurrentRoundScore: gamePlayer.CurrentRoundScore,
                TotalScore: gamePlayer.TotalScore,
                Scores: gamePlayer.Scores
            };
        });
        return {
            ...game,
            players: mergedPlayers,
            loading: false
        };
    }
}

export const gameDB = new GameDB();


export class PlayerDB {
    /**
     * Get all players from the database
     */
    async getAllPlayers(): Promise<Player[]> {
        return await db.players.toArray();
    }

    /**
     * Get a specific player by ID
     */
    async getPlayer(id: number): Promise<Player | undefined> {
        return await db.players.get(id);
    }

    /**
     * Get multiple players by their IDs
     */
    async getPlayersByIds(ids: number[]): Promise<Player[]> {
        return await db.players.where('ID').anyOf(ids).toArray();
    }

    /**
     * Add new players to the database
     */
    async addPlayers(players: Omit<Player, 'ID'>[]): Promise<number> {
        return await db.players.bulkAdd(players as Player[]);
    }

    /**
     * Update existing players
     */
    async updatePlayers(players: Player[]): Promise<void> {
        await db.players.bulkPut(players);
    }

    /**
     * Initialize the players table with default data
     */
    async initializeDefaultPlayers(): Promise<Player[]> {
        const count = await db.players.count();
        if (count === 0) {
            await db.players.bulkAdd(players);
            return players;
        }
        return await this.getAllPlayers();
    }
}

export const playerDB = new PlayerDB();