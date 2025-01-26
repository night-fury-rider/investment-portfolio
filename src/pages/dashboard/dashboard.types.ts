type ICategory = {
  absoluteValue: number;
  color: string;
  id: number;
  subCategories: ISubCategory[];
  label: string;
  value: number;
  expenseRatio?: number;
  goal?: string;
  notes?: string[];
};

type INewInvestment = {
  categoryIndex: number;
  subCategoryIndex: number;
  folioName: string;
  amount: number;
};

type ISubCategory = {
  absoluteValue: number;
  id: number;
  label: string;
  records: ISubItem[];
  value: number;
  exitLoad?: string;
  expenseRatio?: number;
  firstInvestmentDate?: string;
  fundHouse?: string;
  fundManagers?: string[];
  fundSize?: number;
  goal?: string;
  launchDate?: string;
  notes?: string[];
  rating?: number;
  returns?: [[string, number]];
  shortName?: string;
};

type ISubItem = {
  folio: string;
  investedValue: number;
  currentValue?: number;
  goal?: string;
};

type IValueType = "investedValue" | "currentValue";

export type { ICategory, INewInvestment, ISubCategory, ISubItem, IValueType };
