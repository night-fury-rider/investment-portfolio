// It is inteneded to contain all local utility things like string operations, object manipulalations etc.

import LoggerService from "./LoggerService";
import APP_CONFIG from "$/constants/app.config.constants";
import StorageService from "./StorageService";

// TODO: Yuvraj Add this in util npm package
const getClonedObject = <T>(sourceObj: T): T => structuredClone(sourceObj);

// TODO: Yuvraj Add this in util npm package's Date module

type formatDateParam = {
  date: Date | number | string;
  format?: string;
};

/**
 * Formats a date object into a string based on the provided format.
 *
 * @param {object} params - An object containing the date and format.
 * @param {Date|number|string} params.date - The date to format. Can be a Date object,
 * a timestamp (number), or a date string that can be parsed by Date.parse().
 * @param {string} params.format - The desired date format string.
 * @returns {string|null} - The formatted date string, or null if the date is invalid.
 */
function formatDate({
  date,
  format = APP_CONFIG.dateFormats[0].value,
}: formatDateParam): string | null {
  if (!date || !format) {
    return null; // Handle null or undefined input
  }

  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return null; // Invalid date
  }

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");
  const milliseconds = String(dateObj.getMilliseconds()).padStart(3, "0");
  const monthNameShort = dateObj.toLocaleString("en-US", { month: "short" });

  return format
    .replace("YYYY", String(year))
    .replace("YY", String(year).slice(2))
    .replace("MMM", monthNameShort)
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds)
    .replace("SSS", milliseconds);
}

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

const generateRandomHexColor = (): string =>
  "#xxxxxx".replace(/x/g, () => ((Math.random() * 16) | 0).toString(16));

const getTotalAmountInSelectedUnit = (amount: number, unit = 100000) => {
  if (isNaN(amount)) {
    LoggerService.error(`Incorrect Number is passed for getting amount`);
    return 0;
  }

  return Number((amount / unit).toFixed(APP_CONFIG.decimalPlaces));
};

/**
 * Exports app data from sessionStorage and triggers a download of the data as a JSON file.
 */
const downloadData = () => {
  const data = JSON.parse(
    StorageService.get(APP_CONFIG.sessionStorage.storageAppData)
  );

  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = APP_CONFIG.download.fileName;
  a.click();

  URL.revokeObjectURL(url);
};

export {
  downloadData,
  formatDate,
  generateRandomHexColor,
  getClonedObject,
  getParsedObject,
  getTotalAmountInSelectedUnit,
};
