import React, { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";

import Grid from "@mui/material/Grid2";
import { useMediaQuery, useTheme } from "@mui/material";

import PieChart from "$/components/PieChart/PieChart";
import BarChart from "$/components/BarChart/BarChart";
import PieChartLegands from "$/components/PieChart/PieChartLegands";

import styles from "$/dashboard/dashboard.module.css";
import { refineEntireData } from "./DashboardService";

interface iDashboardPageProps {
  data: any;
}

const DashboardPage = ({ data }: iDashboardPageProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [refinedData, setRefinedData] = useState(data);
  const [totalValue, settotalValue] = useState(data?.totalValue || 0);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  useEffect(() => {
    setRefinedData(refineEntireData(data));
  }, [data]);

  useEffect(() => {
    settotalValue(refinedData.totalValue);
  }, [refinedData]);

  const handleSliceClick = (index: number) => {
    setSelectedCategoryIndex(index);
  };

  return (
    <Grid
      container
      rowSpacing={{ xs: 5, sm: 5, md: 20, lg: 20 }}
      className={styles.gridContainer}
    >
      {/* Pie Chart */}
      {refinedData?.categories?.length > 0 ? (
        <Grid sx={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Box className={styles.chartContainer}>
            <PieChart
              data={refinedData.categories}
              centralTitle={totalValue || 0}
              handleSliceClick={handleSliceClick}
              totalValue={totalValue}
            />
          </Box>
          {/* Pie Chart Legands -- Display on mobile only */}
          {isMobile ? <PieChartLegands data={refinedData.categories} /> : null}
        </Grid>
      ) : null}

      {/* Bar Chart Section */}
      {refinedData?.categories?.length > 0 ? (
        <Grid sx={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Box className={styles.chartContainer}>
            <BarChart
              data={refinedData.categories[selectedCategoryIndex]?.items}
            />
          </Box>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default DashboardPage;
