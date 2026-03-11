import type { TableModel } from "@/features/api-explorer/models/table-models";

interface ResponseTableProps {
  emptyMessage: string;
  value: TableModel | null;
}

function renderCell(value: string | number | boolean | null) {
  if (value === null || value === undefined || value === "") {
    return "Sin valor";
  }

  return String(value);
}

export function ResponseTable({ emptyMessage, value }: ResponseTableProps) {
  if (!value || value.rows.length === 0) {
    return (
      <div className="state-box">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="response-card">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {value.rows.length > 1 ? <th>Fila</th> : null}
              {value.columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {value.rows.map((row, index) => (
              <tr key={`row-${index + 1}`}>
                {value.rows.length > 1 ? <td>{index + 1}</td> : null}
                {value.columns.map((column) => (
                  <td key={`row-${index + 1}-${column}`}>{renderCell(row[column] ?? null)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
