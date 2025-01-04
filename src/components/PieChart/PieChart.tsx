import dynamic from "next/dynamic";
import React from "react";
import PieChartCentralTitle from "$/components/PieChart/PicChartCentralTitle";
import { useMediaQuery, useTheme } from "@mui/material";
import styles from "$/components/PieChart/PieChart.module.css";

const ResponsivePie = dynamic(
  () => import("@nivo/pie").then((m) => m.ResponsivePie),
  { ssr: false }
);

interface iPieChartProps {
  data: any[];
  centralTitle?: string | number;
  handleSliceClick?: (param: number) => void;
  totalValue?: number;
}

const PieChart = ({
  data,
  centralTitle,
  handleSliceClick,
  totalValue,
}: iPieChartProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMouseEnter = () => {
    document.body.style.cursor = "pointer";
  };
  const handleMouseLeave = () => {
    document.body.style.cursor = "default";
  };

  const getLayers = (defaultLayers: any[]) => {
    const newLayers = [...defaultLayers, "arcs", "arcLabels", "legends"];
    if (!isMobile) {
      newLayers.push("arcLinkLabels");
    }
    return newLayers;
  };

  const margin = isMobile
    ? { top: 20, right: 40, bottom: 60, left: 40 } // Mobile margin
    : { top: 40, right: 150, bottom: 100, left: 150 }; // Desktop margin

  return (
    <>
      <ResponsivePie
        data={data}
        margin={margin}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ datum: "data.color" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabel="label"
        arcLabel={({ data }) => {
          const totalAmount = totalValue || 0;

          const { value } = data;
          const percentage = ((value / totalAmount) * 100).toFixed(1);
          return `${percentage}%`;
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsOffset={0}
        arcLinkLabelsThickness={2}
        arcLabelsRadiusOffset={0.5}
        arcLabelsSkipAngle={10}
        arcLinkLabelsColor={{
          from: "color",
          modifiers: [["darker", 0.6]],
        }}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        layers={getLayers([
          (props) =>
            centralTitle ? (
              <PieChartCentralTitle {...props} centralTitle={centralTitle} />
            ) : null,
        ])}
        onClick={(data) => {
          handleSliceClick?.(data?.arc?.index || 0);
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        theme={{
          labels: {
            text: {
              fontSize: 16,
              fontWeight: "bold",
            },
          },
        }}
        tooltip={({ datum }) => {
          const { value, color } = datum;
          return (
            <div className={styles.tooltipContainer}>
              <div
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 12px ${color}`,
                  color: "#fff",
                }}
                className={styles.tooltip}
              >
                {value}
              </div>
            </div>
          );
        }}
      />
    </>
  );
};

export default PieChart;
