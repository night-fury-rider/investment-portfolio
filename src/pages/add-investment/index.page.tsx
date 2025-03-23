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
import { IBaseData, ICategory, IGoal, INewInvestment } from "global.types";
import { isDashboardDataValid } from "$/dashboard/DashboardService";
import { getClonedObject, getParsedObject } from "$/services/UtilService";
import LoggerService from "$/services/LoggerService";
import StorageService from "$/services/StorageService";
import AddInvestment from "pages/add-investment/AddInvestment";

export default function Page() {
  const [baseData, setBaseData] = useState(data as IBaseData);
  const [goals, setGoals] = useState(baseData.goals as IGoal[]);
  const [categories, setCategories] = useState(
    baseData.categories as ICategory[]
  );

  const [openDataErrorSnackbar, setOpenDataErrorSnackbar] = useState(false);

  /* Use Effect for one time tasks */
  useEffect(() => {
    const savedData = StorageService.get(APP_CONFIG.sessionStorage.appData);
    if (savedData) {
      const extractedData = getParsedObject(savedData);

      if (isDashboardDataValid(extractedData)) {
        setCategories(extractedData.categories);
      }
    } else {
      StorageService.set(
        APP_CONFIG.sessionStorage.appData,
        JSON.stringify(data)
      );
    }
  }, []);

  const updateData = (data: string) => {
    const newInvestmentData = getParsedObject(data);
    if (newInvestmentData && isDashboardDataValid(newInvestmentData)) {
      setCategories(newInvestmentData.categories);
      setGoals(newInvestmentData.goals);
      setBaseData(newInvestmentData);
      StorageService.set(
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

  const addInvestment = (newInvestment: INewInvestment) => {
    const tmpCategories = getClonedObject(categories);
    tmpCategories[newInvestment.categoryIndex].subCategories[
      newInvestment.subCategoryIndex
    ].records.push({
      currentValue: newInvestment.amount,
      folio: newInvestment.folioName,
      goal: goals[newInvestment.goalIndex].label,
      investedValue: newInvestment.amount,
    });
    const tmpBaseData = getClonedObject(baseData);
    tmpBaseData.categories = tmpCategories;
    updateData(JSON.stringify(tmpBaseData));
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
          <AddInvestment
            categories={categories}
            goals={goals}
            addInvestment={addInvestment}
          />
        </ErrorBoundary>
      </div>
    </ThemeProvider>
  );
}
