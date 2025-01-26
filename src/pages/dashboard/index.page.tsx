import { ThemeProvider } from "@mui/material";
import { useState } from "react";

import data from "../../../public/data.json";
import { ibmFont } from "app/fonts";
import theme from "app/theme";
import Header from "$/components/Header/Header";
import Dashboard from "./Dashboard";
import { ICategory, IGoal, INewInvestment } from "./dashboard.types";
import AddInvestmentModal from "$/components/Modal/AddInvestmentModal";

export default function Page() {
  const [goals, setGoals] = useState(data.goals as IGoal[]);
  const [categories, setCategories] = useState(data.categories as ICategory[]);

  const updateData = (data: string) => {
    const rawJSON = JSON.parse(data);
    setGoals(rawJSON?.goals || []);
    setCategories(rawJSON?.categories || []);
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

  return (
    <ThemeProvider theme={theme}>
      <div className={ibmFont.className}>
        <AddInvestmentModal
          categories={categories}
          goals={goals}
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
