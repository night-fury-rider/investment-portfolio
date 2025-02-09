import { ThemeProvider } from "@mui/material";

import { ibmFont } from "app/fonts";
import theme from "app/theme";
import Header from "$/components/Header/Header";
import { SETTINGS } from "$/constants/strings.constants";
import Settings from "./Settings";

export default function Page() {
  return (
    <ThemeProvider theme={theme}>
      <div className={ibmFont.className}>
        <Header title={SETTINGS.title} isSettingsPage />
        <Settings />
      </div>
    </ThemeProvider>
  );
}
