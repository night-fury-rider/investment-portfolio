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
  name: string;
  shortName: string;
  investedValue: number;
  currentValue: number;
}

export type UVItem = {
    // Key will be string and value will be anything of mentioned types.
    [key: string]:  string | number| object | UVSubItem[] | undefined;

    id ?: number;
    name: string;
    shortName: string;
    goal: string;
    expenseRatio:  number;
    exitLoad: number;
    fundManager: string;
    launchDate: string;
    returns: object;
    rating: number;
    firstInvestmentDate: string;
    tentetiveEndDate: string;
    AUM: number;
    fundHouse: object;
    value: number;
    subItems: UVSubItem[];
};

export type UVAction = {
  type: string;
  config ?: any;
  data ?: any;
};
