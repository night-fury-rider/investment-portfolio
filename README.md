# Investment Portfolio

It serves as a digital platform where users can manage and track their investments in various financial assets. The website aims to provide individuals or institutional investors with the tool to monitor and optimize their portfolios based on their financial goals

![Investment Portfolio_2025-03-30](https://github.com/user-attachments/assets/581dd2c6-9d7e-4259-b57f-83eac751ac0a)

## 🚀 Features

### 🏦 Investment Management

- 📊 **Graphical Representation of Investments**  
  Visualize investment data using clean, interactive charts for better insights.
- ➕ **Add Investment**  
  Quickly add new investments with essential details like name, amount, and date.
- ❌ **Delete Investment**  
  Remove individual investments with a single click.

### 🎛️ Customization & Formatting

- 🔢 **Change Number Format**  
  Choose how large numbers are displayed (e.g. with or without commas).

- 📅 **Change Date Format**  
  Display dates in your preferred format (e.g. `dd/MM/yyyy`, `yyyy-MM-dd`, etc.).

- 💰 **Select Value Type**  
  Toggle between **Invested Value** and **Current Value** views for better comparison.

- 💱 **Change Currency Unit**  
  Display values in units like **Lakhs**, **Thousands**, **Millions**, or **Crores**.

### 💾 Data Export

- ⚙️ **Fully Client-Side**  
  No backend required — runs entirely in the browser using native Web APIs.
- 💾 **JSON Download Functionality**  
  Easily trigger a file download in the browser using native JavaScript APIs.

---

# Technologies and Libraries Used

| Library                                                     | Version |
| ----------------------------------------------------------- | ------- |
| [React](https://reactjs.org/)                               | v19     |
| [Next.js](https://nextjs.org/)                              | v15     |
| [Material UI](https://mui.com/material-ui/getting-started/) | v6      |
| [Nivo Charts](https://nivo.rocks/pie)                       | v0.88   |
| [uv-tech/util](https://www.npmjs.com/package/@uv-tech/util) | v1      |

---

# Getting Started

## Prerequisite

- Node 20+
- npm 10+

## Install Dependencies

```bash
npm i
```

## Run Application In Dev Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Prepare Deployment Build

```bash
npm run build
```

It will create Static Export Build under `build` folder.

## Test Deployment Build

Run following command in Terminal in `build` folder.

```bash
npx serve -l 7777 --cors
```

Open [http://localhost:7777](http://localhost:7777) with your browser to see the result.
