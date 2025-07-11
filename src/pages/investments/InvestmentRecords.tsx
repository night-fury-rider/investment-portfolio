import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Container,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import Dialog from "$/components/Dialog/Dialog";
import { COMMON } from "$/constants/strings.constants";
import { COLORS } from "$/constants/colors.constants";
import { ICategory, IInvestmentRecord, IValueType } from "global.types";
import {
  deleteInvestmentRecord,
  getInvestmentColumns,
  prepareInvestmentRecords,
} from "./InvestmentService";
import StorageService from "$/services/StorageService";
import APP_CONFIG from "$/constants/app.config.constants";

interface IInvestmentRecordProps {
  categories: ICategory[];
}

const InvestmentRecords = ({ categories }: IInvestmentRecordProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const [rows, setRows] = useState([] as IInvestmentRecord[]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(rows[0]);
  const [numberFormat, setNumberFormat] = useState(
    APP_CONFIG?.numberFormats?.[0]?.value
  );
  const [dateFormat, setDateFormat] = useState(
    APP_CONFIG?.dateFormats?.[0]?.value
  );
  const [valueType, setValueType] = useState(
    APP_CONFIG?.valueTypes?.[0]?.value as IValueType
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
    setRows(
      prepareInvestmentRecords({
        categories,
        valueType,
        dateFormat,
      })
    );
  }, [categories, dateFormat, valueType]);

  const getColumns = () => {
    let allColumns = getInvestmentColumns(
      isMobile,
      numberFormat
    ) as GridColDef[];

    allColumns = [
      ...allColumns,
      {
        field: "action",
        headerName: "Actions",
        renderCell: (params) => (
          <Tooltip title={COMMON.actions.delete.title}>
            <IconButton
              color="error"
              component="label"
              sx={{
                "&:hover": { backgroundColor: COLORS.whiteLight },
              }}
              onClick={() => {
                handleDeleteRow(params.row);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ),
        width: 150,
      },
    ];

    return allColumns;
  };

  const columns: GridColDef[] = getColumns();

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleDeleteRow = (row: IInvestmentRecord) => {
    setSelectedRow(row);
    setDialogOpen(true);
  };

  const handleDeleteRowConfirm = () => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== selectedRow.id));
    deleteInvestmentRecord(selectedRow);
    handleClose();
    if (categories.length > 1) {
      router.push(APP_CONFIG.routes.home);
    } else {
      router.push(APP_CONFIG.routes.addInvestment);
    }
  };

  return (
    <Container sx={styles.container}>
      <Box sx={styles.investmentContainerBox}>
        <div style={styles.gridContainer}>
          <DataGrid rows={rows} columns={columns} />
          <Dialog
            cancelText={COMMON.actions.no}
            confirmText={COMMON.actions.agree}
            handleCancel={handleClose}
            handleConfirm={handleDeleteRowConfirm}
            open={isDialogOpen}
            title={COMMON.actions.delete.confirm}
          />
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
