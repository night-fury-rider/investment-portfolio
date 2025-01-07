import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import Grid from "@mui/material/Grid2";
import { useMediaQuery, useTheme } from "@mui/material";

import PieChart from "$/components/PieChart/PieChart";
import BarChart from "$/components/BarChart/BarChart";
import PieChartLegands from "$/components/PieChart/PieChartLegands";

import styles from "$/dashboard/dashboard.module.css";
import { getBarChartData, refineEntireData } from "./DashboardService";
import { iCategory } from "./dashboard.types";
import { BarDatum } from "@nivo/bar";

interface iDashboardPageProps {
  categories: iCategory[];
}

const DashboardPage = ({ categories }: iDashboardPageProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [refinedData, setRefinedData] = useState({
    absoluteValue: 0,
    value: 0,
    categories,
  });
  const [barChartData, setBarChartData] = useState([] as BarDatum[]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    setRefinedData(refineEntireData(categories));
  }, [categories]);

  useEffect(() => {
    setTotalValue(refinedData.value);
    setBarChartData(getBarChartData(refinedData.categories[0]?.items || []));
  }, [refinedData]);

  const handleSliceClick = (index: number) => {
    setBarChartData(
      getBarChartData(refinedData.categories[index]?.items || [])
    );
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
          {isMobile ? (
            <>
              <div className={styles.legandContainer}>
                {categories.map((item: iCategory) => (
                  <React.Fragment key={`${item.label}_${item.color}`}>
                    <PieChartLegands color={item.color} label={item.label} />
                  </React.Fragment>
                ))}
              </div>
            </>
          ) : null}
        </Grid>
      ) : null}

      {/* Bar Chart Section */}
      {refinedData?.categories?.length > 0 ? (
        <Grid sx={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Box className={styles.chartContainer}>
            <BarChart data={barChartData} />
          </Box>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default DashboardPage;
