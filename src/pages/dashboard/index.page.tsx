import { ThemeProvider } from "@mui/material";
import { useState } from "react";

import data from "../../../public/data.json";
import { ibmFont } from "app/fonts";
import theme from "app/theme";
import Header from "$/components/Header/Header";
import Dashboard from "./Dashboard";
import { iCategory } from "./dashboard.types";

export default function Page() {
  const [categories, setCategories] = useState(data.categories as iCategory[]);

  const updateData = (data: string) => {
    setCategories(JSON.parse(data)?.categories || []);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={ibmFont.className}>
        <Header updateData={updateData} />
        <Dashboard categories={categories} />
      </div>
    </ThemeProvider>
  );
}
