import React, { useEffect, useState } from "react";
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

import { SETTINGS } from "$/constants/strings.constants";
import APP_CONFIG from "$/constants/app.config.constants";

const Settings: React.FC = () => {
  const theme = useTheme();

  const [numberFormat, setNumberFormat] = useState(
    APP_CONFIG?.numberFormats[0]?.value
  );
  const [language, setLanguage] = useState(APP_CONFIG?.languages[0]?.value);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isPrimaryButtonDisabled, setisPrimaryButtonDisabled] = useState(true);

  const [initialSettings, setInitialSettings] = useState({
    numberFormat: APP_CONFIG?.numberFormats[0]?.value,
    language: APP_CONFIG?.languages[0]?.value,
  });

  /* Use Effect for one time tasks */
  useEffect(() => {
    const storedNumberFormat = sessionStorage.getItem(
      APP_CONFIG?.sessionStorage?.numberFormat
    );
    const storedLanguage = sessionStorage.getItem(
      APP_CONFIG?.sessionStorage?.language
    );

    if (storedNumberFormat) {
      setNumberFormat(storedNumberFormat);
    }
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }

    setInitialSettings({
      numberFormat: storedNumberFormat || APP_CONFIG?.numberFormats[0]?.value,
      language: storedLanguage || APP_CONFIG?.languages[0]?.value,
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

  const handleApplySettings = () => {
    sessionStorage.setItem(
      APP_CONFIG?.sessionStorage?.numberFormat,
      numberFormat
    );
    sessionStorage.setItem(APP_CONFIG?.sessionStorage?.language, language);
    setInitialSettings({ numberFormat, language });
    setisPrimaryButtonDisabled(true);
  };

  useEffect(() => {
    const isChanged =
      numberFormat !== initialSettings.numberFormat ||
      language !== initialSettings.language;
    setisPrimaryButtonDisabled(!isChanged);
  }, [numberFormat, language, initialSettings]);

  if (isInitialRender) {
    return null;
  }

  return (
    <Grid
      container
      rowSpacing={{ xs: 5, sm: 5, md: 10, lg: 10 }}
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
                {APP_CONFIG.numberFormats.map((numberFormatObj, index) => (
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
