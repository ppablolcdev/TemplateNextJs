import type { BackendResult } from "@/features/api-explorer/types";
import type { TableModel, TableRow } from "@/features/api-explorer/models/table-models";

function toCellValue(value: unknown): string | number | boolean | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  }

  return JSON.stringify(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeRecord(record: Record<string, unknown>): TableRow {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key, toCellValue(value)])
  );
}

export function mapPayloadToTableModel(result: BackendResult | null): TableModel | null {
  if (!result?.payload) {
    return null;
  }

  const payload = result.payload;

  if (Array.isArray(payload)) {
    const normalizedRows = payload.map((item) =>
      isRecord(item) ? normalizeRecord(item) : { value: toCellValue(item) }
    );

    const columns = Array.from(new Set(normalizedRows.flatMap((row) => Object.keys(row))));

    return {
      columns,
      rows: normalizedRows,
    };
  }

  if (isRecord(payload)) {
    const row = normalizeRecord(payload);
    return {
      columns: Object.keys(row),
      rows: [row],
    };
  }

  return {
    columns: ["value"],
    rows: [{ value: toCellValue(payload) }],
  };
}
