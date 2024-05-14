import { create } from "zustand";
import { Article } from "../models/article.model";
import { loadFromAsyncStorage, saveToAsyncStorage } from "./local.util";

interface HistoryState {
  articles: Article[];
  addArticleToHistory: (article: Article) => void;
}

// Create the Zustand store to manage history articles
export const useHistoryStore = create<HistoryState>((set) => ({
  articles: [],
  addArticleToHistory: (article: Article) => {
    set((state) => {
      // Check if the article is already in the history
      const isInHistory = state.articles.some(
        (his) => his.title === article.title
      );

      // Put the article at the begining of the history
      const nextArticles = isInHistory
        ? [
            article,
            ...state.articles.filter((his) => his.title !== article.title),
          ]
        : [article, ...state.articles];

      // Save the updated article to localStorage
      saveToAsyncStorage("history", nextArticles);

      return { articles: nextArticles };
    });
  },
}));

// Load articles from AsyncStorage on startup
loadFromAsyncStorage<Article>("history").then((articles) => {
  useHistoryStore.setState({ articles });
});
