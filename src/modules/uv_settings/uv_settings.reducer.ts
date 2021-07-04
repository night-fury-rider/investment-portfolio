
import { UVAction } from '../../shared/Types';
import UV_SETTINGS from './uv_settings.constants';
import * as settingsData from './uv_settings.json';

export const initialSettings = {
  language: settingsData.language.items[0],
  currency: settingsData.currency.items[0],
  locale: settingsData.locale.items[0]
};

const UVSettingsReducer = (state = initialSettings, action: UVAction) => {
  switch (action.type) {

    case UV_SETTINGS.UPDATE_LANGUAGE:
      return {
        ...state,
        language: action.data,
      }

    case UV_SETTINGS.UPDATE_CURRENCY:
      return {
        ...state,
        currency: action.data,
      }

    case UV_SETTINGS.UPDATE_LOCALE:
      return {
        ...state,
        locale: action.data,
      }

    default:
      return state;
  }
};

export default UVSettingsReducer;
