import React from "react";
import { Container, Box } from "@mui/material";

import Grid from "@mui/material/Grid2";
import { useMediaQuery, useTheme } from "@mui/material";

import PieChart from "$/components/PieChart/PieChart";
import BarChart from "$/components/BarChart/BarChart";
import PieChartLegands from "$/components/PieChart/PieChartLegands";

import styles from "$/dashboard/dashboard.module.css";

const DashboardPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const pieData = [
    {
      id: "mutual-funds",
      label: "Mutual Funds",
      value: 32,
      color: "orange",
    },
    {
      id: "index-funds",
      label: "Index Funds",
      value: 30,
      color: "#1e487c",
    },
    {
      id: "shares",
      label: "Shares",
      value: 10,
      color: "red",
    },
    {
      id: "ppf",
      label: "PPF",
      value: 20,
      color: "#5cb85c",
    },
    {
      id: "epf",
      label: "EPF",
      value: 100,
      color: "green",
    },
    {
      id: "virtual-gold",
      label: "Virtual Gold",
      value: 10,
      color: "gold",
    },
  ];

  const barData = [
    {
      label: "AD",
      value: 200,
    },
    {
      label: "AE",
      value: 8,
    },
    {
      label: "AF",
      value: 178,
    },
    {
      label: "AG",
      value: 94,
    },
    {
      label: "AM",
      value: 81,
    },
    {
      label: "AG2",
      value: 94,
    },
    {
      label: "AM2",
      value: 81,
    },
  ];

  return (
    <Container className={styles.dashboard_container}>
      <Grid
        container
        rowSpacing={{ xs: 10, sm: 10, md: 20, lg: 20 }}
        className={styles.gridContainer}
      >
        {/* Pie Chart */}
        <Grid sx={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Box className={styles.chartContainer}>
            <PieChart data={pieData} centralTitle={`${22}`} />
          </Box>
          {/* Pie Chart Legands -- Display on mobile only */}
          {isMobile ? <PieChartLegands data={pieData} /> : null}
        </Grid>

        {/* Bar Chart Section */}
        <Grid sx={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Box className={styles.chartContainer}>
            <BarChart data={barData} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
