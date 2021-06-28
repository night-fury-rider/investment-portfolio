
import { UVAction } from '../../shared/Types';
import UV_SETTINGS from './uv_settings.constants';

export const initialSettings = {
  languageCode: 'en-US'
};

const UVSettingsReducer = (state = initialSettings, action: UVAction) => {
  switch (action.type) {
    case UV_SETTINGS.UPDATE:
      return {
        languageCode: action.data.languageCode
      }

    default:
      return state;
  }

};

export default UVSettingsReducer;
