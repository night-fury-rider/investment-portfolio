import { ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";

import data from "../../public/data/data.json";
import { ibmFont } from "app/fonts";
import theme from "app/theme";
import Header from "$/components/Header/Header";
import AddInvestmentModal from "$/components/Modal/AddInvestmentModal";
import Snackbar from "$/components/Snackbar/Snackbar";
import APP_CONFIG from "$/constants/app.config.constants";
import { ERRORS, HEADER } from "$/constants/strings.constants";
import LoggerService from "$/services/LoggerService";
import { getClonedObject, getParsedObject } from "$/services/UtilService";
import Dashboard from "$/dashboard/Dashboard";
import { IBaseData, ICategory, IGoal, INewInvestment } from "global.types";
import { isDashboardDataValid } from "$/dashboard/DashboardService";
import StorageService from "$/services/StorageService";

const Page = () => {
  const [baseData, setBaseData] = useState(data as IBaseData);
  const [goals, setGoals] = useState(baseData.goals as IGoal[]);
  const [categories, setCategories] = useState(
    baseData.categories as ICategory[]
  );
  const [openDataErrorSnackbar, setOpenDataErrorSnackbar] = useState(false);
  const [isAddInvestmentModalOpen, setIsAddInvestmentModalOpen] =
    useState<boolean>(false);

  const [isInitialRender, setIsInitialRender] = useState(true);

  /* Use Effect for one time tasks */
  useEffect(() => {
    const savedData = StorageService.get(APP_CONFIG.sessionStorage.appData);
    if (savedData) {
      const extractedData = getParsedObject(savedData);
      if (isDashboardDataValid(extractedData)) {
        setGoals(extractedData.goals);
        setCategories(extractedData.categories);
      }
    }
    setIsInitialRender(false);
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

  const openAddInvestmentModal = () => {
    setIsAddInvestmentModalOpen(true);
  };

  const closeAddInvestmentModal = () => {
    setIsAddInvestmentModalOpen(false);
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
    closeAddInvestmentModal();
  };

  const handleCloseSnackbar = () => {
    setOpenDataErrorSnackbar(false);
  };

  // To Avoid initial render flickering
  if (isInitialRender) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={ibmFont.className}>
        <AddInvestmentModal
          addInvestment={addInvestment}
          categories={categories}
          goals={goals}
          isOpen={isAddInvestmentModalOpen}
          onClose={closeAddInvestmentModal}
        />

        <Snackbar
          message={ERRORS.data.corrupt}
          open={openDataErrorSnackbar}
          onClose={handleCloseSnackbar}
          severity="error"
        />

        <Header
          updateData={updateData}
          handleAddBtnPress={openAddInvestmentModal}
          title={HEADER.title}
        />
        <Dashboard categories={categories} />
      </div>
    </ThemeProvider>
  );
};

export default Page;
