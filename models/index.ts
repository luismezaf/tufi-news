export type PaginatedResponse<T extends object> = {
  status: string;
  totalResults: number;
  articles: T[];
};

export type ServerError = {
  status: string;
  code: string;
  message: string;
};
