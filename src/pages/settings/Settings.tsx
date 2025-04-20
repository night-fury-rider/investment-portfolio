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

const Settings: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();

  const [numberFormat, setNumberFormat] = useState(
    APP_CONFIG?.numberFormats?.[0]?.value
  );
  const [language, setLanguage] = useState(APP_CONFIG?.languages?.[0]?.value);
  const [valueType, setValueType] = useState(
    APP_CONFIG?.valueTypes?.[0]?.value
  );

  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isPrimaryButtonDisabled, setisPrimaryButtonDisabled] = useState(true);
  const [isSettingsSuccessSnackbarOpen, setSettingsSuccessSnackbarOpen] =
    useState(false);

  const [initialSettings, setInitialSettings] = useState({
    numberFormat: APP_CONFIG?.numberFormats?.[0]?.value,
    language: APP_CONFIG?.languages?.[0]?.value,
    valueType: APP_CONFIG?.valueTypes?.[0]?.value,
  });

  /* Use Effect for one time tasks */
  useEffect(() => {
    const storedNumberFormat = StorageService.get(
      APP_CONFIG?.sessionStorage?.storageNumberFormat
    );
    if (storedNumberFormat) {
      setNumberFormat(storedNumberFormat);
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

    setInitialSettings({
      numberFormat: storedNumberFormat || APP_CONFIG?.numberFormats?.[0]?.value,
      language: storedLanguage || APP_CONFIG?.languages?.[0]?.value,
      valueType: storedValueType || APP_CONFIG?.valueTypes?.[0]?.value,
    });

    setIsInitialRender(false);
  }, []);

  const styles = getStyles(theme);

  const handleNumberFormatChange = (event: SelectChangeEvent) => {
    setNumberFormat(event.target.value);
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  const handleValueTypeChange = (event: SelectChangeEvent) => {
    setValueType(event.target.value);
  };

  const handleApplySettings = () => {
    StorageService.set(
      APP_CONFIG?.sessionStorage?.storageNumberFormat,
      numberFormat
    );
    StorageService.set(APP_CONFIG?.sessionStorage?.storageLanguage, language);
    StorageService.set(APP_CONFIG?.sessionStorage?.storageValueType, valueType);
    setInitialSettings({ numberFormat, language, valueType });
    setisPrimaryButtonDisabled(true);
    setSettingsSuccessSnackbarOpen(true);
  };

  useEffect(() => {
    const isChanged =
      numberFormat !== initialSettings.numberFormat ||
      language !== initialSettings.language ||
      valueType !== initialSettings.valueType;
    setisPrimaryButtonDisabled(!isChanged);
  }, [numberFormat, language, initialSettings, valueType]);

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

      {/* Language Selection */}
      <Grid
        size={{ xs: 4, sm: 8, md: 5 }}
        sx={{ marginTop: 2 }}
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

      {/* Sample Number Display */}
      <Grid size={{ xs: 4, sm: 8, md: 5 }} offset={{ md: 3 }}>
        <Typography variant="body1" sx={styles.sampleNumber}>
          {SETTINGS.numberFormat.sampleNumber}
          {new Intl.NumberFormat(numberFormat).format(1234567890)}
        </Typography>
      </Grid>
      <Snackbar
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
    sampleNumber: {
      textAlign: "center",
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
