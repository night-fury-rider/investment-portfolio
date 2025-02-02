import { Box, Container, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

import { INVESTMENT_RECORDS } from "$/constants/strings.constants";
import { ICategory, IInvestmentRecord } from "$/dashboard/dashboard.types";
import { prepareInvestmentRecords } from "./InvestmentService";

interface IInvestmentRecordProps {
  categories: ICategory[];
}

const InvestmentRecords = ({ categories }: IInvestmentRecordProps) => {
  const [rows, setRows] = useState([] as IInvestmentRecord[]);

  useEffect(() => {
    setRows(prepareInvestmentRecords(categories));
  }, [categories]);

  const columns: GridColDef[] = [
    { field: "goal", headerName: INVESTMENT_RECORDS.goal, width: 200 },
    { field: "category", headerName: INVESTMENT_RECORDS.category, width: 150 },
    {
      field: "subCategory",
      headerName: INVESTMENT_RECORDS.subCategory,
      width: 200,
    },
    { field: "folio", headerName: INVESTMENT_RECORDS.folio, width: 200 },
    {
      field: "investedValue",
      headerName: INVESTMENT_RECORDS.investedValue,
      width: 150,
      type: "number",
    },
    {
      field: "currentValue",
      headerName: INVESTMENT_RECORDS.currentValue,
      width: 150,
      type: "number",
    },
  ];

  return (
    <Container>
      <Box sx={styles.investmentContainerBox}>
        <Typography variant="h4" gutterBottom>
          {INVESTMENT_RECORDS.title}
        </Typography>
        <div style={styles.gridContainer}>
          <DataGrid rows={rows} columns={columns} checkboxSelection />
        </div>
      </Box>
    </Container>
  );
};

const styles = {
  gridContainer: { height: 400, width: "100%" },
  investmentContainerBox: { padding: "20px", textAlign: "center" },
};

export default InvestmentRecords;
