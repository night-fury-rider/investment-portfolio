import { GridValueFormatter } from "@mui/x-data-grid";
import uvNumber from "@uv-tech/util/lib/uv-number";

import APP_CONFIG from "$/constants/app.config.constants";
import {
  COMMON,
  ERRORS,
  INVESTMENT_RECORDS,
} from "$/constants/strings.constants";
import {
  IBaseData,
  ICategory,
  IInvestmentRecord,
  INewInvestment,
  INewInvestmentParam,
  IValueType,
} from "global.types";
import {
  isDashboardDataValid,
  refineEntireData,
} from "$/dashboard/DashboardService";
import LoggerService from "$/services/LoggerService";
import StorageService from "$/services/StorageService";
import { getParsedObject } from "$/services/UtilService";

const deleteInvestmentRecord = (investmentRecord: IInvestmentRecord): void => {
  const baseData = extractInvestments();

  if (!baseData) {
    return;
  }

  let currentCategory;
  let currentSubCategory;
  let currentRecord;
  let isDataUpdated;
  for (let i = 0; i < baseData.categories.length; i++) {
    currentCategory = baseData.categories[i];
    if (currentCategory.label !== investmentRecord.category) {
      continue;
    }
    for (let j = 0; j < currentCategory.subCategories.length; j++) {
      currentSubCategory = currentCategory.subCategories[j];
      if (currentSubCategory.label !== investmentRecord.subCategory) {
        continue;
      }
      for (let k = 0; k < currentSubCategory.records.length; k++) {
        currentRecord = currentSubCategory.records[k];
        if (
          currentRecord.folio === investmentRecord.folio &&
          currentRecord.goal === investmentRecord.goal
        ) {
          currentSubCategory.records.splice(k, 1);
          isDataUpdated = true;
          LoggerService.info(COMMON.actions.delete.success);
          break;
        }
      }
    }
  }
  if (isDataUpdated) {
    const updatedData = refineEntireData({ categories: baseData.categories });
    baseData.absoluteValue = updatedData.absoluteValue;
    baseData.categories = updatedData.categories;
    baseData.value = updatedData.value;
    persistInvestments(JSON.stringify(baseData));
  }
};

/**
 * @description Extract investments from storage.
 * @returns extracted data if available else null.
 */
const extractInvestments = (): IBaseData | null => {
  const savedData = StorageService.get(
    APP_CONFIG.sessionStorage.storageAppData
  );
  if (savedData) {
    const extractedData = getParsedObject(savedData);
    if (isDashboardDataValid(extractedData)) {
      return extractedData;
    }
  }
  return null;
};

/**
 * @description Function to get Investment columns
 * @param isMobile {boolean}
 * @returns investment columns
 */
const getInvestmentColumns = (isMobile: boolean, locale = "en-IN") => {
  if (isMobile) {
    return [
      { field: "date", headerName: INVESTMENT_RECORDS.date, width: 200 },
      { field: "goal", headerName: INVESTMENT_RECORDS.goal, width: 200 },
      {
        field: "category",
        headerName: INVESTMENT_RECORDS.category,
        width: 150,
      },
      {
        field: "subCategory",
        headerName: INVESTMENT_RECORDS.subCategory,
        width: 200,
      },
      { field: "folio", headerName: INVESTMENT_RECORDS.folio, width: 200 },
      {
        field: "investedValue",
        headerName: INVESTMENT_RECORDS.investedValue,
        width: 200,
        type: "number",
        valueFormatter: (params: GridValueFormatter) =>
          uvNumber.changeCurrencyFormat(Number(params), locale),
      },
      {
        field: "currentValue",
        headerName: INVESTMENT_RECORDS.currentValue,
        width: 200,
        type: "number",
        valueFormatter: (params: GridValueFormatter) =>
          uvNumber.changeCurrencyFormat(Number(params), locale),
      },
    ];
  }
  return [
    { field: "date", headerName: INVESTMENT_RECORDS.date, flex: 1 },
    { field: "goal", headerName: INVESTMENT_RECORDS.goal, flex: 1 },
    { field: "category", headerName: INVESTMENT_RECORDS.category, flex: 1 },
    {
      field: "subCategory",
      headerName: INVESTMENT_RECORDS.subCategory,
      flex: 1,
    },
    { field: "folio", headerName: INVESTMENT_RECORDS.folio, flex: 1.5 },
    {
      field: "investedValue",
      headerName: INVESTMENT_RECORDS.investedValue,
      type: "number",
      flex: 1,
      valueFormatter: (params: GridValueFormatter) =>
        uvNumber.changeCurrencyFormat(Number(params), locale),
    },
    {
      field: "currentValue",
      headerName: INVESTMENT_RECORDS.currentValue,
      type: "number",
      flex: 1,
      valueFormatter: (params: GridValueFormatter) =>
        uvNumber.changeCurrencyFormat(Number(params), locale),
    },
  ];
};

