import { UVItem } from '../../shared/Types';

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
