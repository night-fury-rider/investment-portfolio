import { call, put, takeEvery } from 'redux-saga/effects';

import UVNumberPojo from '../../components/uv_number/uv_number.pojo';
import { UVAmount, UVCategory, UVItem } from '../../shared/Types';
import { UVNumberProps } from '../../components/uv_number/uv_number.types';
import { updateDashboard } from './uv_dashboard.actions';

import UVDashboardApi from './uv_dashboard.api';
import UV_DASHBOARD from './uv_dashboard.constants';

import * as appData from '../../shared/uv_app-data.json';

import barChartConfig from '../../components/uv_bar-chart/uv_bar-chart.json';
import angularGaugeConfig from '../../components/uv_angular-gauge/uv_angular-gauge.json';

const defaultComponentId = 0;

export function* UVDashboardSaga() {
  yield takeEvery(UV_DASHBOARD.INIT, initDashboardSaga);
}

function* initDashboardSaga(): any {

  let categoryData = {
    selectionIndex: 0,
    categories: [] as UVCategory[]
  };

  let response = yield call(UVDashboardApi.getDashboardData);

  let totalValue = 0;
  let largestCategoryIndex = 0;
  let largestItemIndexes: number[] = [];

  // Calculate largest Category and it's largest's item indexes.
  response.data.categories.reduce((categoryTotalAccumulator: number, currentCategory: any, categoryIndex: number) => {

    categoryData.categories[categoryIndex] = {
      id: currentCategory.id,
      name: currentCategory.name,
      color: currentCategory.color,
      selectionIndex: 0,
      items: getProcessedBarChartData(currentCategory.items, 'current', true) as UVItem[]
    }
    let categoryTotal = categoryData.categories[categoryIndex].items.reduce((itemAccumulator: number, currentItem: UVItem, itemIndex: number, items: UVItem[])=> {
      if(itemIndex > 0 && currentItem.value > items[itemIndex-1].value) {
        largestItemIndexes[categoryIndex] = itemIndex;
      }
      return itemAccumulator + currentItem.value;
    }, 0);

    // Add `value` property in category which will hold total of category.
    categoryData.categories[categoryIndex].value = categoryTotal;

    totalValue += categoryTotal;

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
    totalValue: totalValue,
    categoryData: categoryData,
    pieCharts: [{
      config: response.data.pieConfig,
      data: {
        selectionIndex: 0,
        categories: categoryData.categories
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

  const AVERAGE = 'average_';
  let averageValue: number;
  let instrumentValue: number;
  let instrumentClass: string;

  return appData.data.numbers.map((numberObj) => {
    averageValue = (selectedInstrument && selectedInstrument[AVERAGE + numberObj.keyName] as number);
    instrumentValue = (selectedInstrument && selectedInstrument[numberObj.keyName] as number);

    if(numberObj.isSingleColor) {
      instrumentClass = '';
    } else {
      if(numberObj.shouldBeMore) {
        instrumentClass = (instrumentValue >= averageValue) ? 'uv-color-success' : 'uv-color-danger';
      } else {
        instrumentClass = (instrumentValue <= averageValue) ? 'uv-color-success' : 'uv-color-danger';
      }
    }

    return new UVNumberPojo({
      config: {
        class: instrumentClass
      },
      title: instrumentValue,
      label: numberObj.title,
      subtitle: numberObj.subTitlePrefix + (averageValue ? averageValue : '')
    }).numberData
  });
}

/**
 * @description Function to compose and return table components.
 * @param selectedInstrument - Selected Investment Instrument or plan
 */
const mapTableComponents = (selectedInstrument: UVItem) => {
  return [{
    headers: appData.data.tables.headers,
    rows: selectedInstrument.returns as any[]
  }]
}

/**
 * @description Function to get processed bar chart data.
 * @param items - Items of Bar Chart
 * @param valueType - Value Type (current or initial)
 * @param isAmountOnly - true if amount has to be used directly.
 */
function getProcessedBarChartData(items: UVItem[], valueType: string, isAmountOnly: boolean) {
  for (const item of items) {
    const amountObj = item[valueType] as UVAmount;
    if(!item) {
      console.error('Data format is incorrect for bar chart');
      return;
    }
    if(amountObj && isAmountOnly) {
      item.value = amountObj.amount;
    } else if(amountObj){
      item.value = amountObj.price * amountObj.quantity;
    }

    if(item.subItems) {
      item.value = item.subItems.reduce((accumulator, obj)=> {
        return accumulator + obj.investedValue;
      }, 0)
    }
  }
  return items;
}

export {
  mapNumberComponents,
  mapTableComponents
}
