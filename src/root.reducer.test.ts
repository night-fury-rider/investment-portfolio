import { rootReducer } from './root.reducer';
import { createStore } from 'redux';
import { initialState as dashboardState } from './modules/uv_dashboard/uv_dashboard.reducer';

describe('Root Reducer Suite', () => {

  let store = createStore(rootReducer)

  test('loads correctly', () => {
    expect(store.getState().dashboard).toEqual(dashboardState);
  });
});
