import { ICategory, IInvestmentRecord } from "$/dashboard/dashboard.types";
import { refineEntireData } from "$/dashboard/DashboardService";

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

  console.log(result);

  return result;
};

export { prepareInvestmentRecords };
