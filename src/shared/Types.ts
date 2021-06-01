export type UVCategory = {
  // Key will be string and value will be anything of mentioned types.
  [key: string]:  number | string | undefined | UVItem[];

  id: number;
  name: string;
  color: string;
  selectionIndex: number
  items: UVItem[];
};

export type UVSubItem = {
  folio: string;
  investedValue: number;
  currentValue: number;
  goal: string;
}

export type UVItem = {
    // Key will be string and value will be anything of mentioned types.
    [key: string]:  string | number| object | UVSubItem[] | undefined;

    id ?: number;
    name ?: string;
    shortName ?: string;
    expenseRatio ?:  number;
    average_expenseRatio ?: number;
    exitLoad ?: number;
    fundManager ?: string[];
    launchDate ?: string;
    returns ?: object;
    rating: number;
    firstInvestmentDate ?: string;
    tentetiveEndDate ?: string;
    fundHouse ?: string;
    fundSize ?: number;
    subItems ?: UVSubItem[];
    value: number; // Gets added as part of processing of data.
};

export type UVAction = {
  type: string;
  config ?: any;
  data ?: any;
};
