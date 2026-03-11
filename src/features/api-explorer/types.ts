export type RequestPhase = "idle" | "loading" | "success" | "error";

export interface BackendResult<T = unknown> {
  error?: string;
  ok: boolean;
  payload: T;
  status: number;
  targetUrl: string;
}
