import type { SavedRoulette } from "../model/roulette";
const storageKey = "streaming-tools:roulettes:v1";
export const loadRoulettes = (): SavedRoulette[] => {
    try {
        const value: unknown = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]");
        return Array.isArray(value) ? (value as SavedRoulette[]) : [];
    } catch {
        return [];
    }
};
export const saveRoulettes = (roulettes: SavedRoulette[]) =>
    window.localStorage.setItem(storageKey, JSON.stringify(roulettes));
