import { ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";

import data from "$/public/data/data.json";
import { ibmFont } from "app/fonts";
import theme from "app/theme";
import ErrorBoundary from "$/components/ErrorBoundary/ErrorBoundary";
import Header from "$/components/Header/Header";
import Snackbar from "$/components/Snackbar/Snackbar";
import APP_CONFIG from "$/constants/app.config.constants";
import { ERRORS, INVESTMENT_RECORDS } from "$/constants/strings.constants";
import { ICategory } from "global.types";
import { isDashboardDataValid } from "$/dashboard/DashboardService";
import InvestmentRecords from "$/investments/InvestmentRecords";
import { getParsedObject } from "$/services/UtilService";
import LoggerService from "$/services/LoggerService";
import StorageService from "$/services/StorageService";

export default function Page() {
  const [categories, setCategories] = useState(data.categories as ICategory[]);
  const [openDataErrorSnackbar, setOpenDataErrorSnackbar] = useState(false);

  /* Use Effect for one time tasks */
  useEffect(() => {
    const savedData = StorageService.get(
      APP_CONFIG.sessionStorage.storageAppData
    );
    if (savedData) {
      const extractedData = getParsedObject(savedData);

      if (isDashboardDataValid(extractedData)) {
        setCategories(extractedData.categories);
      }
    } else {
      StorageService.set(
        APP_CONFIG.sessionStorage.storageAppData,
        JSON.stringify(data)
      );
    }
  }, []);

  const updateData = (data: string) => {
    if (!data) {
      return;
    }
    const newInvestmentData = getParsedObject(data);

    if (newInvestmentData && isDashboardDataValid(newInvestmentData)) {
      setCategories(newInvestmentData.categories);
      StorageService.set(
        APP_CONFIG.sessionStorage.storageAppData,
        JSON.stringify(newInvestmentData)
      );
    } else {
      LoggerService.error(ERRORS.data.corrupt);
      setOpenDataErrorSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenDataErrorSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={ibmFont.className}>
        <Snackbar
          message={ERRORS.data.corrupt}
          open={openDataErrorSnackbar}
          onClose={handleCloseSnackbar}
          severity="error"
        />
        <Header
          isInvestmentsPage
          updateData={updateData}
          title={INVESTMENT_RECORDS.title}
        />
        <ErrorBoundary>
          <InvestmentRecords categories={categories} />
        </ErrorBoundary>
      </div>
    </ThemeProvider>
  );
}
