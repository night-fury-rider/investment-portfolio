import { Alert, Slide, SlideProps, ThemeProvider } from "@mui/material";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { SyntheticEvent, useState } from "react";

import data from "../../../public/data/data.json";
import { ibmFont } from "app/fonts";
import theme from "app/theme";
import Header from "$/components/Header/Header";
import AddInvestmentModal from "$/components/Modal/AddInvestmentModal";
import { ERRORS } from "$/constants/strings.constants";
import LoggerService from "$/services/LoggerService";
import { getParsedObject } from "$/services/UtilService";
import Dashboard from "./Dashboard";
import { ICategory, IGoal, INewInvestment } from "./dashboard.types";
import { isDashboardDataValid } from "./DashboardService";

export default function Page() {
  const [goals, setGoals] = useState(data.goals as IGoal[]);
  const [categories, setCategories] = useState(data.categories as ICategory[]);
  const [openDataErrorSnackbar, setOpenDataErrorSnackbar] = useState(false);

  const updateData = (data: string) => {
    const rawJSON = getParsedObject(data);

    if (isDashboardDataValid(rawJSON)) {
      setCategories(rawJSON.categories);
      setGoals(rawJSON.goals);
    } else {
      LoggerService.error(ERRORS.data.corrupt);
      setOpenDataErrorSnackbar(true);
    }
  };

  const [openAddInvestmentModal, setOpenAddInvestmentModal] =
    useState<boolean>(false);

  const handleAddInvestment = () => setOpenAddInvestmentModal(true);
  const handleCloseAddInvestmentModal = (newInvestment: INewInvestment) => {
    const tmpCategories = structuredClone(categories);
    tmpCategories[newInvestment.categoryIndex].subCategories[
      newInvestment.subCategoryIndex
    ].records.push({
      currentValue: newInvestment.amount,
      folio: newInvestment.folioName,
      goal: goals[newInvestment.goalIndex].label,
      investedValue: newInvestment.amount,
    });
    setOpenAddInvestmentModal(false);
    setCategories(tmpCategories);
  };

  const handleSnackbarClose = (
    event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenDataErrorSnackbar(false);
  };

  // Slide transition function
  const slideTransition = (props: SlideProps): React.ReactElement => {
    return <Slide {...props} direction="up" />;
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={ibmFont.className}>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
          open={openDataErrorSnackbar}
          TransitionComponent={slideTransition}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {ERRORS.data.corrupt}
          </Alert>
        </Snackbar>
        <AddInvestmentModal
          categories={categories}
          goals={goals}
          open={openAddInvestmentModal}
          onClose={handleCloseAddInvestmentModal}
        />

        <Header
          investmentHREF="/investments"
          updateData={updateData}
          handleAddBtnPress={handleAddInvestment}
        />
        <Dashboard categories={categories} />
      </div>
    </ThemeProvider>
  );
}
