import { NextResponse } from "next/server";

import { callRealApi } from "@/lib/server/real-api-client";

export const runtime = "nodejs";

const transactionsPath = process.env.BSOL_REAL_TRANSACTIONS_PATH ?? "/transactions";

export async function GET() {
  try {
    const response = await callRealApi({
      method: "GET",
      path: transactionsPath,
    });

    return NextResponse.json(response, { status: response.ok ? 200 : response.status });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        status: 500,
        targetUrl: transactionsPath,
        payload: null,
        error:
          error instanceof Error ? error.message : "No se pudo consultar la lista real.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      amount: number;
      destinationAccountNumber: string;
      sourceAccountNumber: string;
    };

    const response = await callRealApi({
      body: {
        amount: body.amount,
        destinationAccountNumber: body.destinationAccountNumber,
        sourceAccountNumber: body.sourceAccountNumber,
      },
      method: "POST",
      path: transactionsPath,
    });

    return NextResponse.json(response, { status: response.ok ? 200 : response.status });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        status: 500,
        targetUrl: transactionsPath,
        payload: null,
        error:
          error instanceof Error ? error.message : "No se pudo ejecutar la transferencia real.",
      },
      { status: 500 }
    );
  }
}
