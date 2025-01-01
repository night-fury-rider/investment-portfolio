import Header from "$/components/Header/Header";
import DashboardPage from "./DashboardPage";

export default function Page({ props }) {
  return (
    <>
      <Header />
      <DashboardPage {...props} />
    </>
  );
}
