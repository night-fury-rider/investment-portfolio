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
  subItems: iSubItem[];
  value: number;
  exitLoad?: string;
  expenseRatio?: number;
  firstInvestmentDate?: string;
  fundHouse?: string;
  fundManagers?: string[];
  fundSize?: number;
  launchDate?: string;
  notes?: string[];
  rating?: number;
  returns?: [[string, number]];
  shortName?: string;
};

export type iCategory = {
  absoluteValue: number;
  color: string;
  id: number;
  items: iItem[];
  label: string;
  value: number;
  expenseRatio?: number;
  notes?: string;
};
