// This file is intended to serve as the single source of truth for all strings/messages which are visible to user (including error messages)
// Prefer keeping strings inside appropriate module objects

import { title } from "process";

export const COMMON = {
  errorsMsg: {
    itemNotFound: "Unable to find the item",
  },
  colorScheme: {
    light: "light",
    dark: "dark",
  },
  noData: "No data is available",
};

export const DASHBOARD = {
  addInvestment: {
    addButtonLabel: "Add Investment",
    amount: "Amount",
    category: "Category",
    folio: "Folio Name",
    subCategory: "Sub-Category",
    successDialog: {
      buttonClose: "Close",
      message: "Your investment has been successfully added! 🎉",
      title: "Success!",
    },
    title: "Add Investment",
  },
  header: {
    title: "Investment Portfolio",
    upload: {
      title: "Update Data",
    },
  },
  table: {
    title: "Investment Details",
  },
};

export const SETTINGS = {
  title: "Settings",
  appVersion: "App Version",
};
