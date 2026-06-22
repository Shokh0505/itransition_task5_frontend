import { create } from "zustand";

type ViewType = "list" | "gallery";

interface NavStore {
    view: ViewType;
    setView: (view: ViewType) => void;
    averageLike: number;
    setAverageLike: (averageLike: number) => void;
}

export const useNavStore = create<NavStore>((set) => ({
    view: "list",
    averageLike: 5.0,
    setAverageLike: (averageLike: number) => set({ averageLike }),
    setView: (view) => set({ view }),
}));
