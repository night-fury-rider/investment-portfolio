
import { UVAction } from '../../shared/Types';
import UV_SETTINGS from './uv_settings.constants';
import * as settingsData from './uv_settings.json';

export const initialSettings = {
  language: localStorage.getItem('uv_lang') ? JSON.parse(localStorage.getItem('uv_lang') as string) : settingsData.language.items[0],
  locale: localStorage.getItem('uv_locale') ? JSON.parse(localStorage.getItem('uv_locale') as string) : settingsData.locale.items[0]
};

const UVSettingsReducer = (state = initialSettings, action: UVAction) => {
  switch (action.type) {

    case UV_SETTINGS.UPDATE_LANGUAGE:
      return {
        ...state,
        language: action.data,
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
