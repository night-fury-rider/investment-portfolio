import { UVCategory } from '../../shared/Types';

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
