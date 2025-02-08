import APP_CONFIG from "$/constants/app.config.constants";
import {
  ICategory,
  ISubCategory,
  IUploadData,
} from "$/dashboard/dashboard.types";
import LoggerService from "$/services/LoggerService";
import { getTotalAmountInSelectedUnit } from "$/services/UtilService";

const getTotalAmount = (categories: ICategory[]) => {
  if (!Array.isArray(categories)) {
    LoggerService.error(`Incorrect Number is passed for getting total amount`);
    return 0;
  }
  const totalAmount = categories.reduce(
    (acc, currentObj) => acc + (Number(currentObj.value) || 0),
    0
  );

  return getTotalAmountInSelectedUnit(totalAmount);
};

const getBarChartData = (barChartData: ISubCategory[]) =>
  barChartData.map((barChartObj) => ({
    label: barChartObj.label,
    value: barChartObj.value,
  }));

/**
 * @description Finds the index of the item with the highest value in an array of subCategories.
 * @param {ISubCategory[]} barChartData - An array of objects representing the data for a bar chart.
 * @returns {number} The index of the item with the highest value in the `barChartData` array.
 */
const getHighestItemIndex = (barChartData: ISubCategory[]) =>
  barChartData.reduce(
    (accumulator, currentObj, index) =>
      currentObj.value > barChartData[accumulator].value ? index : accumulator,
    0
  );

const isDashboardDataValid = (dashboardData: IUploadData) => {
  let result;

  /***
   * If data does not have valid
   * - categories
   * - goals
   * - sub-categories
   */

  if (
    !dashboardData?.categories ||
    !Array.isArray(dashboardData.categories) ||
    !dashboardData?.goals ||
    !Array.isArray(dashboardData.goals) ||
    !dashboardData?.categories[0].subCategories ||
    !Array.isArray(dashboardData.categories[0].subCategories)
  ) {
    return result;
  }

  return dashboardData;
};

const refineEntireData = (categories: ICategory[], attr = "investedValue") => {
  let categoryTotal = 0;
  let subCategoryTotal = 0;

  let value = 0;
  let absoluteValue = 0;

  let currentCategory;
  let currentSubCategory;
  let currentRecord;

  /* Interate through Categories */
  for (let i = 0; i < categories.length; i++) {
    currentCategory = categories[i];
    categoryTotal = 0;

    /* Interate through Sub Categories */
    for (let j = 0; j < currentCategory?.subCategories?.length; j++) {
      currentSubCategory = currentCategory.subCategories[j];

      subCategoryTotal = 0;

      /* Interate through Records */
      for (let k = 0; k < currentSubCategory?.records?.length; k++) {
        currentRecord = currentSubCategory.records[k];

        if (attr === "investedValue" || attr === "currentValue") {
          categoryTotal += currentRecord?.[attr] || 0;
          subCategoryTotal += currentRecord?.[attr] || 0;
        }
        // Set Goal to record if not set.
        if (currentRecord && !currentRecord?.goal) {
          if (currentSubCategory.goal) {
            currentRecord.goal = currentSubCategory.goal;
          } else if (currentCategory.goal) {
            currentRecord.goal = currentCategory.goal;
          } else {
            currentRecord.goal = "";
          }
        }
      }
      categories[i].subCategories[j].value = getTotalAmountInSelectedUnit(
        subCategoryTotal,
        APP_CONFIG.unit
      );
      categories[i].subCategories[j].absoluteValue = subCategoryTotal;
    }
    categories[i].value = getTotalAmountInSelectedUnit(
      categoryTotal,
      APP_CONFIG.unit
    );
    absoluteValue += categoryTotal;

    categories[i].absoluteValue = categoryTotal;
    value += getTotalAmountInSelectedUnit(categoryTotal, APP_CONFIG.unit);
  }
  /* Sorted categories based on the their absolute values */
  categories = categories.sort(
    (a: ICategory, b: ICategory) => b?.absoluteValue - a?.absoluteValue
  );

  return {
    categories,
    absoluteValue,
    value: Number(value.toFixed(APP_CONFIG.decimalPlaces)),
  };
};

export {
  getBarChartData,
  getHighestItemIndex,
  getTotalAmount,
  isDashboardDataValid,
  refineEntireData,
};
