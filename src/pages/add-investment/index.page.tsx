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
import {
  createCategory,
  createGoal,
  createSubCategory,
  isDashboardDataValid,
  refineEntireData,
} from "$/dashboard/DashboardService";
import {
  generateRandomHexColor,
  getClonedObject,
  getParsedObject,
} from "$/services/UtilService";
import LoggerService from "$/services/LoggerService";
import StorageService from "$/services/StorageService";
import AddInvestment from "pages/add-investment/AddInvestment";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

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
        setGoals(extractedData.goals);
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
        setGoals(newInvestmentData.goals);
        setBaseData(newInvestmentData);
        StorageService.set(
          APP_CONFIG.sessionStorage.appData,
          JSON.stringify(newInvestmentData)
        );
        router.push(APP_CONFIG.routes.home);
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

  const addInvestment = (newInvestment: INewInvestment) => {
    const tmpCategories = getClonedObject(categories);
    let categoryIndex = newInvestment?.categoryIndex;
    const subCategoryIndex = newInvestment?.subCategoryIndex || 0;

    const tmpGoals = getClonedObject(goals);

    // Add Goal
    if (newInvestment.goalIndex >= goals.length && newInvestment.goalName) {
      const newGoalId = goals?.length ? goals?.length + 1 : -1;
      tmpGoals.push(createGoal(newInvestment.goalName, { id: newGoalId }));
    }

    // Update Category
    if (tmpCategories?.[categoryIndex]) {
      tmpCategories[newInvestment.categoryIndex].absoluteValue +=
        newInvestment.amount;
      // New Category
    } else if (newInvestment?.categoryName) {
      categoryIndex = tmpCategories.length;
      const categoryColor = generateRandomHexColor();
      tmpCategories.push(
        createCategory(newInvestment.categoryName, { color: categoryColor })
      );
    }

    // Update Sub-Category
    if (
      tmpCategories?.[categoryIndex]?.subCategories?.[
        newInvestment?.subCategoryIndex
      ]
    ) {
      tmpCategories[categoryIndex].subCategories[
        newInvestment.subCategoryIndex
      ].absoluteValue += newInvestment.amount;
      // New Sub-Category
    } else if (newInvestment?.subCategoryName) {
      tmpCategories[categoryIndex].subCategories.push(
        createSubCategory(newInvestment.subCategoryName)
      );
    }

    tmpCategories[newInvestment.categoryIndex].subCategories[
      subCategoryIndex
    ].records.push({
      currentValue: newInvestment.amount,
      folio: newInvestment.folioName,
      goal: newInvestment?.goalName,
      investedValue: newInvestment.amount,
    });
    const tmpBaseData = getClonedObject(baseData);
    tmpBaseData.absoluteValue += newInvestment.amount;
    tmpBaseData.categories = tmpCategories;
    tmpBaseData.goals = tmpGoals;
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
