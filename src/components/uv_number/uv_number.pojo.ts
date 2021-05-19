import { UVNumberProps } from './uv_number.types';

export default class UVNumberPojo {

  private _numberData: UVNumberProps;

  constructor(numberData: UVNumberProps) {
    this._numberData = {
      config: {
        class: (numberData.config && numberData.config.class) ? numberData.config.class : '',
        title: {
          class: (numberData.config && numberData.config.title && numberData.config.title.class) ?
                    numberData.config.title.class : '',
        },
        subtitle: {
          class: (numberData.config && numberData.config.subtitle && numberData.config.subtitle.class) ?
                    numberData.config.subtitle.class : '',
        }
      },
      title: numberData.title,
      subtitle: numberData.subtitle ? numberData.subtitle : '',
      label: numberData.label
    }
  }

  get numberData() {
    return this._numberData;
  }
}