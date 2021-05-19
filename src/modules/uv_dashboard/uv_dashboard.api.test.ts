import UVDashboardApi from './uv_dashboard.api';
import * as axios from "axios";

import * as dashboardMock from './uv_dashboard.mock';

// Mock out all top level functions, such as get, put, delete and post:
jest.mock("axios");


describe('Dashboard API Suite', ()=> {


  test('should call dashboard API', ()=> {
    UVDashboardApi.getDashboardData();
    expect(axios.get).toHaveBeenCalled();
  });
});