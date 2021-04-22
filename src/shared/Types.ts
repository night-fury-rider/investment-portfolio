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

export type UVDashboardType = {
  config ?: any;
  uvNumbers: UVNumberProps[]
};

export type UVPieConfig = {
  series: any;
};

export type UVPieData = {
  categories: UVCategory[]
};

export type UVPieProps = {
  componentId: number;
  config: UVPieConfig;
  categories: UVCategory[];
};

export type UVBarChartConfig = {
  dimension ?: string;
  categoryKey: string;
  categoryShortKey: string;
  valueAxis ?: object;
  series ?: object;
};

export type UVBarChartProps = {
  componentId: number;
  config: UVBarChartConfig;
  items: UVItem[];
};

export type UVAngularGaugeConfig = {
  chartMax: number;
  chartMin: number;
  fontSize ?: number;
  hand ?: any;
  handAxis ?: any;
  innerRadius ?: number;
  mainAxis ?: any;
  range: {
    AxisFillOpacity: any;
    AxisFillzIndex: number;
    gridStrokeOpacity: any;
    labelInside: any;
    labelLocation: any;
    labelPaddingBottom: any;
    labelFontSize: number;
  },
  resizable ?: boolean;
  score: number;
  showScore ?: boolean;
  title: string;
  upperCaseGrades ?: boolean;
};

export type UVAngularGaugeData = {
  title: string,
  color: string,
  lowScore: number,
  highScore: number
};

export type UVNumberProps = {
  config ?: {
    class ?: string;
    title ?: {
      class ?: string;
    };
    subtitle ?: {
      class ?: string;
    }
  };
  title: number;
  label: string;
  subtitle?: string;
};
