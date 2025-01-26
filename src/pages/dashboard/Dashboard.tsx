import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

import Grid from "@mui/material/Grid2";
import { useMediaQuery, useTheme } from "@mui/material";

import PieChart from "$/components/PieChart/PieChart";
import BarChart from "$/components/BarChart/BarChart";
import PieChartLegands from "$/components/PieChart/PieChartLegands";

import styles from "$/dashboard/dashboard.module.css";
import {
  getBarChartData,
  getHighestItemIndex,
  refineEntireData,
} from "./DashboardService";
import { iCategory, iSubItem } from "./dashboard.types";
import { BarDatum } from "@nivo/bar";
import Table from "$/components/Table/Table";
import { COMMON, DASHBOARD } from "$/constants/strings.constants";
import { COLORS } from "$/constants/colors.constants";

interface iDashboardProps {
  categories: iCategory[];
}

const DashboardLite = ({ categories }: iDashboardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const secondRowRef = useRef<HTMLDivElement | null>(null);

  const [refinedData, setRefinedData] = useState({
    absoluteValue: 0,
    value: 0,
    categories,
  });
  const [barChartData, setBarChartData] = useState([] as BarDatum[]);
  const [investmentRows, setInvestmentRows] = useState([] as iSubItem[]);

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(
    0 as number
  );
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    setSelectedCategoryIndex(0);
    setSelectedItemIndex(0);
    setRefinedData(refineEntireData(categories));
  }, [categories]);

  useEffect(() => {
    setTotalValue(refinedData.value);
    setBarChartData(
      getBarChartData(refinedData.categories[0]?.subCategories || [])
    );
  }, [refinedData]);

  useEffect(() => {
    setInvestmentRows(
      refinedData.categories?.[selectedCategoryIndex]?.subCategories?.[
        selectedItemIndex
      ]?.subItems || []
    );
  }, [refinedData.categories, selectedCategoryIndex, selectedItemIndex]);

  const handlePieSliceClick = (index: number) => {
    setSelectedCategoryIndex(index);
    setSelectedItemIndex(
      getHighestItemIndex(refinedData.categories[index]?.subCategories)
    );
    setBarChartData(
      getBarChartData(refinedData.categories[index]?.subCategories || [])
    );
  };

  const handleBarClick = (index: number) => {
    setSelectedItemIndex(index);
    handleScrollToSecondRow();
  };

  const columns = [
    { id: "folio", label: "Folio", numeric: false },
    { id: "goal", label: "Goal", numeric: false },
    { id: "investedValue", label: "Invested Value", numeric: true },
    { id: "currentValue", label: "Current Value", numeric: true },
  ];

  const headerStyles = {
    backgroundColor: COLORS.blue,
  };

  /**
   * @description Smoothly scrolls the page to the second row of the content.
   */
  const handleScrollToSecondRow = () => {
    if (secondRowRef.current) {
      secondRowRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <Grid
        container
        rowSpacing={{ xs: 5, sm: 5, md: 20, lg: 20 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {refinedData?.categories?.length > 0 ? (
          <Grid size={{ xs: 4, sm: 8, md: 6 }}>
            {/* Pie Chart */}
            <Box className={styles.chartContainer}>
              <PieChart
                data={refinedData.categories}
                centralTitle={totalValue || 0}
                handleSliceClick={handlePieSliceClick}
                totalValue={totalValue}
              />
            </Box>
            {/* Pie Chart Legands -- Display on mobile only */}
            {isMobile ? (
              <div className={styles.legandContainer}>
                {refinedData?.categories.map((item: iCategory) => (
                  <React.Fragment key={`${item.label}_${item.color}`}>
                    <PieChartLegands color={item.color} label={item.label} />
                  </React.Fragment>
                ))}
              </div>
            ) : null}
          </Grid>
        ) : null}

        {/* Bar Chart */}
        {refinedData?.categories?.length > 0 ? (
          <Grid size={{ xs: 4, sm: 8, md: 6 }}>
            <Box className={styles.chartContainer}>
              <BarChart data={barChartData} handleBarClick={handleBarClick} />
            </Box>
          </Grid>
        ) : null}

        {/* Investment Table */}
        {refinedData?.categories?.length > 0 ? (
          <Grid size={{ xs: 4, sm: 4, md: 6 }} ref={secondRowRef}>
            <Box>
              <Table
                columns={columns}
                headerStyles={headerStyles}
                noDataMsg={COMMON.noData}
                rows={investmentRows}
                title={DASHBOARD.table.title}
              />
            </Box>
          </Grid>
        ) : null}
      </Grid>
    </>
  );
};

export default DashboardLite;
