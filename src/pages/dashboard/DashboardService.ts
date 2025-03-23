import APP_CONFIG from "$/constants/app.config.constants";
import { IBaseData, ICategory, IGoal, ISubCategory } from "global.types";
import LoggerService from "$/services/LoggerService";
import { getTotalAmountInSelectedUnit } from "$/services/UtilService";
import { ADD_INVESTMENT } from "$/constants/strings.constants";

const createCategory = (
  label: string,
  absoluteValue = 0,
  color = "skyblue",
  expenseRatio = -1,
  goal = "",
  id = -1,
  notes = [""],
  value = 0
): ICategory => {
  return {
    absoluteValue,
    color,
    id,
    subCategories: [],
    label,
    value,
    expenseRatio,
    goal,
    notes,
  };
};

const createGoal = (
  label: string,
  collection = 0,
  id = -1,
  targetAmount = 0,
  isOnTrack = false,
  notes = [""],
  targetDate = ""
): IGoal => {
  return {
    label,
    collection,
    id,
    targetAmount,
    isOnTrack,
    notes,
    targetDate,
  };
};

const createSubCategory = (
  label: string,
  absoluteValue = 0,
  exitLoad = "-1",
  expenseRatio = -1,
  firstInvestmentDate = "",
  fundManagers = [""],
  fundHouse = "",
  fundSize = -1,
  goal = "",
  id = -1,
  launchDate = "",
  notes = [""],
  rating = -1,
  returns = [["-1", -1]],
  shortName = "",
  value = 0
): ISubCategory => {
  return {
    label,
    absoluteValue,
    id,
    records: [],
    value,
    exitLoad,
    expenseRatio,
    firstInvestmentDate,
    fundHouse,
    fundManagers,
    fundSize,
    goal,
    launchDate,
    notes,
    rating,
    returns,
    shortName,
  };
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

const getSubCategories = (
  categories: ICategory[],
  selectedCategoryLabel: string
): ISubCategory[] => {
  const selectedCategory = categories.find(
    (categoryObj) => categoryObj?.label === selectedCategoryLabel
  );
  let subCategories = [] as ISubCategory[];
  if (selectedCategory?.subCategories) {
    subCategories = [...selectedCategory?.subCategories];
  }
  subCategories.push(createSubCategory(ADD_INVESTMENT.createNew.subCategory));
  return subCategories;
};

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

const isDashboardDataValid = (dashboardData: IBaseData): boolean => {
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
    return false;
  }

  return true;
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
  createCategory,
  createGoal,
  createSubCategory,
  getBarChartData,
  getHighestItemIndex,
  getSubCategories,
  getTotalAmount,
  isDashboardDataValid,
  refineEntireData,
};
