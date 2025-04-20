import {
  Container,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  SelectChangeEvent,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import React, { useEffect, useState } from "react";

import { ICategory, IGoal, INewInvestment } from "global.types";
import Snackbar from "$/components/Snackbar/Snackbar";
import {
  createCategory,
  createGoal,
  getSubCategories,
} from "$/dashboard/DashboardService";
import { ADD_INVESTMENT } from "$/constants/strings.constants";
import { formatDate } from "$/services/UtilService";
import { getNewInvestmentObj } from "$/investments/InvestmentService";
import APP_CONFIG from "$/constants/app.config.constants";
import StorageService from "$/services/StorageService";

interface IAddInvestmentProps {
  addInvestment: (newInvestment: INewInvestment) => void;
  categories: ICategory[];
  goals: IGoal[];
}

const AddInvestment: React.FC<IAddInvestmentProps> = ({
  addInvestment,
  categories,
  goals,
}) => {
  const [dateFormat, setDateFormat] = useState(
    APP_CONFIG?.dateFormats?.[0]?.value
  );

  const [investment, setInvestment] = useState({
    amount: "",
    category: "",
    date: new Date(),
    dateTimestamp: Date.now(),
    customCategory: "",
    customGoal: "",
    customSubCategory: "",
    folioName: "",
    goal: "",
    subCategory: "",
  });

  const [loading, setLoading] = useState(false);
  const [openAddSuccessSnackbar, setOpenAddSuccessSnackbar] = useState(false);

  const newGoal = createGoal(ADD_INVESTMENT.createNew.goal);
  const newCategory = createCategory(ADD_INVESTMENT.createNew.category);
  const goalOptions = [...goals, newGoal];
  const categoryOptions = [...categories, newCategory];
  const subCategoryOptions = getSubCategories(categories, investment.category);

  const styles = getStyles();

  /* Use Effect for one time tasks */
  useEffect(() => {
    const storedDateFormat = StorageService.get(
      APP_CONFIG?.sessionStorage?.storageDateFormat
    );
    if (storedDateFormat) {
      setDateFormat(storedDateFormat);
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setInvestment((prevInvestment) => ({
      ...prevInvestment,
      [name as string]: value,
    }));
  };

  const handleGoalChange = (e: SelectChangeEvent<string>) => {
    const selectedGoal = e.target.value;
    setInvestment((prevInvestment) => ({
      ...prevInvestment,
      goal: selectedGoal,
      customGoal:
        selectedGoal === ADD_INVESTMENT.createNew.goal
          ? ""
          : prevInvestment.customGoal,
    }));
  };

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    const selectedCategory = e.target.value as string;
    setInvestment((prevInvestment) => ({
      ...prevInvestment,
      category: selectedCategory,
      subCategory: "",
      customCategory:
        selectedCategory === ADD_INVESTMENT.createNew.category
          ? ""
          : prevInvestment.customCategory,
    }));
  };

  const handleSubCategoryChange = (e: SelectChangeEvent<string>) => {
    const selectedSubCategory = e.target.value as string;
    setInvestment((prevInvestment) => ({
      ...prevInvestment,
      subCategory: selectedSubCategory,
      customSubCategory:
        selectedSubCategory === ADD_INVESTMENT.createNew.subCategory
          ? ""
          : prevInvestment.customSubCategory,
    }));
  };

  // Check if all required fields have data
  const isFormValid = () => {
    const {
      goal,
      category,
      folioName,
      amount,
      subCategory,
      customGoal,
      customCategory,
      customSubCategory,
    } = investment;

    return (
      goal !== "" &&
      (goal !== ADD_INVESTMENT.createNew.goal || customGoal !== "") &&
      category !== "" &&
      (category !== ADD_INVESTMENT.createNew.category ||
        customCategory !== "") &&
      (subCategory !== "" || customSubCategory !== "") &&
      folioName !== "" &&
      amount !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenAddSuccessSnackbar(true);
    }, 1000);
  };

  /**
   * @description Close Add Investment success snackbar.
   */
  const closeSuccessSnackbar = () => {
    const newInvestment = getNewInvestmentObj({
      amount: investment.amount,
      categories: categories,
      category: investment?.customCategory || investment.category,
      date:
        formatDate({ date: investment.date, format: dateFormat }) ||
        new Date().toString(),
      dateTimestamp: investment.dateTimestamp,
      folioName: investment.folioName,
      goals: goals,
      goal: investment?.customGoal || investment.goal,
      subCategory: investment?.customSubCategory || investment.subCategory,
    });
    addInvestment(newInvestment);
    setOpenAddSuccessSnackbar(false);
  };

  const updateDate = (newDate: Date | null) => {
    if (newDate) {
      setInvestment({
        ...investment,
        date: newDate,
        dateTimestamp: newDate?.valueOf() || Date.now(),
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Goal Selection */}
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth required>
                <InputLabel>{ADD_INVESTMENT.goal.inputLabel}</InputLabel>
                <Select
                  value={investment.goal}
                  name="goal"
                  onChange={handleGoalChange}
                  label={ADD_INVESTMENT.goal.inputLabel}
                >
                  {goalOptions?.map((goal) => (
                    <MenuItem key={goal.label} value={goal.label}>
                      {goal.label}
                    </MenuItem>
                  ))}
                </Select>
                {investment.goal === ADD_INVESTMENT.createNew.goal && (
                  <TextField
                    label={ADD_INVESTMENT.goal.newItemLabel}
                    name="customGoal"
                    value={investment.customGoal}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    placeholder={ADD_INVESTMENT.goal.newItemPlaceholder}
                    margin="normal"
                  />
                )}
              </FormControl>
            </Grid>

            {/* Category Selection */}
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth required>
                <InputLabel>{ADD_INVESTMENT.category.inputLabel}</InputLabel>
                <Select
                  value={investment.category}
                  name="category"
                  onChange={handleCategoryChange}
                  label={ADD_INVESTMENT.category.inputLabel}
                >
                  {categoryOptions.map((category) => (
                    <MenuItem key={category.label} value={category.label}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
                {investment.category === ADD_INVESTMENT.createNew.category && (
                  <TextField
                    label={ADD_INVESTMENT.category.newItemLabel}
                    name="customCategory"
                    value={investment.customCategory}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    placeholder={ADD_INVESTMENT.category.newItemPlaceholder}
                    margin="normal"
                  />
                )}
              </FormControl>
            </Grid>

            {/* Sub-Category Selection */}
            {investment.category && (
              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth required>
                  <InputLabel>
                    {ADD_INVESTMENT.subCategory.inputLabel}
                  </InputLabel>
                  <Select
                    value={investment.subCategory}
                    name="subCategory"
                    onChange={handleSubCategoryChange}
                    label={ADD_INVESTMENT.subCategory.inputLabel}
                  >
                    {subCategoryOptions?.map((subCategory) => (
                      <MenuItem
                        key={subCategory?.label}
                        value={subCategory?.label}
                      >
                        {subCategory?.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {investment.subCategory ===
                    ADD_INVESTMENT.createNew.subCategory && (
                    <TextField
                      label={ADD_INVESTMENT.subCategory.newItemLabel}
                      name="customSubCategory"
                      value={investment.customSubCategory}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      placeholder={
                        ADD_INVESTMENT.subCategory.newItemPlaceholder
                      }
                      margin="normal"
                    />
                  )}
                </FormControl>
              </Grid>
            )}

            {/* Folio Name */}
            <Grid size={{ xs: 12 }}>
              <TextField
                label={ADD_INVESTMENT.folio}
                name="folioName"
                value={investment.folioName}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>

            {/* Amount */}
            <Grid size={{ xs: 12 }}>
              <TextField
                label={ADD_INVESTMENT.amount}
                name="amount"
                type="number"
                value={investment.amount}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>

            {/* Date */}
            <Grid size={{ xs: 12 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  onChange={(newValue: Date | null) => updateDate(newValue)}
                  label={ADD_INVESTMENT.date}
                  defaultValue={new Date()}
                  format="dd/MM/yyyy"
                  value={investment.date}
                  sx={styles.datePicker}
                />
              </LocalizationProvider>
            </Grid>

            {/* Submit Button */}
            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading || !isFormValid()}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : (
                  ADD_INVESTMENT.submitBtnLabel
                )}
              </Button>
            </Grid>
          </Grid>
          <Snackbar
            message={ADD_INVESTMENT.successMessage}
            open={openAddSuccessSnackbar}
            onClose={closeSuccessSnackbar}
            severity="success"
          />
        </form>
      </Box>
    </Container>
  );
};

const getStyles = () => {
  return {
    datePicker: {
      width: "100%",
    },
  };
};

export default AddInvestment;
