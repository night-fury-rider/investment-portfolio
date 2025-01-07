import APP_CONFIG from "$/constants/app.config.constants";
import { iCategory, iItem } from "$/dashboard/dashboard.types";
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

const refineEntireData = (categories: iCategory[], attr = "investedValue") => {
  let categoryTotal = 0;
  let subCategoryTotal = 0;

  let value = 0;
  let absoluteValue = 0;

  for (let i = 0; i < categories.length; i++) {
    categoryTotal = 0;
    for (let j = 0; j < categories[i].items.length; j++) {
      subCategoryTotal = 0;
      for (let k = 0; k < categories[i].items[j]?.subItems?.length; k++) {
        if (attr === "investedValue" || attr === "currentValue") {
          categoryTotal +=
            categories[i]?.items?.[j]?.subItems?.[k]?.[attr] || 0;
          subCategoryTotal += categories[i].items[j]?.subItems[k]?.[attr] || 0;
        }
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
    (a: iCategory, b: iCategory) => b?.absoluteValue - a?.absoluteValue
  );

  return {
    categories,
    absoluteValue,
    value: Number(value.toFixed(APP_CONFIG.decimalPlaces)),
  };
};

const getBarChartData = (barChartData: iItem[]) => {
  return barChartData.map((barChartObj) => ({
    label: barChartObj.label,
    value: barChartObj.value,
  }));
};

export { getBarChartData, getTotalAmount, refineEntireData };
