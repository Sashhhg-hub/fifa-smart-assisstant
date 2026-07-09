/** Standard API response wrapper */
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
}

/** Standard API error shape */
export interface ApiError {
  message: string;
  code?: string;
}
