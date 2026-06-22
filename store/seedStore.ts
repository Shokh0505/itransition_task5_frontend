import { create } from "zustand";

interface SeedStore {
    seed: string;
    setSeed: (seed: string) => void;
    generateSeed: () => void;
}

export const useSeedStore = create<SeedStore>((set) => ({
    seed: "123",
    setSeed: (seed) => set({ seed }),
    generateSeed: () => set({ seed: Math.random().toString(36).substring(2) }),
}));
