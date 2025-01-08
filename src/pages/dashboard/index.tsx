import Header from "$/components/Header/Header";
import { useState } from "react";
import DashboardPage from "./DashboardPage";
import data from "../../../public/data.json";
import { ibmFont } from "app/fonts";
import { iCategory } from "./dashboard.types";

export default function Page() {
  const [categories, setCategories] = useState(data.categories as iCategory[]);

  const updateData = (data: string) => {
    setCategories(JSON.parse(data)?.categories || []);
  };

  return (
    <div className={ibmFont.className}>
      <Header updateData={updateData} />
      <DashboardPage categories={categories} />
    </div>
  );
}
