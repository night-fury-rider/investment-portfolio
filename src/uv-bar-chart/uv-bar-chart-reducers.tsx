import UV_BAR_CHART from './uv-bar-chart-constants';
import UvBarChartAction from './uv-bar-chart-action-interface';

const initialState = {
  parentIndex: 0
};

const uvBarChartReducer = (state=initialState, action: UvBarChartAction) => {
  switch (action.type) {
    case UV_BAR_CHART.LOAD:
      return {
        ...state,
        parentIndex: action.parentIndex
      }
    default:
      return state;
  }
}

export default uvBarChartReducer;
