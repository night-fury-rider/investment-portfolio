import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import { UploadSharp } from "@mui/icons-material";
import styles from "$/components/Header/Header.module.css";
import { DASHBOARD } from "constants/strings.constants";
import { COLORS } from "constants/colors.constants";

const Header: React.FC = () => {
  const handleUploadClick = () => {
    alert(`update Data`);
  };

  return (
    <AppBar position="sticky" className={styles.appBar}>
      <Toolbar className={styles.toolBar}>
        {/*  Title */}
        <Typography variant="h6" className={styles.title}>
          {DASHBOARD.header.title}
        </Typography>

        {/* Right side  */}
        <Box className={styles.rightSideIcon}>
          <Tooltip title={DASHBOARD.header.upload.title}>
            <IconButton
              color="inherit"
              onClick={handleUploadClick}
              sx={{
                "&:hover": { backgroundColor: COLORS.lightWhite },
              }}
            >
              <UploadSharp />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
