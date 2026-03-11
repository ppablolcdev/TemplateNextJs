"use client";

import { useState } from "react";

import type { RequestPhase } from "@/features/api-explorer/types";

export function useRequestAction<T>() {
  const [phase, setPhase] = useState<RequestPhase>("idle");
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(action: () => Promise<T>) {
    setPhase("loading");
    setError(null);

    try {
      const response = await action();
      setResult(response);
      setPhase("success");
      return response;
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "No se pudo completar la solicitud.";

      setError(message);
      setPhase("error");
      throw caughtError;
    }
  }

  return {
    error,
    phase,
    result,
    run,
  };
}
