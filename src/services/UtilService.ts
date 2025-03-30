// It is inteneded to contain all local utility things like string operations, object manipulalations etc.

import LoggerService from "./LoggerService";
import APP_CONFIG from "$/constants/app.config.constants";

// TODO: Yuvraj Add this in util npm package
const getClonedObject = <T>(sourceObj: T): T => structuredClone(sourceObj);

// TODO: Yuvraj Add this in util npm package's Date module
/**
 * @description Get Date String from the Date object passed
 * @param dateObj Date object
 */
const getDateString = (dateObj: Date): string => {
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// TODO: Yuvraj Add this in util npm package
const getParsedObject = (sourceObj: string) => {
  let result;

  try {
    result = JSON.parse(sourceObj);
  } catch (err) {
    LoggerService.error(`Error in getting parsed object: ${err}`);
    return null;
  }

  return result;
};

/**
 * @description Generates a random hex color code.
 * @returns {string} A random 6-digit hex color code (e.g., "#a3f5d9").
 */

const generateRandomHexColor = () =>
  "#xxxxxx".replace(/x/g, () => ((Math.random() * 16) | 0).toString(16));

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

export {
  generateRandomHexColor,
  getClonedObject,
  getDateString,
  getParsedObject,
  getTotalAmountInSelectedUnit,
};
