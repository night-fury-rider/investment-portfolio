// This file is intended to serve as the single source of truth for all app level configurations.

const APP_CONFIG = {
  dashboardTableColumns: [
    { id: "date", label: "Date", numeric: false },
    { id: "folio", label: "Folio", numeric: false },
    { id: "goal", label: "Goal", numeric: false },
    { id: "investedValue", label: "Invested Value", numeric: true },
    { id: "currentValue", label: "Current Value", numeric: true },
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
    language: "language",
    numberFormat: "numberFormat",
    valueType: "valueType",
  },
  unit: "Lakh",
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
};

export default APP_CONFIG;
