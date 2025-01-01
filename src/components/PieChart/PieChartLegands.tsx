import React from "react";
import Grid from "@mui/material/Grid2";

import { Box, Typography } from "@mui/material";

import styles from "$/components/PieChart/PieChartLegands.module.css";

interface iPieChartLegandsProps {
  data: any[];
}

const PieChartLegands = ({ data }: iPieChartLegandsProps) => {
  return (
    <>
      <Grid sx={{ xs: 12, sm: 12, md: 6, lg: 6 }} offset={4}>
        <div className={styles.legandContainer}>
          {data.map((item, index) => (
            <Box key={index} className={styles.legand}>
              <div
                style={{
                  backgroundColor: item.color,
                }}
                className={styles.legandCircle}
              />
              <Typography variant="body2">{item.label}</Typography>
            </Box>
          ))}
        </div>
      </Grid>
    </>
  );
};

export default PieChartLegands;
