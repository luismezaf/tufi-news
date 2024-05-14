import { create } from "zustand";
import { Article } from "../models/article.model";
import { loadFromAsyncStorage, saveToAsyncStorage } from "./local.util";

interface FavoriteState {
  favorites: Article[];
  toggleFavorite: (value: Article) => void;
  isFavorite: (value: Article) => boolean;
}

// Create the Zustand store to manage favorite articles
export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: [],
  toggleFavorite: (article: Article) => {
    set((state) => {
      const isFavorite = state.favorites.some(
        (fav) => fav.title === article.title
      );

      const nextFavorites = isFavorite
        ? state.favorites.filter((fav) => fav.title !== article.title)
        : [article, ...state.favorites];

      // Save the updated favorites to localStorage
      saveToAsyncStorage("favorites", nextFavorites);

      return { favorites: nextFavorites };
    });
  },
  isFavorite: (article: Article) => {
    const { favorites } = get();
    return favorites.some((fav) => fav.title === article.title);
  },
}));

// Load favorites from AsyncStorage on startup
loadFromAsyncStorage<Article>("favorites").then((favorites) => {
  useFavoriteStore.setState({ favorites });
});
