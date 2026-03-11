import { NextResponse } from "next/server";

import { callRealApi } from "@/lib/server/real-api-client";

export const runtime = "nodejs";

const accountPathTemplate =
  process.env.BSOL_REAL_ACCOUNT_DETAIL_PATH ?? "/Accounts/{id}";

export async function GET(
  _request: Request,
  context: { params: Promise<{ accountId: string }> }
) {
  const { accountId } = await context.params;
  const path = accountPathTemplate.replace("{id}", accountId);

  try {
    const response = await callRealApi({
      method: "GET",
      path,
    });

    return NextResponse.json(response, { status: response.ok ? 200 : response.status });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        status: 500,
        targetUrl: path,
        payload: null,
        error: error instanceof Error ? error.message : "No se pudo consultar la cuenta real.",
      },
      { status: 500 }
    );
  }
}
