import axios from 'axios';
import * as dashboardData from './uv_dashboard.json';

const getDashboardData = ()=> {
  console.warn('process.env.REACT_APP_API_URL: ', process.env.REACT_APP_API_URL);
  let dashboardUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : dashboardData.config.apis.dashboard.url;
  dashboardUrl = 'http://localhost:8888/api/getInvestments.json';
  //dashboardUrl = 'http://localhost:8888/api/sensoredGetInvestments.json';
  return axios.get(dashboardUrl);
}

const UVDashboardApi = {
  getDashboardData: getDashboardData
};

export default UVDashboardApi;
