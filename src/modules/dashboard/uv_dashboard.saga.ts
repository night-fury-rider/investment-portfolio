import { call, put, takeEvery } from 'redux-saga/effects';

import UvNumberPojo from '../../components/uv_number/uv_number.pojo';
import { UVAmount, UVCategory, UVItem, UVNumberProps } from '../../shared/Types';
import { updateDashboard } from './uv_dashboard.actions';

import UvDashboardApi from './uv_dashboard.api';
import UV_DASHBOARD from './uv_dashboard.constants';

import * as appData from './../../shared/uv_app-data.json';

import barChartConfig from './../../components/uv_bar-chart/uv_bar-chart.json';
import angularGaugeConfig from './../../components/uv_angular-gauge/uv_angular-gauge.json';

const defaultComponentId = 0;

export function* UvDashboardSaga() {
  yield takeEvery(UV_DASHBOARD.INIT, initDashboardSaga);
}

function* initDashboardSaga() {

  let categoryData = {
    selectionIndex: 0,
    categories: [] as UVCategory[]
  };

  let response = yield call(UvDashboardApi.getDashboardData);

  let largestCategoryIndex = 0;
  let largestItemIndexes: number[] = [];

  // Calculate largest Category and it's largest's item indexes.
  response.data.categories.reduce((categoryTotalAccumulator: number, currentCategory: any, categoryIndex: number) => {

    categoryData.categories[categoryIndex] = {
      config: {
        id: currentCategory.id,
        name: currentCategory.name,
        value: currentCategory.value,
        color: currentCategory.color,
        expenseRatio: currentCategory.expenseRatio
      },
      selectionIndex: 0,
      items: currentCategory.items
    }
    let categoryTotal = currentCategory.items.reduce((itemAccumulator: number, currentItem: UVItem, itemIndex: number, items: UVItem[])=> {
      if(itemIndex > 0 && currentItem.current.amount > items[itemIndex-1].current.amount) {
        largestItemIndexes[categoryIndex] = itemIndex;
      }
      return itemAccumulator + currentItem.current.amount;
    }, 0);

    if(categoryTotal > categoryTotalAccumulator) {
      largestCategoryIndex = categoryIndex;
      return categoryTotal;
    }

    categoryData.categories[categoryIndex].selectionIndex = largestItemIndexes[categoryIndex];
    return categoryTotalAccumulator;
  }, 0);

  const selectedCategory = categoryData.categories[largestCategoryIndex];
  const selectedInstrument = selectedCategory.items[largestItemIndexes[largestCategoryIndex]];

  const uvNumbers: UVNumberProps[] = mapNumberComponents(selectedCategory, selectedInstrument);

  let dashboardData = {
    categoryData: categoryData,
    pieCharts: [{
      config: response.data.pieConfig,
      data: {
        selectionIndex: 0,
        categories: response.data.categories
      }
    }],
    barCharts: [{
      config: barChartConfig.config,
      data: response.data.categories[defaultComponentId].items
    }],
    angularGauages: [{
      config: angularGaugeConfig.config,
      data: {
        score: (selectedInstrument.rating > 0) ? (selectedInstrument.rating - 1) : selectedInstrument.rating,
        items: angularGaugeConfig.data
      }
    }],
    uvNumbers: uvNumbers
  };
  yield put(updateDashboard(dashboardData));
}

/**
 * @description Function to compose and return number components.
 * @param selectedCategory - Selected Category
 * @param selectedInstrument - Selected Investment Instrument or plan
 */
const mapNumberComponents = (selectedCategory: UVCategory, selectedInstrument: UVItem) => {

  let categoryValue: number;
  let instrumentValue: number;

  return appData.data.numbers.map((numberObj) => {
    categoryValue = (selectedCategory && selectedCategory.config && selectedCategory.config[numberObj.keyName] as number) || -1;
    instrumentValue = (selectedInstrument && selectedInstrument[numberObj.keyName] as number) || -1;
    return new UvNumberPojo({
      config: {
        class: numberObj.isSingleColor ? '' : ((instrumentValue < categoryValue) ? 'uv-color-success' : 'uv-color-danger')
      },
      title: instrumentValue,
      label: numberObj.title,
      subtitle: numberObj.subTitlePrefix + (categoryValue !== -1 ? categoryValue : '')
    }).numberData
  });
}

/**
 * @description Function to get sector total.
 * @param category Category for the Pie chart
 * @param valueType Value type.
 */
function getSectorTotal(category: UVCategory, valueType: string) {
  let total = 0;
  for (const item of category.items) {
    let itemValue = item[valueType] as UVAmount;
    if(category.isAmountOnly && itemValue && itemValue.amount) {
      total += itemValue.amount;
    } else if(itemValue && itemValue.price && itemValue.quantity){
      total += itemValue.price * itemValue.quantity;
    }
  }
  return total;
}

/**
 * @description Function to get processed pie chart data.
 * @param rawPieData - Raw pie chart data
 */
const getProcessedPieData = (sectors: UVCategory[], valueType: string) => {
  const processedSectors = [];
  for (const sector of sectors) {
    sector.value = getSectorTotal(sector, valueType);
    if (sector.value > 0) {
      processedSectors.push(sector);
    }
  }
  return processedSectors;
}

export {
  mapNumberComponents,
  getProcessedPieData
}
