// It is inteneded to contain all local utility things like string operations, object manipulalations etc.

import LoggerService from "./LoggerService";
import APP_CONFIG from "$/constants/app.config.constants";

// TODO: Yuvraj Add this in util npm package
const getClonedObject = <T>(sourceObj: T): T =>
  JSON.parse(JSON.stringify(sourceObj));

// TODO: Yuvraj Add this in util npm package
const getParsedObject = (sourceObj: string) => {
  let result;

  try {
    result = JSON.parse(sourceObj);
  } catch (err) {
    LoggerService.error(`Error in getting parsed object: ${err}`);
  }

  return result;
};

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

export { getClonedObject, getParsedObject, getTotalAmountInSelectedUnit };
