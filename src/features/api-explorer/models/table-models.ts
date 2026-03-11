export interface TableRow {
  [key: string]: string | number | boolean | null;
}

export interface TableModel {
  columns: string[];
  rows: TableRow[];
}
