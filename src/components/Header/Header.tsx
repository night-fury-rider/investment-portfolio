import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";
import React from "react";

import styles from "$/components/Header/Header.module.css";
import FileUpload from "$/components/FileUpload/FileUpload";
import { COLORS } from "$/constants/colors.constants";
import { HEADER } from "$/constants/strings.constants";
import APP_CONFIG from "$/constants/app.config.constants";

interface iHeaderProps {
  handleAddBtnPress?: () => void;
  investmentRoute?: string;
  isSettingsPage?: boolean;
  isInvestmentsPage?: boolean;
  title?: string;
  updateData?: (data: string) => void;
}

const Header = ({
  handleAddBtnPress,
  isInvestmentsPage,
  isSettingsPage,
  title,
  updateData,
}: iHeaderProps) => {
  return (
    <AppBar
      position="sticky"
      className={styles.appBar}
      style={{ backgroundColor: COLORS.blue }}
    >
      <Toolbar className={styles.toolBar}>
        <Tooltip title={HEADER.home.title}>
          <IconButton
            color="inherit"
            component="label"
            sx={{
              "&:hover": { backgroundColor: COLORS.whiteLight },
            }}
          >
            <Link
              aria-label="home"
              className={styles.icon}
              href={APP_CONFIG.routes.home}
              style={{ color: "white" }}
            >
              <HomeIcon />
            </Link>
          </IconButton>
        </Tooltip>

        {/*  Title */}
        <Typography variant="h6" className={styles.title}>
          {title || HEADER.title}
        </Typography>

        {/* Right side  */}
        <Box className={styles.rightSideIconContainer}>
          {/* Investment Records Icon */}
          {!isInvestmentsPage && (
            <Tooltip title={HEADER.home.title}>
              <IconButton
                color="inherit"
                component="label"
                sx={{
                  "&:hover": { backgroundColor: COLORS.whiteLight },
                }}
              >
                <Link
                  aria-label="investments"
                  className={styles.icon}
                  href={APP_CONFIG.routes.investments}
                  style={{ color: "white" }}
                >
                  <ReceiptIcon />
                </Link>
              </IconButton>
            </Tooltip>
          )}

          {/* Add Investment Icon */}
          {handleAddBtnPress && (
            <Tooltip title={HEADER.add.title}>
              <IconButton
                color="inherit"
                component="label"
                sx={{
                  "&:hover": { backgroundColor: COLORS.whiteLight },
                }}
                onClick={handleAddBtnPress}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Update Data Icon */}
          {updateData && (
            <FileUpload
              fileUploadCallback={updateData}
              title={HEADER.upload.title}
            />
          )}

          {/* Settings Icon */}
          {!isSettingsPage && (
            <Tooltip title={HEADER.home.title}>
              <IconButton
                color="inherit"
                component="label"
                sx={{
                  "&:hover": { backgroundColor: COLORS.whiteLight },
                }}
              >
                <Link
                  aria-label="settings"
                  className={styles.icon}
                  href={APP_CONFIG.routes.settings}
                  style={{ color: "white" }}
                >
                  <SettingsIcon />
                </Link>
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
