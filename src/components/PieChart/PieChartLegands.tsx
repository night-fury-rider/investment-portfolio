import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";

import styles from "$/components/PieChart/PieChartLegands.module.css";

interface iPieChartLegandsProps {
  color: string;
  label: string;
}

const PieChartLegands = ({ color, label }: iPieChartLegandsProps) => {
  return (
    <Grid
      container
      spacing={{ xs: 0, md: 3 }}
      columns={{ xs: 12, sm: 8, md: 12 }}
    >
      <Grid size={{ xs: 12, sm: 8, md: 6 }} offset={4}>
        <div className={styles.legandContainer}>
          <Box className={styles.legand}>
            <div
              style={{
                backgroundColor: color,
              }}
              className={styles.legandCircle}
            />
            <Typography variant="body2">{label}</Typography>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default PieChartLegands;