/**
 * @description Get New Investment Object
 *
 * @param amount {string} - Amount to be added
 * @param categories {ICategories Array} - Categories Array
 * @param categoryName {string} - Category Name
 * @param date {string} - Transaction Date
 * @param dateTimestamp {number} - Transaction timestamp
 * @param folioName {string} - Folio Name
 * @param goal {string} - Goal Name
 * @param goals  {IGoals Array} - Goals Array
 * @param subCategory {string} - Sub Category Name
 * @returns newly created investment object
 */
const getNewInvestmentObj = ({
  amount,
  categories,
  category,
  date,
  dateTimestamp,
  folioName,
  goal,
  goals,
  subCategory,
}: INewInvestmentParam): INewInvestment => {
  let goalIndex = goals.findIndex((goalObj) => goalObj.label === goal);
  if (goalIndex === -1) {
    goalIndex = goals.length;
  }
  let categoryIndex = categories.findIndex(
    (categoryObj) => categoryObj.label === category
  );
  if (categoryIndex === -1) {
    categoryIndex = categories.length;
  }

  let subCategoryIndex = categories?.[categoryIndex]?.subCategories?.findIndex(
    (subCategoryObj) => subCategoryObj.label === subCategory
  );
  if (subCategoryIndex === -1) {
    subCategoryIndex = categories[categoryIndex].subCategories.length;
  }
  return {
    amount: Number(amount),
    categoryIndex,
    category,
    date,
    dateTimestamp,
    folioName,
    goalIndex,
    goal,
    subCategoryIndex,
    subCategory,
  };
};

/**
 * @description Persist Investment Data
 * @param investmentData {string} Investment Data to be persisted.
 * @returns investment data object which is persisted.
 */
const persistInvestments = (investmentData: string): IBaseData | null => {
  const newInvestmentData = getParsedObject(investmentData);

  if (newInvestmentData && isDashboardDataValid(newInvestmentData)) {
    StorageService.set(
      APP_CONFIG.sessionStorage.storageAppData,
      JSON.stringify(newInvestmentData)
    );
  } else {
    LoggerService.error(ERRORS.data.corrupt);
  }
  return newInvestmentData;
};

type IPrepareInvestmentRecordsProps = {
  categories: ICategory[];
  valueType?: IValueType;
  dateFormat?: string;
};

/**
 *@description Prepare Investment Records
 * @param categories {ICategory[]} Category Array
 * @returns Prepared investment Records.
 */
const prepareInvestmentRecords = ({
  categories,
  valueType = "investedValue",
  dateFormat = APP_CONFIG.dateFormats[0].value,
}: IPrepareInvestmentRecordsProps) => {
  const refinedCategories = refineEntireData({
    categories: categories,
    valueType,
    dateFormat,
  }).categories;
  const result = [] as IInvestmentRecord[];

  let currentCategory;
  let currentSubCategory;
  let currentRecord;
  let recordId = 1;

  /* Interate through Categories */
  for (let i = 0; i < refinedCategories.length; i++) {
    currentCategory = refinedCategories[i];

    /* Interate through Sub Categories */
    for (let j = 0; j < currentCategory.subCategories.length; j++) {
      currentSubCategory = currentCategory.subCategories[j];

      /* Interate through Records */
      for (let k = 0; k < currentSubCategory?.records?.length; k++) {
        currentRecord = currentSubCategory.records[k];

        result.push({
          id: recordId++,
          category: currentCategory.label,
          currentValue: currentRecord.currentValue || 0,
          date: currentRecord.date,
          folio: currentRecord.folio,
          goal: currentRecord.goal || "",
          investedValue: currentRecord.investedValue,
          subCategory: currentSubCategory.label,
        });
      }
    }
  }

  return result;
};

export {
  deleteInvestmentRecord,
  extractInvestments,
  getInvestmentColumns,
  getNewInvestmentObj,
  prepareInvestmentRecords,
};
