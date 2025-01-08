export type iValueType = "investedValue" | "currentValue";

export type iSubItem = {
  investedValue: number;
  currentValue?: number;
  folio?: string;
  goal?: string;
};

export type iItem = {
  absoluteValue: number;
  id: number;
  label: string;
  notes: string[];
  value: number;
  subItems: iSubItem[];
  exitLoad?: string;
  expenseRatio?: number;
  firstInvestmentDate?: string;
  fundHouse?: string;
  fundManagers?: string[];
  fundSize?: number;
  launchDate?: string;
  rating?: number;
  returns?: [[string, number]];
  shortName?: string;
};

export type iCategory = {
  absoluteValue: number;
  color: string;
  expenseRatio: number;
  id: number;
  label: string;
  notes: string;
  value: number;
  items: iItem[];
};
