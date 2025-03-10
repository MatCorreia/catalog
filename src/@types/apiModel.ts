export interface ApiResponse<T> {
    data: T;
    results: T;
    page: number;
    total_pages: number;
    success: boolean;
    message?: string;
  }