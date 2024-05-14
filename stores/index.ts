import { create } from "zustand";

interface SearchState {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

// Create the Zustand store for home search
export const useSearchStore = create<SearchState>((set) => ({
  searchValue: "",
  setSearchValue: (value: string) => set({ searchValue: value }),
}));
