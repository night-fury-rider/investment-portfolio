/* Keep all types which are used at application level */

type IBaseData = {
  absoluteValue: number;
  amc: unknown;
  categories: ICategory[];
  config: unknown;
  goals: IGoal[];
  value: number;
};

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

type IGoal = {
  label: string;
  collection?: number;
  id?: number;
  targetAmount?: number;
  isOnTrack?: boolean;
  notes?: string[];
  targetDate?: string;
};

type IInvestmentRecord = {
  category: string;
  currentValue: number;
  date: string;
  folio: string;
  goal: string;
  id: number;
  investedValue: number;
  subCategory: string;
};

type INewInvestment = {
  amount: number;
  categoryIndex: number;
  folioName: string;
  goalIndex: number;
  subCategoryIndex: number;
  category?: string;
  date?: string;
  goal?: string;
  subCategory?: string;
};

type INewInvestmentParam = {
  categories: ICategory[];
  date: string;
  goal: string;
  goals: IGoal[];
  amount: string;
  category: string;
  folioName: string;
  subCategory: string;
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
  returns?: (string | number)[][];
  shortName?: string;
};

type ISubItem = {
  currentValue?: number;
  date: string;
  folio: string;
  investedValue: number;
  goal?: string;
};

type IUnit = "Lakh" | "Thousand";

type IValueType = "investedValue" | "currentValue";

export type {
  ICategory,
  IGoal,
  IInvestmentRecord,
  INewInvestment,
  INewInvestmentParam,
  ISubCategory,
  ISubItem,
  IBaseData,
  IUnit,
  IValueType,
};
