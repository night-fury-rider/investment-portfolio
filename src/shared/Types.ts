export type UVCategory = {
  // Key will be string and value will be anything of mentioned types.
  [key: string]:  number | string | undefined | UVItem[];

  id: number;
  name: string;
  color: string;
  selectionIndex: number
  items: UVItem[];
};

export type UVAmount = {
  amount: number;
  price: number;
  quantity: number;
};

export type UVSubItem = {
  name: string;
  shortName: string;
  investedValue: number;
  currentValue: number;
}

export type UVItem = {
    // Key will be string and value will be anything of mentioned types.
    [key: string]:  UVAmount | string | number| object | UVSubItem[];

    name: string;
    shortName: string;
    initial: UVAmount;
    current: UVAmount;
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
