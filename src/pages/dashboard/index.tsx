import Header from "$/components/Header/Header";
import { useState } from "react";
import DashboardPage from "./DashboardPage";
import data from "$/constants/data.json";

export default function Page() {
  const [investments, setInvestments] = useState(data);

  const updateData = (data: string) => {
    setInvestments(JSON.parse(data));
  };

  return (
    <>
      <Header updateData={updateData} />
      <DashboardPage data={investments} />
    </>
  );
}
