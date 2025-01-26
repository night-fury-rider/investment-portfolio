export type iValueType = "investedValue" | "currentValue";

export type iSubItem = {
  folio: string;
  investedValue: number;
  currentValue?: number;
  goal?: string;
};

export type iSubCategory = {
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
  subCategories: iSubCategory[];
  label: string;
  value: number;
  expenseRatio?: number;
  notes?: string[];
};
