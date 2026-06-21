import { create } from "zustand";

type ViewType = "list" | "gallery";

interface NavStore {
    view: ViewType;
    setView: (view: ViewType) => void;
}

export const useNavStore = create<NavStore>((set) => ({
    view: "list",
    setView: (view) => set({ view }),
}));
