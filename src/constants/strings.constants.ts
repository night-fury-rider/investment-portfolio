// This file is intended to serve as the single source of truth for all strings/messages which are visible to user (including error messages)
// Prefer keeping strings inside appropriate module objects

const COMMON = {
  errorsMsg: {
    itemNotFound: "Unable to find the item",
  },
  colorScheme: {
    light: "light",
    dark: "dark",
  },
  noData: "No data is available",
};

const DASHBOARD = {
  addInvestment: {
    addButtonLabel: "Add Investment",
    amount: "Amount",
    category: "Category",
    folio: "Folio Name",
    goal: "Goal",
    subCategory: "Sub-Category",
    successDialog: {
      buttonClose: "Close",
      message: "Your investment has been successfully added! 🎉",
      title: "Success!",
    },
    title: "Add Investment",
  },
  table: {
    title: "Investment Details",
  },
};

const HEADER = {
  add: {
    title: "Add",
  },
  home: {
    title: "Home",
  },
  investments: {
    title: "Investments",
  },
  title: "Investment Portfolio",
  upload: {
    title: "Update Data",
  },
};

const INVESTMENT_RECORDS = {
  category: "Category",
  currentValue: "Current (₹)",
  folio: "Folio",
  goal: "Goal",
  investedValue: "Invested (₹)",
  subCategory: "Sub-Category",
  title: "Investment Records",
};

const SETTINGS = {
  title: "Settings",
  appVersion: "App Version",
};

export { COMMON, DASHBOARD, HEADER, INVESTMENT_RECORDS, SETTINGS };
