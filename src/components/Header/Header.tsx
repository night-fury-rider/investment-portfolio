import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Home, Receipt } from "@mui/icons-material";
import Link from "next/link";
import React from "react";

import styles from "$/components/Header/Header.module.css";
import FileUpload from "$/components/FileUpload/FileUpload";
import { COLORS } from "$/constants/colors.constants";
import { HEADER } from "$/constants/strings.constants";

interface iHeaderProps {
  updateData: (data: string) => void;
  handleAddBtnPress?: () => void;
  investmentHREF?: string;
  title?: string;
}

const Header = ({
  updateData,
  handleAddBtnPress,
  investmentHREF,
  title,
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
              href="/dashboard"
              style={{ color: "white" }}
            >
              <Home />
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
          {investmentHREF && (
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
                  href={investmentHREF}
                  style={{ color: "white" }}
                >
                  <Receipt />
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
          <FileUpload
            fileUploadCallback={updateData}
            title={HEADER.upload.title}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
