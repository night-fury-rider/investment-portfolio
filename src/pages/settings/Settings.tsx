import {
  useTheme,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  SelectChangeEvent,
  Theme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { SETTINGS } from "$/constants/strings.constants";
import APP_CONFIG from "$/constants/app.config.constants";
import StorageService from "$/services/StorageService";
import Snackbar from "$/components/Snackbar/Snackbar";
import {
  formatDate,
  getTotalAmountInSelectedUnit,
} from "$/services/UtilService";

const Settings: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();

  const [numberFormat, setNumberFormat] = useState(
    APP_CONFIG?.numberFormats?.[0]?.value
  );
  const [dateFormat, setDateFormat] = useState(
    APP_CONFIG?.dateFormats?.[0]?.value
  );
  const [language, setLanguage] = useState(APP_CONFIG?.languages?.[0]?.value);
  const [valueType, setValueType] = useState(
    APP_CONFIG?.valueTypes?.[0]?.value
  );
  const [viewType, setViewType] = useState(APP_CONFIG?.viewTypes?.[0]?.value);
  const [currencyUnit, setCurrencyUnit] = useState(
    APP_CONFIG?.currencyUnits?.[0]?.value
  );

  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isPrimaryButtonDisabled, setisPrimaryButtonDisabled] = useState(true);
  const [isSettingsSuccessSnackbarOpen, setSettingsSuccessSnackbarOpen] =
    useState(false);

  const [initialSettings, setInitialSettings] = useState({
    numberFormat: APP_CONFIG?.numberFormats?.[0]?.value,
    dateFormat: APP_CONFIG?.dateFormats?.[0]?.value,
    language: APP_CONFIG?.languages?.[0]?.value,
    valueType: APP_CONFIG?.valueTypes?.[0]?.value,
    viewType: APP_CONFIG?.viewTypes?.[0]?.value,

    currencyUnit: APP_CONFIG.currencyUnits?.[0]?.value,
  });

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

    const storedLanguage = StorageService.get(
      APP_CONFIG?.sessionStorage?.storageLanguage
    );
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }

    const storedValueType = StorageService.get(
      APP_CONFIG?.sessionStorage?.storageValueType
    );
    if (storedValueType) {
      setValueType(storedValueType);
    }

    const storedViewType = StorageService.get(
      APP_CONFIG?.sessionStorage?.storageViewType
    );
    if (storedViewType) {
      setViewType(storedViewType);
    }

    const storedCurrencyUnit = StorageService.get(
      APP_CONFIG?.sessionStorage?.storageCurrencyUnit
    );
    if (storedCurrencyUnit) {
      setCurrencyUnit(Number(storedCurrencyUnit));
    }

    setInitialSettings({
      currencyUnit: storedCurrencyUnit || APP_CONFIG?.currencyUnits?.[0]?.value,
      dateFormat: storedDateFormat || APP_CONFIG?.dateFormats?.[0].value,
      language: storedLanguage || APP_CONFIG?.languages?.[0]?.value,
      numberFormat: storedNumberFormat || APP_CONFIG?.numberFormats?.[0]?.value,
      valueType: storedValueType || APP_CONFIG?.valueTypes?.[0]?.value,
      viewType: storedViewType || APP_CONFIG?.viewTypes?.[0]?.value,
    });

    setIsInitialRender(false);
  }, []);

  const styles = getStyles(theme);

  const handleNumberFormatChange = (event: SelectChangeEvent) => {
    setNumberFormat(event.target.value);
  };

  const handleDateFormatChange = (event: SelectChangeEvent) => {
    setDateFormat(event.target.value);
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  const handleValueTypeChange = (event: SelectChangeEvent) => {
    setValueType(event.target.value);
  };
  const handleViewTypeChange = (event: SelectChangeEvent) => {
    setViewType(event.target.value);
  };

  const handleCurrencyUnitChange = (event: SelectChangeEvent) => {
    setCurrencyUnit(Number(event.target.value));
  };

  const handleApplySettings = () => {
    StorageService.set(
      APP_CONFIG?.sessionStorage?.storageNumberFormat,
      numberFormat
    );
    StorageService.set(
      APP_CONFIG?.sessionStorage?.storageDateFormat,
      dateFormat
    );
    StorageService.set(APP_CONFIG?.sessionStorage?.storageLanguage, language);
    StorageService.set(APP_CONFIG?.sessionStorage?.storageValueType, valueType);
    StorageService.set(APP_CONFIG?.sessionStorage?.storageViewType, viewType);

    StorageService.set(
      APP_CONFIG?.sessionStorage?.storageCurrencyUnit,
      currencyUnit
    );

    setInitialSettings({
      currencyUnit,
      dateFormat,
      language,
      numberFormat,
      valueType,
      viewType,
    });
    setisPrimaryButtonDisabled(true);
    setSettingsSuccessSnackbarOpen(true);
  };

  useEffect(() => {
    const isChanged =
      currencyUnit !== initialSettings.currencyUnit ||
      numberFormat !== initialSettings.numberFormat ||
      dateFormat !== initialSettings.dateFormat ||
      language !== initialSettings.language ||
      valueType !== initialSettings.valueType ||
      viewType !== initialSettings.viewType;
    setisPrimaryButtonDisabled(!isChanged);
  }, [
    currencyUnit,
    dateFormat,
    initialSettings,
    language,
    numberFormat,
    valueType,
    viewType,
  ]);

  if (isInitialRender) {
    return null;
  }

  /**
   * @description Close Settings update success snackbar.
   */
  const closeSuccessSnackbar = () => {
    setSettingsSuccessSnackbarOpen(false);
    router.push(APP_CONFIG.routes.home);
  };

  return (
    <Grid
      container
      rowSpacing={{ xs: 5, sm: 5, md: 5, lg: 5 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {/* Number Format Selection */}
      <Grid
        size={{ xs: 4, sm: 8, md: 5 }}
        sx={{ marginTop: 2 }}
        offset={{ md: 0.5 }}
      >
        <Card variant="outlined" sx={styles.card}>
          <CardContent sx={styles.cardContent}>
            <Typography variant="h6" sx={styles.cardTitle}>
              {SETTINGS.numberFormat.title}
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="number-format-label">
                {SETTINGS.numberFormat.instruction}
              </InputLabel>
              <Select
                labelId="number-format-label"
                value={numberFormat}
                onChange={handleNumberFormatChange}
                label={SETTINGS.numberFormat.instruction}
                sx={styles.select}
              >
                {APP_CONFIG?.numberFormats?.map((numberFormatObj, index) => (
                  <MenuItem
                    value={numberFormatObj.value}
                    key={numberFormatObj.value + "_" + index}
                  >
                    {numberFormatObj.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>

      {/* Date Format Selection */}
      <Grid
        size={{ xs: 4, sm: 8, md: 5 }}
        sx={{ marginTop: 2 }}
        offset={{ md: 0.5 }}
      >
        <Card variant="outlined" sx={styles.card}>
          <CardContent sx={styles.cardContent}>
            <Typography variant="h6" sx={styles.cardTitle}>
              {SETTINGS.dateFormat.title}
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="date-format-label">
                {SETTINGS.dateFormat.instruction}
              </InputLabel>
              <Select
                labelId="date-format-label"
                value={dateFormat}
                onChange={handleDateFormatChange}
                label={SETTINGS.dateFormat.instruction}
                sx={styles.select}
              >
                {APP_CONFIG?.dateFormats?.map((dateFormatObj, index) => (
                  <MenuItem
                    value={dateFormatObj.value}
                    key={dateFormatObj.value + "_" + index}
                  >
                    {dateFormatObj.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>

      {/* Language Selection */}
      <Grid
        size={{ xs: 4, sm: 8, md: 5 }}
        sx={{ marginTop: 2, display: "none" }}
        offset={{ md: 1 }}
      >
        <Card variant="outlined" sx={styles.card}>
          <CardContent sx={styles.cardContent}>
            <Typography variant="h6" sx={styles.cardTitle}>
              {SETTINGS.language.title}
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="language-label">
                {SETTINGS.language.instruction}
              </InputLabel>

              <Select
                labelId="language-label"
                value={language}
                onChange={handleLanguageChange}
                label={SETTINGS.language.instruction}
                sx={styles.select}
              >
                {APP_CONFIG.languages.map((languageObj, index) => (
                  <MenuItem
                    value={languageObj.value}
                    key={languageObj.value + "_" + index}
                  >
                    {languageObj.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>

      {/* Value Type Selection */}
      <Grid
        size={{ xs: 4, sm: 8, md: 5 }}
        sx={{ marginTop: 2 }}
        offset={{ md: 0.5 }}
      >
        <Card variant="outlined" sx={styles.card}>
          <CardContent sx={styles.cardContent}>
            <Typography variant="h6" sx={styles.cardTitle}>
              {SETTINGS.valueType.title}
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="value-type-label">
                {SETTINGS.valueType.instruction}
              </InputLabel>
              <Select
                labelId="value-type-label"
                value={valueType}
                onChange={handleValueTypeChange}
                label={SETTINGS.valueType.instruction}
                sx={styles.select}
              >
                {APP_CONFIG.valueTypes.map((valueTypeObj, index) => (
                  <MenuItem
                    value={valueTypeObj.value}
                    key={valueTypeObj.value + "_" + index}
                  >
                    {valueTypeObj.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>

      {/* Currency Unit Selection */}
      <Grid
        size={{ xs: 4, sm: 8, md: 5 }}
        sx={{ marginTop: 2 }}
        offset={{ md: 0.5 }}
      >
        <Card variant="outlined" sx={styles.card}>
          <CardContent sx={styles.cardContent}>
            <Typography variant="h6" sx={styles.cardTitle}>
              {SETTINGS.currencyUnit.title}
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="currency-unit-label">
                {SETTINGS.currencyUnit.instruction}
              </InputLabel>
              <Select
                labelId="currency-unit-label"
                value={`${currencyUnit}`}
                onChange={handleCurrencyUnitChange}
                label={SETTINGS.currencyUnit.instruction}
                sx={styles.select}
              >
                {APP_CONFIG.currencyUnits.map((currencyUnitObj, index) => (
                  <MenuItem
                    value={currencyUnitObj.value}
                    key={currencyUnitObj.value + "_" + index}
                  >
                    {currencyUnitObj.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>

      {/* Category/Goal View Selection */}
      <Grid
        size={{ xs: 4, sm: 8, md: 5 }}
        sx={{ marginTop: 2 }}
        offset={{ md: 0.5 }}
      >
        <Card variant="outlined" sx={styles.card}>
          <CardContent sx={styles.cardContent}>
            <Typography variant="h6" sx={styles.cardTitle}>
              {SETTINGS.viewType.title}
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="view-type-label">
                {SETTINGS.viewType.instruction}
              </InputLabel>
              <Select
                labelId="view-type-label"
                value={viewType}
                onChange={handleViewTypeChange}
                label={SETTINGS.viewType.instruction}
                sx={styles.select}
              >
                {APP_CONFIG.viewTypes.map((viewTypeObj, index) => (
                  <MenuItem
                    value={viewTypeObj.value}
                    key={viewTypeObj.value + "_" + index}
                  >
                    {viewTypeObj.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>

      {/* Apply Button */}
      <Grid size={{ xs: 4, sm: 8, md: 5 }} offset={{ md: 3 }}>
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            sx={styles.primaryButton}
            disabled={isPrimaryButtonDisabled}
            onClick={handleApplySettings}
          >
            {SETTINGS.applySettings}
          </Button>
        </Box>
      </Grid>

      {/* Sample Displays */}
      <Grid size={{ xs: 4, sm: 8, md: 5 }} offset={{ md: 4 }}>
        <Typography variant="body1" sx={styles.sampleContainer}>
          {SETTINGS.numberFormat.sampleNumber}
          {new Intl.NumberFormat(numberFormat).format(1234567890)}
        </Typography>

        <Typography variant="body1" sx={styles.sampleContainer}>
          {SETTINGS.dateFormat.sampleDateText}

          {formatDate({
            date: SETTINGS.dateFormat.sampleDate,
            format: dateFormat,
          })}
        </Typography>

        <Typography variant="body1" sx={styles.sampleContainer}>
          {SETTINGS.currencyUnit.sampleText}

          {getTotalAmountInSelectedUnit(
            SETTINGS.currencyUnit.sampleAmount,
            currencyUnit
          )}
        </Typography>
      </Grid>
      <Snackbar
        autoHideDuration={APP_CONFIG.snackbar.settings.autoHideDuration}
        message={SETTINGS.successMessage}
        open={isSettingsSuccessSnackbarOpen}
        onClose={closeSuccessSnackbar}
        severity="success"
      />
    </Grid>
  );
};

const getStyles = (theme: Theme) => {
  const localStyles = {
    card: {
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      borderRadius: 10,
      background: "linear-gradient(45deg, #f3f4f7, #f0f2f5)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        boxShadow: "0 6px 25px rgba(0,0,0,0.15)",
        transform: "scale(1.05)",
      },
    },
    cardContent: { padding: 3 },
    cardTitle: { fontWeight: 600, fontSize: "1.2rem", marginBottom: 2 },
    primaryButton: {
      borderRadius: 25,
      padding: "12px 40px",
      fontSize: 16,
      boxShadow: 3,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        boxShadow: "0 5px 25px rgba(0,0,0,0.2)",
      },
      transition: "all 0.3s ease-in-out",
    },
    sampleContainer: {
      textAlign: "left",
      color: theme.palette.text.secondary,
      fontSize: "16px",
    },
    select: {
      backgroundColor: "#ffffff",
      borderRadius: 5,
      "&:hover": { backgroundColor: "#f5f5f5" },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
      },
      transition: "all 0.2s ease-in-out",
    },
  };
  return localStyles;
};

export default Settings;
