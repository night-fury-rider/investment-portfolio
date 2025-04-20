// This file is intended to serve as the single source of truth for all app level configurations.

const APP_CONFIG = {
  currencyUnits: [
    {
      title: "Lakhs",
      value: 100000,
    },
    {
      title: "Thousands",
      value: 1000,
    },
    {
      title: "Millions",
      value: 1000000,
    },
    {
      title: "Crores",
      value: 10000000,
    },
  ],
  dashboardTableColumns: [
    { id: "date", label: "Date", numeric: false },
    { id: "folio", label: "Folio", numeric: false },
    { id: "goal", label: "Goal", numeric: false },
    { id: "investedValue", label: "Invested Value", numeric: true },
    { id: "currentValue", label: "Current Value", numeric: true },
  ],
  dateFormats: [
    {
      title: "DD-MMM-YYYY",
      value: "DD-MMM-YYYY",
    },
    {
      title: "YYYY-MM-DD",
      value: "YYYY-MM-DD",
    },
  ],
  decimalPlaces: 2,
  font: {
    family: "IBM Plex Serif",
  },
  languages: [
    {
      title: "English",
      value: "en",
    },
  ],
  numberFormats: [
    {
      title: "Indian Format (en-IN)",
      value: "en-IN",
    },
    {
      title: "US Format (en-US)",
      value: "en-US",
    },
  ],
  routes: {
    addInvestment: "add-investment",
    home: "/",
    investments: "/investments",
    settings: "/settings",
  },
  sessionStorage: {
    appData: "investmentData",
    storageCurrencyUnit: "currencyUnit",
    storageDateFormat: "dateFormat",
    storageLanguage: "language",
    storageNumberFormat: "numberFormat",
    storageValueType: "valueType",
  },
  valueTypes: [
    {
      title: "Invested Value",
      value: "investedValue",
    },
    {
      title: "Current Value",
      value: "currentValue",
    },
  ],
  snackbar: {
    addInvestment: {
      autoHideDuration: 1 * 1000, // milliseconds
    },
    settings: {
      autoHideDuration: 1 * 1000, // milliseconds
    },
  },
};

export default APP_CONFIG;
