import APP_CONFIG from "$/constants/app.config.constants";
import {
  IBaseData,
  ICategory,
  IGoal,
  ISubCategory,
  ISubItem,
  IValueType,
  IViewType,
} from "global.types";
import LoggerService from "$/services/LoggerService";
import {
  formatDate,
  generateRandomHexColor,
  getTotalAmountInSelectedUnit,
} from "$/services/UtilService";
import { ADD_INVESTMENT } from "$/constants/strings.constants";

const createCategory = (
  label: string,
  {
    absoluteValue = 0,
    color = "skyblue",
    expenseRatio = -1,
    goal = "",
    id = -1,
    notes = [""],
    value = 0,
  } = {}
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
  {
    collection = 0,
    id = -1,
    targetAmount = 0,
    isOnTrack = false,
    notes = [""],
    targetDate = "",
  } = {}
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

/**
 * Processes an array of sub-category data to create a bar chart data array.
 *
 * @param {ISubCategory[]} barChartData - An array of sub-category data objects.
 * @returns {Array<{label: string, value: number}>} - An array of objects suitable for a bar chart,
 * containing label and value properties.
 */
const getBarChartData = (barChartData: ISubCategory[]) => {
  const barChartArr = [];
  for (let i = 0; i < barChartData.length; i++) {
    if (barChartData[i].absoluteValue > 0) {
      barChartArr.push({
        label: barChartData[i].label,
        value: barChartData[i].value,
      });
    }
  }
  return barChartArr;
};

/**
 * Transforms a flat list of investment categories into a goal-based category structure.
 *
 * Each unique `goal` found in the input categories becomes a top-level `ICategory`,
 * and all categories associated with that goal are grouped under it as `subCategories`.
 * The function also merges all nested records from each category's subCategories into
 * the resulting subCategory’s `records` array.
 *
 * If a matching goal is found in the provided `goals` array, its `color`, `id`, and `notes`
 * are used for the top-level category.
 *
 * @param {ICategory[]} categories - The original list of investment categories containing sub-categories and goal associations.
 * @param {IGoal[]} goals - A list of goals to provide metadata (like color, id, notes) for the top-level categories.
 *
 * @returns {ICategory[]} A new category list where each goal is a top-level category,
 *                        and each associated category is a sub-category with flattened records.
 *
 * @example
 * const result = transformGoalsToCategoryStructure(data.categories, data.goals);
 */

const transformGoalsToCategoryStructure = (
  categories: ICategory[],
  goals: IGoal[]
): ICategory[] => {
  const goalInfoMap = new Map<string, IGoal>();
  goals.forEach((goal) => {
    goalInfoMap.set(goal.label, goal);
  });

  const goalMap = new Map<string, ICategory>();

  categories.forEach((category) => {
    let goalName = category.goal;
    if (!goalName) {
      return;
    }

    if (!goalMap.has(goalName)) {
      const goalInfo = goalInfoMap.get(goalName);
      goalMap.set(goalName, {
        absoluteValue: 0,
        color: goalInfo?.color || generateRandomHexColor(),
        id: goalInfo?.id ?? goalMap.size + 1,
        label: goalName,
        value: 0,
        subCategories: [],
        notes: goalInfo?.notes || [],
      });
    }

    let transformedSubCategory: ISubCategory;
    let sameGoalSubCategories: ISubCategory[] = [];
    let differentGoalSubCategories: ISubCategory[] = [];
    let hasDifferentGoal;

    for (let subCategory of category.subCategories) {
      if (subCategory.goal && subCategory.goal !== category.goal) {
        hasDifferentGoal = true;
        transformedSubCategory = {
          absoluteValue: subCategory.absoluteValue,
          id: subCategory.id,
          label: subCategory.label,
          value: subCategory.value,
          records: subCategory.records,
          notes: subCategory.notes,
          expenseRatio: subCategory.expenseRatio,
          goal: subCategory.goal,
        };
        differentGoalSubCategories.push(transformedSubCategory);
      } else {
        transformedSubCategory = {
          absoluteValue: category.absoluteValue,
          id: category.id,
          label: category.label,
          value: subCategory.value,
          records: subCategory.records,
          notes: category.notes,
          expenseRatio: category.expenseRatio,
          goal: goalName,
        };
        sameGoalSubCategories.push(transformedSubCategory);
      }
    }

    if (hasDifferentGoal) {
      for (let differentGoalSubCategory of differentGoalSubCategories) {
        if (differentGoalSubCategory.goal) {
          goalMap
            .get(differentGoalSubCategory.goal)
            ?.subCategories.push(differentGoalSubCategory);
        }
      }
    }

    const allRecords =
      sameGoalSubCategories?.flatMap((subCat) => subCat.records || []) || [];

    transformedSubCategory = {
      absoluteValue: category.absoluteValue,
      id: category.id,
      label: category.label,
      value: category.value,
      records: allRecords,
      notes: category.notes,
      expenseRatio: category.expenseRatio,
      goal: goalName,
    };

    goalMap.get(goalName)?.subCategories.push(transformedSubCategory);
  });

  return Array.from(goalMap.values());
};

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

/**
 * Checks if the provided dashboard data is valid.
 *
 * @param {IBaseData} dashboardData - The dashboard data to validate.
 * @returns {boolean} - `true` if the data is valid, `false` otherwise.
 */
const isDashboardDataValid = (dashboardData: IBaseData): boolean => {
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

/**
 * Checks if the provided dashboard data is considered empty.
 *
 * @param {IBaseData} dashboardData - The dashboard data to check for emptiness.
 * @returns {boolean} - `true` if the data is empty (absoluteValue is 0), `false` otherwise.
 */
const isDashboardEmpty = (dashboardData: IBaseData): boolean =>
  dashboardData?.absoluteValue === 0;

type IRefineEntireDataProps = {
  categories: ICategory[];
  currencyUnit?: number;
  dateFormat?: string;
  goals?: IGoal[];
  valueType?: IValueType;
  viewType?: IViewType;
};

const refineEntireData = ({
  categories,
  currencyUnit = APP_CONFIG.currencyUnits[0].value,
  dateFormat = APP_CONFIG.dateFormats[0].value,
  goals = [],
  valueType = "investedValue",
  viewType = APP_CONFIG.entityTypes.categories as IViewType,
}: IRefineEntireDataProps) => {
  let categoryTotal = 0;
  let subCategoryTotal = 0;

  let value = 0;
  let absoluteValue = 0;

  let currentCategory;
  let currentSubCategory;
  let currentRecord;

  let refinedCategories = categories;

  if (viewType === APP_CONFIG.entityTypes.goals) {
    refinedCategories = transformGoalsToCategoryStructure(
      refinedCategories,
      goals
    );
  }

  /* Interate through Categories */
  for (let i = 0; i < refinedCategories.length; i++) {
    currentCategory = refinedCategories[i];
    categoryTotal = 0;

    /* Interate through Sub Categories */
    for (let j = 0; j < currentCategory?.subCategories?.length; j++) {
      currentSubCategory = currentCategory.subCategories[j];

      subCategoryTotal = 0;

      /* Interate through Records */
      for (let k = 0; k < currentSubCategory?.records?.length; k++) {
        currentRecord = currentSubCategory.records[k];

        if (valueType === "investedValue" || valueType === "currentValue") {
          categoryTotal += currentRecord?.[valueType] || 0;
          subCategoryTotal += currentRecord?.[valueType] || 0;
        }
        if (currentRecord?.date) {
          currentRecord.date =
            formatDate({
              date: currentRecord.date,
              format: dateFormat,
            }) || "";
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
      refinedCategories[i].subCategories[j].value =
        getTotalAmountInSelectedUnit(subCategoryTotal, currencyUnit);
      refinedCategories[i].subCategories[j].absoluteValue = subCategoryTotal;

      /* Sorted records based on the their timestamp */
      currentSubCategory.records = currentSubCategory.records.sort(
        (a: ISubItem, b: ISubItem) => a?.dateTimestamp - b?.dateTimestamp
      );
    }
    refinedCategories[i].value = getTotalAmountInSelectedUnit(
      categoryTotal,
      currencyUnit
    );
    absoluteValue += categoryTotal;

    refinedCategories[i].absoluteValue = categoryTotal;
    value += getTotalAmountInSelectedUnit(categoryTotal, currencyUnit);
  }
  /* Sorted categories based on the their absolute values */
  refinedCategories = refinedCategories.sort(
    (a: ICategory, b: ICategory) => b?.absoluteValue - a?.absoluteValue
  );

  return {
    absoluteValue,
    categories: refinedCategories,
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
  isDashboardEmpty,
  refineEntireData,
};
