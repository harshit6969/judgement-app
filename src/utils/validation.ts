import { CheckboxOptions, Player } from "./types";

export const isStartValid = (players: Player[]): boolean => {
    let sum = 0;
    for (const player of players) { 
        const currentScore = player.CurrentRoundScore;
        if (currentScore === undefined) return false;
        sum += currentScore;
    }
    return sum !== Math.floor(52 / players.length);
};


export const isEndValid = (options: CheckboxOptions): boolean => {
    return Array.from(options.values()).some(isChecked => !isChecked);
};


export const canUndo = (players: Player[]): boolean => {
    return players.every(p => p.PrevRoundScore !== undefined);
};