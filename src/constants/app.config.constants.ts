// This file is intended to serve as the single source of truth for all app level configurations.

const APP_CONFIG = {
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
  },
  unit: "Lakh",
  defaultValueType: "investedValue",
};

export default APP_CONFIG;
