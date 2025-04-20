import Grid from "@mui/material/Grid2";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { BarDatum } from "@nivo/bar";
import React, { useEffect, useRef, useState } from "react";

import BarChart from "$/components/BarChart/BarChart";
import ErrorBoundary from "$/components/ErrorBoundary/ErrorBoundary";
import PieChart from "$/components/PieChart/PieChart";
import PieChartLegands from "$/components/PieChart/PieChartLegands";
import Table from "$/components/Table/Table";
import APP_CONFIG from "$/constants/app.config.constants";
import { COLORS } from "$/constants/colors.constants";
import { COMMON, DASHBOARD } from "$/constants/strings.constants";
import styles from "$/dashboard/dashboard.module.css";
import { ICategory, ISubItem, IValueType } from "global.types";
import {
  getBarChartData,
  getHighestItemIndex,
  refineEntireData,
} from "$/dashboard/DashboardService";
import StorageService from "$/services/StorageService";

interface iDashboardProps {
  categories: ICategory[];
}

const Dashboard = ({ categories }: iDashboardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const secondRowRef = useRef<HTMLDivElement | null>(null);

  const [refinedData, setRefinedData] = useState({
    absoluteValue: 0,
    value: 0,
    categories,
  });
  const [barChartData, setBarChartData] = useState([] as BarDatum[]);
  const [investmentRows, setInvestmentRows] = useState([] as ISubItem[]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(
    0 as number
  );
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [numberFormat, setNumberFormat] = useState(
    APP_CONFIG?.numberFormats?.[0]?.value
  );
  const [dateFormat, setDateFormat] = useState(
    APP_CONFIG?.dateFormats?.[0]?.value
  );
  const [valueType, setValueType] = useState(
    APP_CONFIG?.valueTypes?.[0]?.value
  );

  /* Use Effect for one time tasks */
  useEffect(() => {
    const storedNumberFormat = StorageService.get(
      APP_CONFIG?.sessionStorage?.storageNumberFormat
    );
    if (storedNumberFormat) {
      setNumberFormat(storedNumberFormat);
    }

    const storedDateFormat = StorageService.get(
      APP_CONFIG?.sessionStorage?.storageDateFormat
    );
    if (storedDateFormat) {
      setDateFormat(storedDateFormat);
    }

    const storedValueType = StorageService.get(
      APP_CONFIG?.sessionStorage?.storageValueType
    );
    if (storedValueType) {
      setValueType(storedValueType);
    }
  }, []);

  useEffect(() => {
    setSelectedCategoryIndex(0);
    setSelectedItemIndex(0);
    setRefinedData(
      refineEntireData({
        categories,
        attr: valueType as IValueType,
        dateFormat,
      })
    );
  }, [categories, valueType, dateFormat]);

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
      ]?.records || []
    );
  }, [
    refinedData.categories,
    selectedCategoryIndex,
    selectedItemIndex,
    dateFormat,
    valueType,
  ]);

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

  const columns = APP_CONFIG.dashboardTableColumns;

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
        rowSpacing={{ xs: 20, sm: 20, md: 20, lg: 20 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {refinedData?.categories?.length > 0 ? (
          <Grid size={{ xs: 4, sm: 8, md: 6 }}>
            {/* Pie Chart */}
            <Box className={styles.chartContainer}>
              <ErrorBoundary>
                <PieChart
                  data={refinedData.categories}
                  centralTitle={totalValue || 0}
                  handleSliceClick={handlePieSliceClick}
                  totalValue={totalValue}
                />
              </ErrorBoundary>
            </Box>
            {/* Pie Chart Legands -- Display on mobile only */}
            {isMobile ? (
              <div className={styles.legandContainer}>
                {refinedData?.categories.map((item: ICategory) => (
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
              <ErrorBoundary>
                <BarChart data={barChartData} handleBarClick={handleBarClick} />
              </ErrorBoundary>
            </Box>
          </Grid>
        ) : null}

        {/* Investment Table */}
        {refinedData?.categories?.length > 0 ? (
          <Grid
            size={{ xs: 4, sm: 4, md: 10 }}
            ref={secondRowRef}
            offset={{ xs: 0, sm: 0, md: 1 }}
          >
            <Box>
              <ErrorBoundary>
                <Table
                  columns={columns}
                  headerStyles={headerStyles}
                  noDataMsg={COMMON.noData}
                  locale={numberFormat}
                  rows={investmentRows}
                  title={DASHBOARD.table.title}
                />
              </ErrorBoundary>
            </Box>
          </Grid>
        ) : null}
      </Grid>
    </>
  );
};

export default Dashboard;
