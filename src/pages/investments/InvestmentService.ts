import { INVESTMENT_RECORDS } from "$/constants/strings.constants";
import { ICategory, IInvestmentRecord } from "$/dashboard/dashboard.types";
import { refineEntireData } from "$/dashboard/DashboardService";

/**
 * @description Function to get Investment columns
 * @param isMobile {boolean}
 * @returns investment columns
 */
const getInvestmentColumns = (isMobile: boolean) => {
  if (isMobile) {
    return [
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
      },
      {
        field: "currentValue",
        headerName: INVESTMENT_RECORDS.currentValue,
        width: 200,
        type: "number",
      },
    ];
  }
  return [
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
    },
    {
      field: "currentValue",
      headerName: INVESTMENT_RECORDS.currentValue,
      type: "number",
      flex: 1,
    },
  ];
};

const prepareInvestmentRecords = (categories: ICategory[]) => {
  const refinedCategories = refineEntireData(categories).categories;
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

export { getInvestmentColumns, prepareInvestmentRecords };
