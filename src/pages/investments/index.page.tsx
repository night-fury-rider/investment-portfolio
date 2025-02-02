import { ThemeProvider } from "@mui/material";
import { useState } from "react";

import data from "../../../public/data/data.json";
import { ibmFont } from "app/fonts";
import theme from "app/theme";
import Header from "$/components/Header/Header";
import { INVESTMENT_RECORDS } from "$/constants/strings.constants";
import { ICategory } from "$/dashboard/dashboard.types";
import InvestmentRecords from "./InvestmentRecords";

export default function Page() {
  const [categories, setCategories] = useState(data.categories as ICategory[]);

  const updateData = (data: string) => {
    const rawJSON = JSON.parse(data);
    setCategories(rawJSON?.categories || []);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={ibmFont.className}>
        <Header updateData={updateData} title={INVESTMENT_RECORDS.title} />
        <InvestmentRecords categories={categories} />
      </div>
    </ThemeProvider>
  );
}
