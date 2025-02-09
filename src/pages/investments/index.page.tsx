import { ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";

import data from "../../../public/data/data.json";
import { ibmFont } from "app/fonts";
import theme from "app/theme";
import Header from "$/components/Header/Header";
import Snackbar from "$/components/Snackbar/Snackbar";
import APP_CONFIG from "$/constants/app.config.constants";
import { ERRORS, INVESTMENT_RECORDS } from "$/constants/strings.constants";
import { ICategory } from "$/dashboard/dashboard.types";
import { isDashboardDataValid } from "$/dashboard/DashboardService";
import InvestmentRecords from "./InvestmentRecords";
import { getParsedObject } from "$/services/UtilService";
import LoggerService from "$/services/LoggerService";

export default function Page() {
  const [categories, setCategories] = useState(data.categories as ICategory[]);
  const [openDataErrorSnackbar, setOpenDataErrorSnackbar] = useState(false);

  /* Use Effect for one time tasks */
  useEffect(() => {
    const savedData = sessionStorage.getItem(APP_CONFIG.sessionStorage.appData);
    if (savedData) {
      const extractedData = getParsedObject(savedData);

      if (isDashboardDataValid(extractedData)) {
        setCategories(extractedData.categories);
      }
    }
  }, []);

  const updateData = (data: string) => {
    const newInvestmentData = getParsedObject(data);

    if (newInvestmentData && isDashboardDataValid(newInvestmentData)) {
      setCategories(newInvestmentData.categories);
      sessionStorage.setItem(
        APP_CONFIG.sessionStorage.appData,
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
        <InvestmentRecords categories={categories} />
      </div>
    </ThemeProvider>
  );
}
