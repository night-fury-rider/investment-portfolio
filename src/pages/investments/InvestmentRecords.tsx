import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

import { ICategory, IInvestmentRecord } from "$/dashboard/dashboard.types";
import {
  getInvestmentColumns,
  prepareInvestmentRecords,
} from "./InvestmentService";

interface IInvestmentRecordProps {
  categories: ICategory[];
}

const InvestmentRecords = ({ categories }: IInvestmentRecordProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [rows, setRows] = useState([] as IInvestmentRecord[]);

  useEffect(() => {
    setRows(prepareInvestmentRecords(categories));
  }, [categories]);

  const columns: GridColDef[] = getInvestmentColumns(isMobile) as GridColDef[];

  return (
    <Container sx={styles.container}>
      <Box sx={styles.investmentContainerBox}>
        <div style={styles.gridContainer}>
          <DataGrid rows={rows} columns={columns} checkboxSelection />
        </div>
      </Box>
    </Container>
  );
};

const styles = {
  container: {
    maxWidth: "none !important",
    width: "100%",
    padding: 0,
  },
  gridContainer: { height: 400, width: "100%" },
  investmentContainerBox: { paddingTop: "20px", textAlign: "center" },
};

export default InvestmentRecords;
