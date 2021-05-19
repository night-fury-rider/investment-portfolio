import { UVNumberProps } from './uv_number.types';
import UVNumberPojo from './uv_number.pojo';

import { numberTitle, numberLabel, numberSubtitle, numberConfig } from './uv_number.mock';

describe('UVNumber Pojo Suite', ()=> {

  let pojoObj: UVNumberProps;

  beforeEach(()=> {
    pojoObj = new UVNumberPojo({
      title: numberTitle,
      label: numberLabel
    }).numberData;
  });

  test('initializes with mandatory data', ()=> {
    expect(pojoObj.title).toEqual(numberTitle);
    expect(pojoObj.label).toEqual(numberLabel);
  });

  test('initializes with optional data', ()=> {
    pojoObj = new UVNumberPojo({
      title: numberTitle,
      subtitle: numberSubtitle,
      label: numberLabel,
      config: numberConfig
    }).numberData;
    expect(pojoObj.subtitle).toEqual(numberSubtitle);
    expect(pojoObj.config).toEqual(numberConfig);
  });
});
