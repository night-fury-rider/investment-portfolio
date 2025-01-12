interface iColumn {
  id: string;
  label: string;
  numeric: boolean;
}

interface iData {
  [key: string]: string | number;
}

interface iOrder {
  order: "asc" | "desc";
  orderBy: string;
}

export type { iColumn, iData, iOrder };
