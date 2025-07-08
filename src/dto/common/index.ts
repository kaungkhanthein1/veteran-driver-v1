export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
  meta: {
    timestamp: string;
    traceId: string;
  };
}