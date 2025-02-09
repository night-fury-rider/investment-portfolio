import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import uvNumber from "@uv-tech/util/lib/uv-number";
import React, { useState } from "react";

import styles from "$/components/Table/Table.module.css";
import { COMMON } from "$/constants/strings.constants";
import { iColumn, iData, iOrder } from "./Table.types";
import { getComparator, stableSort } from "./TableService";

const TableWrapper = styled(Paper)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(2),
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

const TableContainerCustom = styled(TableContainer)(({ theme }) => ({
  maxHeight: 440,
  overflow: "auto",
  [theme.breakpoints.down("sm")]: {
    maxHeight: "none",
  },
}));

const TableRowCustom = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.grey[100],
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const TableTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontSize: "1.5rem",
  color: theme.palette.text.primary,
}));

interface iTableProps {
  columns?: iColumn[];
  headerStyles?: React.CSSProperties;
  loading?: boolean;
  locale?: string;
  noDataMsg?: string;
  rows?: iData[];
  title?: string;
}

const Table: React.FC<iTableProps> = ({
  columns = [],
  headerStyles = {},
  loading = false,
  locale = "en-IN",
  noDataMsg = COMMON?.noData,
  rows = [],
  title = "",
}) => {
  const [order, setOrder] = useState<iOrder["order"]>("desc");
  const [orderBy, setOrderBy] = useState<string>(columns[0]?.id || "");

  const handleRequestSort = (property: string, newOrder: "asc" | "desc") => {
    setOrder(newOrder);
    setOrderBy(property);
  };

  const sortedRows = stableSort(rows, getComparator(order, orderBy));

  const getFormattedValue = (value: number | string, isNumeric: boolean) =>
    isNumeric ? uvNumber.changeCurrencyFormat(Number(value), locale) : value;

  return (
    <Box sx={{ width: "100%" }} className={styles.tableContainer}>
      <TableTitle variant="h4">{title}</TableTitle>

      <TableWrapper>
        <TableContainerCustom>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
              <CircularProgress />
            </Box>
          ) : rows.length === 0 ? (
            <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
              <Typography>{noDataMsg}</Typography>{" "}
            </Box>
          ) : (
            <MUITable aria-labelledby="tableTitle" size="medium">
              {/* Table Head */}
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "primary.main",
                    color: "#fff",
                    ...headerStyles,
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.numeric ? "right" : "left"}
                      sortDirection={orderBy === column.id ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={() =>
                          handleRequestSort(
                            column.id,
                            orderBy === column.id && order === "asc"
                              ? "desc"
                              : "asc"
                          )
                        }
                      >
                        {column.label}
                        {orderBy === column.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody>
                {sortedRows.map((row: iData, index) => (
                  <TableRowCustom key={index} hover>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.numeric ? "right" : "left"}
                      >
                        {getFormattedValue(row[column.id], column.numeric)}
                      </TableCell>
                    ))}
                  </TableRowCustom>
                ))}
              </TableBody>
            </MUITable>
          )}
        </TableContainerCustom>
      </TableWrapper>
    </Box>
  );
};

export default Table;
