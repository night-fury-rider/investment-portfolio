import { ThemeProvider } from "@mui/material";
import { useState } from "react";

import data from "../../../public/data.json";
import { ibmFont } from "app/fonts";
import theme from "app/theme";
import Header from "$/components/Header/Header";
import Dashboard from "./Dashboard";
import { iCategory } from "./dashboard.types";
import AddInvestmentModal from "$/components/Modal/AddInvestmentModal";

export default function Page() {
  const [categories, setCategories] = useState(data.categories as iCategory[]);

  const updateData = (data: string) => {
    setCategories(JSON.parse(data)?.categories || []);
  };

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleAddInvestment = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <ThemeProvider theme={theme}>
      <div className={ibmFont.className}>
        <AddInvestmentModal
          categories={categories}
          open={openModal}
          onClose={handleCloseModal}
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
