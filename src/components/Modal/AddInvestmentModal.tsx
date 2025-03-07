import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  SelectChangeEvent,
} from "@mui/material";
import { DASHBOARD } from "$/constants/strings.constants";
import { ICategory, IGoal, INewInvestment } from "global.types";

interface IAddInvestmentModalProps {
  addInvestment: (newInvestment: INewInvestment) => void;
  categories: ICategory[];
  goals: IGoal[];
  isOpen: boolean;
  onClose: () => void;
}

const AddInvestmentModal: React.FC<IAddInvestmentModalProps> = ({
  addInvestment,
  categories,
  goals,
  isOpen,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");
  const [selectedGoal, setSelectedGoal] = useState<number | "">("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | "">(
    ""
  );
  const [folioName, setFolioName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedCategory("");
      setSelectedGoal("");
      setSelectedSubCategory("");
      setFolioName("");
      setAmount("");
    }
  }, [isOpen]);

  const handleCategoryChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedCategory(event.target.value as number);
    setSelectedSubCategory("");
  };

  const handleGoalChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedGoal(event.target.value as number);
  };

  const handleSubCategoryChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedSubCategory(event.target.value as number);
  };

  const handleFolioNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFolioName(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const isFormValid = () =>
    selectedCategory !== "" &&
    selectedGoal !== "" &&
    selectedSubCategory !== "" &&
    selectedSubCategory !== null &&
    selectedSubCategory !== undefined &&
    folioName.trim() !== "" &&
    !isNaN(Number(amount)) &&
    amount.trim() !== "";

  // Handle the form submission and show success dialog
  const handleAddInvestment = () => {
    setOpenSuccessDialog(true);
    addInvestment({
      amount: Number(amount),
      categoryIndex: Number(selectedCategory),
      folioName,
      goalIndex: Number(selectedGoal),
      subCategoryIndex: Number(selectedSubCategory),
    });
  };

  // Handle success dialog close event
  const handleSuccessDialogClose = () => {
    setOpenSuccessDialog(false);
  };

  // Get subCategories for selectedCategory
  const selectedCategoryObj = categories[Number(selectedCategory)];
  const subCategoryOptions = selectedCategoryObj
    ? selectedCategoryObj.subCategories
    : [];

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Box sx={styles.container}>
          <Typography variant="h5" sx={styles.title}>
            {DASHBOARD.addInvestment.title}
          </Typography>

          {/* Goal Dropdown */}
          <FormControl fullWidth sx={styles.dropdownForm}>
            <InputLabel id="goal-label" sx={styles.dropdownLable}>
              {DASHBOARD.addInvestment.goal}
            </InputLabel>
            <Select
              labelId="goal-label"
              value={selectedGoal}
              label={DASHBOARD.addInvestment.goal}
              onChange={handleGoalChange}
              MenuProps={{
                PaperProps: {
                  style: styles.dropdownMenuProps,
                },
              }}
              sx={styles.dropdownSelect}
            >
              {goals.map((goal, index) => (
                <MenuItem key={goal.id} value={index}>
                  {goal.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Category Dropdown */}
          <FormControl fullWidth sx={styles.dropdownForm}>
            <InputLabel id="category-label" sx={styles.dropdownLable}>
              {DASHBOARD.addInvestment.category}
            </InputLabel>
            <Select
              labelId="category-label"
              value={selectedCategory}
              label={DASHBOARD.addInvestment.category}
              onChange={handleCategoryChange}
              MenuProps={{
                PaperProps: {
                  style: styles.dropdownMenuProps,
                },
              }}
              sx={styles.dropdownSelect}
            >
              {categories.map((category, index) => (
                <MenuItem key={category.id} value={index}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Sub-category Dropdown */}
          {selectedCategory !== "" && subCategoryOptions.length > 0 && (
            <FormControl fullWidth sx={styles.dropdownForm}>
              <InputLabel id="subcategory-label" sx={styles.dropdownLable}>
                {DASHBOARD.addInvestment.subCategory}
              </InputLabel>
              <Select
                labelId="subcategory-label"
                value={selectedSubCategory}
                label={DASHBOARD.addInvestment.subCategory}
                onChange={handleSubCategoryChange}
                MenuProps={{
                  PaperProps: {
                    style: styles.dropdownMenuProps,
                  },
                }}
                sx={styles.dropdownSelect}
              >
                {subCategoryOptions.map((subCategory, index) => (
                  <MenuItem key={subCategory.id} value={index}>
                    {subCategory.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Folio Name Input */}
          <TextField
            label={DASHBOARD.addInvestment.folio}
            variant="outlined"
            fullWidth
            value={folioName}
            onChange={handleFolioNameChange}
            sx={styles.textField}
          />

          {/* Amount Input with ₹ Currency Symbol */}
          <TextField
            label={DASHBOARD.addInvestment.amount}
            variant="outlined"
            fullWidth
            value={amount}
            onChange={handleAmountChange}
            type="number"
            InputProps={{
              startAdornment: (
                <span style={styles.textFieldStartAdornment}>₹</span>
              ),
            }}
            sx={styles.textField}
          />

          {/* Add Investment Button */}
          <Button
            variant="contained"
            fullWidth
            sx={styles.buttonPrimaryAction}
            onClick={handleAddInvestment}
            disabled={!isFormValid()}
          >
            {DASHBOARD.addInvestment.addButtonLabel}
          </Button>
        </Box>
      </Modal>

      {/* Success Dialog */}
      <Dialog open={openSuccessDialog} onClose={handleSuccessDialogClose}>
        <DialogTitle>{DASHBOARD.addInvestment.successDialog.title}</DialogTitle>
        <DialogContent>
          <Typography sx={styles.dialogSuccessMessage}>
            {DASHBOARD.addInvestment.successDialog.message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessDialogClose} color="primary">
            {DASHBOARD.addInvestment.successDialog.buttonClose}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const styles = {
  buttonPrimaryAction: {
    mt: 2,
    padding: "14px",
    borderRadius: "8px",
    textTransform: "none",
    "&:hover": {
      transform: "scale(1.05)",
      transition: "all 0.3s ease",
    },
    "&:disabled": {
      backgroundColor: "#E0E0E0",
      cursor: "not-allowed",
    },
  },
  container: {
    width: { xs: "90%", sm: 450, md: 500 },
    maxWidth: "500px",
    bgcolor: "#F9F9F9",
    borderRadius: "12px",
    boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.1)",
    p: 4,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    animation: "fadeIn 0.5s ease-in-out",
  },
  dialogSuccessMessage: { color: "#4CAF50", fontSize: "18px", fontWeight: 500 },
  dropdownForm: { mb: 3 },
  dropdownLable: { fontWeight: 600, color: "#333333" },
  dropdownMenuProps: {
    maxHeight: 300,
    /* overflowY: "auto", */
    borderRadius: "12px",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
  },
  dropdownSelect: {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#E0E0E0",
      },
      "&:hover fieldset": {
        borderColor: "#BDBDBD",
      },
    },
  },
  textField: {
    mb: 3,
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      "&:hover": {
        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  textFieldStartAdornment: { fontSize: "18px", fontWeight: "bold" },
  title: {
    textAlign: "center",
    fontWeight: 700,
    mb: 3,
    color: "#333333",
  },
};

export default AddInvestmentModal;
