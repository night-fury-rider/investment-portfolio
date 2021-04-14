import UV_BAR_CHART from "../../components/uv_bar-chart/uv_bar-chart.constants";
import UV_PIE from "../../components/uv_pie/uv_pie.constants";
import { UVAction } from '../../shared/Types';
import { UVItem } from '../../shared/Types';
import UV_DASHBOARD from "./uv_dashboard.constants";
import { UVCategory, UVNumberProps } from '../../shared/Types';
import { mapNumberComponents } from "./uv_dashboard.saga";

const initialState = {
  totalValue: 0,
  categoryData: {
    selectionIndex: 0,
    categories: [] as UVCategory[]
  },
  pieCharts: [
    {
      config: null,
      data: {
        selectionIndex: 0,
        categories: []
      }
    }
  ],
  barCharts: [
    {
      config: null,
      data:  [] as UVItem[]
    }
  ],
  angularGauages: [
    {
      config: null,
      data: {
        score: 0,
        items: []
      }
    }
  ],
  numbers: [] as UVNumberProps []
};

const UVDashboardReducer = (state = initialState, action: UVAction)=> {
  let tmpBarCharts, tmpAngularGuages, selectedCategory, selectedBarChart;
  switch(action.type) {
    case UV_DASHBOARD.UPDATE:
      return {
        ...state,
        totalValue: action.data.totalValue,
        categoryData: action.data.categoryData,
        pieCharts: action.data.pieCharts,
        barCharts: action.data.barCharts,
        angularGauages: action.data.angularGauages,
        numbers: action.data.uvNumbers
      }

    case UV_PIE.SELECT:
      state.categoryData.selectionIndex = action.data.sliceIndex;
      tmpBarCharts = state.barCharts;
      tmpBarCharts[action.config.componentId].data = state.categoryData.categories[action.data.sliceIndex].items;
      return {
        ...state,
        barCharts: [...tmpBarCharts]
      };

    case UV_BAR_CHART.SELECT:
      tmpAngularGuages = state.angularGauages;
      selectedCategory = state.categoryData.categories[state.categoryData.selectionIndex];
      selectedCategory.selectionIndex = action.data.columnIndex;
      selectedBarChart =  selectedCategory.items[action.data.columnIndex];
      state.angularGauages[action.config.componentId].data.score = selectedBarChart.rating;

      state.numbers = mapNumberComponents(selectedCategory, selectedBarChart);
      return {
        ...state,
        angularGauages: [...tmpAngularGuages]
      };

    default:
      return state;
  }
};

export default UVDashboardReducer;
