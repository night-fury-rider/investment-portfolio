import { initDashboard, updateDashboard } from './uv_dashboard.actions';
import UV_DASHBOARD from "./uv_dashboard.constants";

describe('Dashboard Actions Suite', () => {

  test('initDashboard returns correct action object', () => {
    const testNumber = {
      title: 1234,
      label: 'Test Number Label'
    }

    expect(initDashboard().type).toEqual(UV_DASHBOARD.INIT);

    expect(updateDashboard({
      uvNumbers: [testNumber]
    }).type).toEqual(UV_DASHBOARD.UPDATE);

    expect(updateDashboard({
      uvNumbers: [testNumber]
    }).data.uvNumbers[0]).toEqual(testNumber);

  });
});
