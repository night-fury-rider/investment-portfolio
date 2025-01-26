import { ThemeProvider } from "@mui/material";
import { useState } from "react";

import data from "../../../public/data.json";
import { ibmFont } from "app/fonts";
import theme from "app/theme";
import Header from "$/components/Header/Header";
import Dashboard from "./Dashboard";
import { ICategory, INewInvestment } from "./dashboard.types";
import AddInvestmentModal from "$/components/Modal/AddInvestmentModal";

export default function Page() {
  const [categories, setCategories] = useState(data.categories as ICategory[]);

  const updateData = (data: string) => {
    setCategories(JSON.parse(data)?.categories || []);
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
      investedValue: newInvestment.amount,
    });
    setOpenAddInvestmentModal(false);
    setCategories(tmpCategories);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={ibmFont.className}>
        <AddInvestmentModal
          categories={categories}
          open={openAddInvestmentModal}
          onClose={handleCloseAddInvestmentModal}
        />

        <Header
          updateData={updateData}
          handleAddBtnPress={handleAddInvestment}
        />
        <Dashboard categories={categories} />
      </div>
    </ThemeProvider>
  );
}
