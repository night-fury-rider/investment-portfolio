import { IBM_Plex_Serif } from "next/font/google";

const ibmFont = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export { ibmFont };
