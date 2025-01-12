import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import styles from "$/components/Header/Header.module.css";
import { DASHBOARD } from "constants/strings.constants";
import FileUpload from "../FileUpload";
import { COLORS } from "$/constants/colors.constants";

interface iHeaderProps {
  updateData: (data: string) => void;
}

const Header = ({ updateData }: iHeaderProps) => {
  return (
    <AppBar
      position="sticky"
      className={styles.appBar}
      style={{ backgroundColor: COLORS.blue }}
    >
      <Toolbar className={styles.toolBar}>
        {/*  Title */}
        <Typography variant="h6" className={styles.title}>
          {DASHBOARD.header.title}
        </Typography>

        {/* Right side  */}
        <Box className={styles.rightSideIcon}>
          <FileUpload
            fileUploadCallback={updateData}
            title={DASHBOARD.header.upload.title}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
