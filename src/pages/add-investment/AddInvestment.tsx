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
import React, { useState } from "react";

import { ICategory, IGoal, INewInvestment } from "global.types";
import {
  createCategory,
  createGoal,
  getSubCategories,
} from "$/dashboard/DashboardService";
import { ADD_INVESTMENT } from "$/constants/strings.constants";
import { getDateString } from "$/services/UtilService";
import { getNewInvestmentObj } from "$/investments/InvestmentService";

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
  const [investment, setInvestment] = useState({
    amount: "",
    category: "",
    customCategory: "",
    customGoal: "",
    customSubCategory: "",
    folioName: "",
    goal: "",
    subCategory: "",
    transactionDate: getDateString(new Date()),
  });

  const [loading, setLoading] = useState(false);

  const newGoal = createGoal(ADD_INVESTMENT.createNew.goal);
  const newCategory = createCategory(ADD_INVESTMENT.createNew.category);
  const goalOptions = [...goals, newGoal];
  const categoryOptions = [...categories, newCategory];
  const subCategoryOptions = getSubCategories(categories, investment.category);

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
      transactionDate,
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
      amount !== "" &&
      transactionDate !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const newInvestment = getNewInvestmentObj(
        categories,
        goals,
        investment.amount,
        investment.category,
        investment.folioName,
        investment.goal,
        investment.subCategory,
        investment.transactionDate
      );
      addInvestment(newInvestment);
      alert(ADD_INVESTMENT.successMessage);
    }, 1000);
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

            {/* Transaction Date */}
            <Grid size={{ xs: 12 }}>
              <TextField
                label={ADD_INVESTMENT.date}
                name="transactionDate"
                type="date"
                value={investment.transactionDate}
                onChange={handleInputChange}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true, // To make the label appear correctly for the date input
                }}
              />
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
        </form>
      </Box>
    </Container>
  );
};

export default AddInvestment;
