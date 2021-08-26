import { combineReducers } from 'redux';

import UVDashboardReducer from './modules/uv_dashboard/uv_dashboard.reducer';
import UVSettingsReducer from './modules/uv_settings/uv_settings.reducer';

export const rootReducer = combineReducers({
  dashboard: UVDashboardReducer,
  settings: UVSettingsReducer
});

export type UVRootState = ReturnType<typeof rootReducer>
