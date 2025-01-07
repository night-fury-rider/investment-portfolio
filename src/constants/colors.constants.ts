// This file is intended to serve as the single source of truth for all colors used in the app.

export const COLORS = {
  black: "black",
  grey: "grey",
  greyLight: "#ddd",
  transparent: "transparent",
  white: "white",
  whiteLight: "#ffffff14",
};

export const LIGHT_COLORS = {
  background1: "#f8f9fd", // Main background color of app
  background2: "#dce8f4", // Dashboard --> Searchbar background color
  background3: "#d0e4ff", // Dashboard --> + icon background color
  background4: "#e6edfd", // Bottom tab background color
  background5: "#6a8edb", // Bottom tab active tab background color
  background6: "#0061a2", // Dashboard --> No items --> Icon of Phone
  background7: "#f8f9fe", // Add/Edit Item --> Background color
  background8: "#f0f4ff", // Item Details --> Tile Background color
  background9: "#f5f5f5", // Background of Menu item of Settings Screen.
  background10: "#4a90e2", // Background of Selected Card

  danger1: "#d63d39",
  danger2: "red",
  danger3: "red",

  success1: "green",
  success2: "green",
  success3: "green",

  text1: "black",
  text2: "#fbfbfc",
  text3: "black",
  text4: "black",
  text5: "black",

  transparent: "transparent",
};

export const BLUE_COLOR_THEME = {
  ...LIGHT_COLORS,
  background1: "#f8f9fd", // Main background color of app
  background2: "#dce8f4", // Dashboard --> Searchbar background color
  background3: "#d0e4ff", // Dashboard --> + icon background color
  background4: "#e6edfd", // Bottom tab background color
  background5: "#6a8edb", // Bottom tab active tab background color
  background6: "#0061a2", // Dashboard --> No items --> Icon of Phone
  background7: "#f8f9fe", // Add/Edit Item --> Background color
  background8: "#f0f4ff", // Item Details --> Tile Background color

  text1: "#1e1b16", // Main Text color
};

export const ORANGE_COLOR_THEME = {
  ...LIGHT_COLORS,
  background1: "#fff8f5", // Main background color of app
  background2: "#f3e5dc", // Dashboard --> Searchbar background color
  background3: "#ffdbcb", // Dashboard --> + icon background color
  background4: "#feeae1", // Bottom tab background color
  background5: "#2e1500", // Bottom tab active tab background color
  background6: "#9d4400", // Dashboard --> No items --> Icon of Phone &&  // Tools --> Import Item --> Import Button's background (When enabled)
  background7: "#fff8f6", // Add/Edit Item --> Background color
  background8: "#fff2ec", // Item Details --> Tile Background color

  text1: "#1e1b16", // Main Text color
};

export const DARK_COLORS = {
  background9: "#8D8D8D", // Background of Menu item of Settings Screen.
  background10: "#4e2a2a", // Background of Selected Card

  danger1: "#fd5c63",
  danger2: "red",
  danger3: "red",

  success1: "#439946",
  success2: "green",
  success3: "green",

  text1: "#cec5b4",
  text2: "#fbfbfc",
  text3: "black",
  text4: "black",
  text5: "black",

  transparent: "transparent",

  background1: "#171308", // Main background color of app
  background2: "#2c2512", // Dashboard --> Searchbar background color
  background3: "#594500", // Dashboard --> + icon background color
  background4: "#231f13", // Bottom tab background color
  background5: "#51462a", // Bottom tab active tab background color
  background6: "#cec5b4", // Dashboard --> No items --> Icon of Phone && // Tools --> Import Item --> Import Button's background (When enabled)
  background7: "#171308", // Add/Edit Item --> Background color
  background8: "#1f1b10", // Item Details --> Tile Background color
};

export const DARK_BLUE_COLOR_THEME = {
  ...DARK_COLORS,
};

export const DARK_ORANGE_COLOR_THEME = {
  ...DARK_COLORS,
};
