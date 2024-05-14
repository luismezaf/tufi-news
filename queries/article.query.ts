import { useState } from "react";
import { Article } from "../models/article.model";
import axios, { AxiosError } from "axios";
import { PaginatedResponse, ServerError } from "../models";
import { API_KEY, BASE_URL } from "@env";

const PAGE_SIZE = 10;

export type ArticleCategory =
  | "business"
  | "entertainment"
  | "general"
  | "health"
  | "science"
  | "sports"
  | "technology";

export type Endpoint = "top-headlines" | "everything";

export type FetchParams = Partial<{
  apiKey: string;
  pageSize: number;
  page: number;
  q: string;
  category: ArticleCategory;
  sortBy: "relevancy" | "popularity" | "publishedAt";
  country: string | string[];
}>;

function filterParamsByEndpoint(endpoint: Endpoint, params: FetchParams) {
  if (endpoint === "everything") {
    const { apiKey, pageSize, page, q, sortBy } = params;
    return { apiKey, pageSize, page, q, sortBy };
  } else {
    const { apiKey, pageSize, page, q, category, country } = params;
    return { apiKey, pageSize, page, q, category, country };
  }
}

/**
 * Hook to get articles from api.
 */
export function useGetArticles(props?: {
  defaultParams?: FetchParams;
  endpoint?: Endpoint;
  disabled?: boolean;
}) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesPerPage, setArticlesPerPage] = useState<
    Record<number, Article[]>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<AxiosError<ServerError> | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  /**
   * @returns the current status of the query.
   */
  function getDefaultParams(): FetchParams {
    return {
      apiKey: API_KEY,
      pageSize: PAGE_SIZE,
      page,
      country: ["us"],
      ...(search ? { q: search } : undefined),
      ...props?.defaultParams,
    };
  }

  /**
   * Fetch the articles from newsapi.
   *
   * @param params are the params to be included in the url.
   * @returns a list of articles.
   */
  async function fetchArticles(params?: FetchParams) {
    const endpoint = props?.endpoint || "everything";
    setIsLoading(true);
    setError(null);
    try {
      const result = await axios.get<PaginatedResponse<Article>>(
        `${BASE_URL}/${endpoint}`,
        {
          params: filterParamsByEndpoint(endpoint, {
            ...getDefaultParams(),
            ...params,
          }),
        }
      );
      return result;
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * It gets a list of news, then concatenates the results
   * with the current list of news.
   *
   * @param params are the params to be included in the url.
   */
  async function loadArticles(params?: FetchParams) {
    if (props?.disabled) return;
    try {
      const { data } = await fetchArticles(params);
      // Set page articles
      const nextArticlesPage = {
        ...articlesPerPage,
        [params?.page || page]: data.articles.filter(
          (article) => article.title !== "[Removed]"
        ),
      };
      setArticlesPerPage(nextArticlesPage);

      // Set list of all loaded articles
      const nextArticles = Object.values(nextArticlesPage).reduce(
        (res, pageArticles) => [...res, ...pageArticles],
        []
      );
      setHasNextPage(nextArticles.length < data.totalResults);
      setArticles(nextArticles);
    } catch (err) {
      const _err = err as AxiosError<ServerError>;
      console.log("### err:", _err.response?.data.message);
      setError(err as AxiosError<ServerError>);
    }
  }

  /**
   * Load the next page of news.
   * It keeps the current searching and previos results.
   */
  async function loadArticlesNextPage() {
    if (!hasNextPage) return;
    const nextPage = page + 1;
    console.log("### Loading next page...", nextPage);
    setPage(nextPage);
    await loadArticles({ page: nextPage });
  }

  /**
   * Resets page to 1 and clear all existing articles before fetch.
   *
   * @param params are the params to be included in the url.
   */
  async function refreshArticles(params?: FetchParams) {
    const nextPage = 1;
    setPage(nextPage);
    setArticles([]);
    setHasNextPage(true);
    await loadArticles({ page: nextPage, ...params });
  }

  /**
   * Search news by words coincidences.
   * It resets the pagination to 1 and clear the previous results.
   *
   * @param search is the text to search.
   */
  async function saerchArticles(search: string) {
    setSearch(search);
    await refreshArticles({ q: search });
  }

  return {
    loadArticles,
    loadArticlesNextPage,
    saerchArticles,
    refreshArticles,
    isLoadingArticles: isLoading,
    loadingArticlesError: error,
    hasArticlesNextPage: hasNextPage,
    articles,
  };
}
