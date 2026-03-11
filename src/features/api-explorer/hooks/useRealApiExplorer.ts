"use client";

import { useState } from "react";

import { useRequestAction } from "@/features/api-explorer/hooks/useRequestAction";
import type { BackendResult } from "@/features/api-explorer/types";

async function readJson<T>(response: Response): Promise<T> {
  return response.json() as Promise<T>;
}

export function useRealApiExplorer() {
  const [accountId, setAccountId] = useState("11111111-1111-1111-1111-111111111111");
  const [sourceAccountNumber, setSourceAccountNumber] = useState("1001");
  const [destinationAccountNumber, setDestinationAccountNumber] = useState("1002");
  const [amount, setAmount] = useState("50");

  const accountRequest = useRequestAction<BackendResult>();
  const transferRequest = useRequestAction<BackendResult>();
  const transactionsRequest = useRequestAction<BackendResult>();

  async function fetchAccount() {
    return accountRequest.run(async () => {
      const response = await fetch(`/api/real-backend/accounts/${accountId.trim()}`, {
        cache: "no-store",
      });

      return readJson<BackendResult>(response);
    });
  }

  async function createTransfer() {
    return transferRequest.run(async () => {
      const response = await fetch("/api/real-backend/transactions", {
        body: JSON.stringify({
          amount: Number(amount),
          destinationAccountNumber: destinationAccountNumber.trim(),
          sourceAccountNumber: sourceAccountNumber.trim(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      return readJson<BackendResult>(response);
    });
  }

  async function fetchTransactions() {
    return transactionsRequest.run(async () => {
      const response = await fetch("/api/real-backend/transactions", {
        cache: "no-store",
      });

      return readJson<BackendResult>(response);
    });
  }

  return {
    accountId,
    accountRequest,
    amount,
    createTransfer,
    destinationAccountNumber,
    fetchAccount,
    fetchTransactions,
    setAccountId,
    setAmount,
    setDestinationAccountNumber,
    setSourceAccountNumber,
    sourceAccountNumber,
    transactionsRequest,
    transferRequest,
  };
}
