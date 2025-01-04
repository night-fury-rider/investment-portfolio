// It is inteneded to contain all local utility things like string operations, object manipulalations etc.

import LoggerService from "./LoggerService";
import APP_CONFIG from "constants/app.config.constants";

const getClonedObject = (sourceObj: any) =>
  JSON.parse(JSON.stringify(sourceObj));

const getTotalAmountInSelectedUnit = (amount: number, unit = "Lakh") => {
  if (isNaN(amount)) {
    LoggerService.error(`Incorrect Number is passed for getting amount`);
    return 0;
  }
  let resultAmount;
  switch (unit) {
    case "Thousand":
      resultAmount = amount / 1000;
      break;
    default:
      resultAmount = amount / 100000;
  }

  return Number(resultAmount.toFixed(APP_CONFIG.decimalPlaces));
};

export { getClonedObject, getTotalAmountInSelectedUnit };
