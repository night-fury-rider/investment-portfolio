import { ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import data from "../../public/data/data.json";
import { ibmFont } from "app/fonts";
import theme from "app/theme";
import { IBaseData, ICategory } from "global.types";
import Header from "$/components/Header/Header";
import Snackbar from "$/components/Snackbar/Snackbar";
import APP_CONFIG from "$/constants/app.config.constants";
import { ERRORS, HEADER } from "$/constants/strings.constants";
import LoggerService from "$/services/LoggerService";
import { getParsedObject } from "$/services/UtilService";
import Dashboard from "$/dashboard/Dashboard";
import {
  isDashboardDataValid,
  refineEntireData,
} from "$/dashboard/DashboardService";
import StorageService from "$/services/StorageService";

const Page = () => {
  const router = useRouter();

  const [baseData, setBaseData] = useState(data as IBaseData);
  const [categories, setCategories] = useState(
    baseData.categories as ICategory[]
  );
  const [openDataErrorSnackbar, setOpenDataErrorSnackbar] = useState(false);

  const [isInitialRender, setIsInitialRender] = useState(true);

  /* Use Effect for one time tasks */
  useEffect(() => {
    const savedData = StorageService.get(APP_CONFIG.sessionStorage.appData);

    // If data is available in storage, retrieve it
    if (savedData) {
      const extractedData = getParsedObject(savedData);
      if (isDashboardDataValid(extractedData)) {
        setCategories(extractedData.categories);
        setIsInitialRender(false);
      } else if (isDashboardDataValid(baseData)) {
        setCategories(baseData.categories);
        setIsInitialRender(false);
      } else {
        router.push(APP_CONFIG.routes.addInvestment);
      }
    } else {
      if (isDashboardDataValid(baseData)) {
        setCategories(baseData.categories);
        setIsInitialRender(false);
      } else {
        router.push(APP_CONFIG.routes.addInvestment);
      }
    }
  }, []);

  const updateData = (data: string) => {
    const newInvestmentData = getParsedObject(data);
    if (newInvestmentData) {
      const refinedNewData = refineEntireData(newInvestmentData?.categories);
      if (refinedNewData) {
        newInvestmentData.absoluteValue =
          refinedNewData?.absoluteValue || newInvestmentData?.absoluteValue;
        newInvestmentData.categories =
          refinedNewData?.categories || newInvestmentData?.categories;
        newInvestmentData.value =
          refinedNewData?.value || newInvestmentData?.value;
      }

      if (isDashboardDataValid(newInvestmentData)) {
        setCategories(newInvestmentData.categories);
        setBaseData(newInvestmentData);
        StorageService.set(
          APP_CONFIG.sessionStorage.appData,
          JSON.stringify(newInvestmentData)
        );
      } else {
        LoggerService.error(ERRORS.data.corrupt);
        setOpenDataErrorSnackbar(true);
      }
    } else {
      LoggerService.error(ERRORS.data.corrupt);
      setOpenDataErrorSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenDataErrorSnackbar(false);
  };

  const handleHeaderAddBtnPress = () => {
    router.push(APP_CONFIG.routes.addInvestment);
  };

  // To Avoid initial render flickering
  if (isInitialRender) {
    return null;
  }

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
          updateData={updateData}
          handleAddBtnPress={handleHeaderAddBtnPress}
          title={HEADER.title}
        />
        <Dashboard categories={categories} />
      </div>
    </ThemeProvider>
  );
};

export default Page;
