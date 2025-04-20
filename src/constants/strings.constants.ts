// This file is intended to serve as the single source of truth for all strings/messages which are visible to user (including error messages)
// Prefer keeping strings inside appropriate module objects

const ADD_INVESTMENT = {
  amount: "Amount",
  category: {
    inputLabel: "Category",
    newItemLabel: "New Category",
    newItemPlaceholder: "Enter a New Category",
  },
  createNew: {
    category: "Create a new Category",
    goal: "Create a new Goal",
    subCategory: "Create a new Sub-Category",
  },
  date: "Date",
  folio: "Folio Name",
  goal: {
    inputLabel: "Goal",
    newItemLabel: "New Goal",
    newItemPlaceholder: "Enter a New Goal",
  },
  subCategory: {
    inputLabel: "SubCategory",
    newItemLabel: "New Sub-Category",
    newItemPlaceholder: "Enter a New Sub-Category",
  },
  submitBtnLabel: "Add Investment",
  successMessage: "Investment added successfully.",
  title: "Add Investment",
};

const COMMON = {
  errorsMsg: {
    itemNotFound: "Unable to find the item",
  },
  colorScheme: {
    light: "light",
    dark: "dark",
  },
  noData: "No data is available",
  actions: {
    agree: "YES",
    cancel: "CANCEL",
    delete: {
      title: "Delete",
      confirm: "Are you sure you want to remove this investment?",
      success: "Record has been removed successfully",
    },
    no: "No",
  },
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

const ERRORS = {
  boundary: {
    headerText: "Oops! Something went wrong.",
    buttonText: "Try Again",
    message: "Error caught by ErrorBoundary:",
  },
  data: {
    corrupt: "The data does not meet the required criteria.",
  },
};

const HEADER = {
  add: {
    title: "Add",
  },
  download: {
    title: "Download",
  },
  home: {
    title: "Home",
  },
  investments: {
    title: "Investments",
  },
  settings: {
    title: "Settings",
  },
  title: "Dashboard",
  upload: {
    title: "Update Data",
  },
};

const INVESTMENT_RECORDS = {
  category: "Category",
  currentValue: "Current (₹)",
  date: "Date",
  folio: "Folio",
  goal: "Goal",
  investedValue: "Invested (₹)",
  subCategory: "Sub-Category",
  title: "Investment Records",
};

const SETTINGS = {
  title: "Settings",
  applySettings: "Apply Settings",
  appVersion: "App Version",
  language: {
    title: "Language",
    instruction: "Select Language",
  },
  numberFormat: {
    title: "Number Format",
    instruction: "Select Format",
    sampleNumber: "Sample Number (1234567890): ",
  },
  dateFormat: {
    title: "Date Format",
    instruction: "Select Format",
    sampleDate: "24-Jul-2024",
    sampleDateText: "Sample Date (24th July 2024): ",
  },
  successMessage: "Settings updated successfully.",
  valueType: {
    title: "Value Type",
    instruction: "Select Value Type",
  },
  currencyUnit: {
    title: "Currency Unit",
    instruction: "Select Currency Unit",
    sampleAmount: 1234567890,
    sampleText: "Sample Amount (1234567890): ",
  },
};

export {
  ADD_INVESTMENT,
  COMMON,
  DASHBOARD,
  ERRORS,
  HEADER,
  INVESTMENT_RECORDS,
  SETTINGS,
};
