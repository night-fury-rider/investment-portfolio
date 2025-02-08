import { ThemeProvider } from "@mui/material";
import { useState } from "react";

import data from "../../../public/data/data.json";
import { ibmFont } from "app/fonts";
import theme from "app/theme";
import Header from "$/components/Header/Header";
import { ERRORS, INVESTMENT_RECORDS } from "$/constants/strings.constants";
import { ICategory } from "$/dashboard/dashboard.types";
import InvestmentRecords from "./InvestmentRecords";
import { getParsedObject } from "$/services/UtilService";
import LoggerService from "$/services/LoggerService";
import { isDashboardDataValid } from "$/dashboard/DashboardService";
import Snackbar from "$/components/Snackbar/Snackbar";

export default function Page() {
  const [categories, setCategories] = useState(data.categories as ICategory[]);
  const [openDataErrorSnackbar, setOpenDataErrorSnackbar] = useState(false);

  const updateData = (data: string) => {
    const rawJSON = getParsedObject(data);

    if (isDashboardDataValid(rawJSON)) {
      setCategories(rawJSON.categories);
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
        <Header updateData={updateData} title={INVESTMENT_RECORDS.title} />
        <InvestmentRecords categories={categories} />
      </div>
    </ThemeProvider>
  );
}
