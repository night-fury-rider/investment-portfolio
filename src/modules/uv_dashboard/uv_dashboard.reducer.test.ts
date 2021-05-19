import UVDashboardReducer, { initialState } from './uv_dashboard.reducer';
import UV_DASHBOARD from "./uv_dashboard.constants";
import UV_BAR_CHART from "../../components/uv_bar-chart/uv_bar-chart.constants";
import UV_PIE from "../../components/uv_pie/uv_pie.constants";

import * as dashboardMock from './uv_dashboard.mock';

describe('Dashboard Reducer Suite', ()=> {

  test('updates the component on Dashboard Update Action', ()=> {
    const testAction = {
      type: UV_DASHBOARD.UPDATE,
      data: {
        totalValue: 100
      }
    };
    expect(UVDashboardReducer(initialState, testAction).totalValue).toEqual(testAction.data.totalValue);
  });

  test('updates the component on Pie Select Action', ()=> {

    let newState = JSON.parse(JSON.stringify(initialState));
    newState.categoryData.selectionIndex = 1;
    newState.categoryData.categories = dashboardMock.categories;
    const testAction = {
      type: UV_PIE.SELECT,
      config: {
        componentId: 0
      },
      data: {
        sliceIndex: 0
      }
    };
    expect(UVDashboardReducer(newState, testAction).categoryData.selectionIndex).toEqual(testAction.data.sliceIndex);
  });

  test('updates the component on Bar Chart Select Action', ()=> {

    let newState = JSON.parse(JSON.stringify(initialState));
    newState.categoryData.selectionIndex = 0;
    newState.categoryData.categories = dashboardMock.categories;
    const testAction = {
      type: UV_BAR_CHART.SELECT,
      config: {
        componentId: 0
      },
      data: {
        columnIndex: 0
      }
    };
    const expectedScore = newState.categoryData.categories[newState.categoryData.selectionIndex]
                                  .items[testAction.data.columnIndex].rating;

    expect(UVDashboardReducer(newState, testAction).angularGauages[testAction.config.componentId].data.score).toEqual(expectedScore);
  });
});
