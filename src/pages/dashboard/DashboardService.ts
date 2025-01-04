import APP_CONFIG from "$/constants/app.config.constants";
import { iCategory } from "$/dashboard/dashboard.types";
import LoggerService from "services/LoggerService";
import { getTotalAmountInSelectedUnit } from "services/UtilService";

const getTotalAmount = (categories: iCategory[]) => {
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

const refineEntireData = (data: any[], attr = "investedValue") => {
  let categories = data.categories;
  let categoryTotal = 0;
  let subCategoryTotal = 0;

  let value = 0;
  let absoluteValue = 0;

  for (let i = 0; i < categories.length; i++) {
    categoryTotal = 0;
    for (let j = 0; j < categories[i].items.length; j++) {
      subCategoryTotal = 0;
      for (let k = 0; k < categories[i].items[j]?.subItems?.length; k++) {
        categoryTotal += categories[i].items[j]?.subItems[k]?.[attr];
        subCategoryTotal += categories[i].items[j]?.subItems[k]?.[attr];
      }
      categories[i].items[j].value = getTotalAmountInSelectedUnit(
        subCategoryTotal,
        APP_CONFIG.unit
      );
      categories[i].items[j].absoluteValue = subCategoryTotal;
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
    (a: any, b: any) => b?.absoluteValue - a?.absoluteValue
  );

  data.categories = categories;
  data.absoluteValue = absoluteValue;
  data.value = Number(value.toFixed(APP_CONFIG.decimalPlaces));

  console.log(`refined data:`, data);
  return data;
};

export { getTotalAmount, refineEntireData };
