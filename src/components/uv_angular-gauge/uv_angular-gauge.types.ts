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
