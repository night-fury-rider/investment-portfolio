import { useMediaQuery, useTheme } from "@mui/material";
import { BarDatum } from "@nivo/bar";
import dynamic from "next/dynamic";
import React from "react";

import EmptyTooltip from "$/components/Tooltip/EmptyTooltip";
import APP_CONFIG from "$/constants/app.config.constants";
import { COLORS } from "$/constants/colors.constants";

const ResponsiveBar = dynamic(
  () => import("@nivo/bar").then((m) => m.ResponsiveBar),
  { ssr: false }
);

interface iBarChartProps {
  data: BarDatum[];
  handleBarClick?: (param: number) => void;
}

const BarChart = ({ data, handleBarClick }: iBarChartProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const calculateMinHeightThreshold = (data: BarDatum[]): number => {
    const maxHeight = Math.max(...data.map((d) => Number(d.value)));
    const minHeight = Math.min(...data.map((d) => Number(d.value)));
    const range = maxHeight - minHeight;
    const threshold = range * 0.1; // 1% of the value range
    return threshold;
  };

  const handleMouseEnter = (
    event: React.MouseEvent<SVGRectElement, MouseEvent>,
    barValue: number | null
  ) => {
    if (!barValue) {
      return;
    }
    document.body.style.cursor = "pointer";

    const minHeightThreshold = calculateMinHeightThreshold(data);

    if (barValue > minHeightThreshold) {
      event.currentTarget.style.transform = "scale(1.025)";
      event.currentTarget.style.transformOrigin = "bottom center";
      event.currentTarget.style.transition = "transform 0.3s ease-in-out";
    } else {
      event.currentTarget.style.transition = "none";
    }
  };

  const handleMouseLeave = (
    event: React.MouseEvent<SVGRectElement, MouseEvent>
  ) => {
    document.body.style.cursor = "default";
    event.currentTarget.style.transform = "scale(1)";
    event.currentTarget.style.transformOrigin = "bottom center"; // Reset to bottom origin
    event.currentTarget.style.transition = "transform 0.3s ease-in-out";
  };

  const margin = isMobile
    ? { top: 40, right: 30, bottom: 60, left: 50 } // Mobile margin
    : { top: 40, right: 100, bottom: 100, left: 100 }; // Desktop margin

  return (
    <>
      <ResponsiveBar
        data={data}
        keys={["value"]}
        indexBy="label"
        margin={margin}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        colorBy="indexValue"
        borderRadius={5}
        borderWidth={2}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: "middle",
          legendOffset: 32,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -40,
          truncateTickAt: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        onClick={(data) => {
          handleBarClick?.(data?.index || 0);
        }}
        onMouseEnter={(bar, event) => handleMouseEnter(event, bar.value)}
        onMouseLeave={(bar, event) => handleMouseLeave(event)}
        role="application"
        ariaLabel="Yuvraj Patil Bar Chart"
        tooltip={EmptyTooltip}
        theme={{
          // Apply font to the whole chart
          axis: {
            ticks: {
              line: {
                stroke: COLORS.greyLight,
                strokeWidth: 1,
              },
              text: {
                fontFamily: APP_CONFIG.font.family,
                fontSize: 14,
                fontWeight: "bold",
              },
            },
          },
          grid: {
            line: {
              stroke: COLORS.greyLight,
              strokeWidth: 1,
            },
          },
          labels: {
            text: {
              fontFamily: APP_CONFIG.font.family,
              fontSize: 14,
              fontWeight: "bold",
            },
          },
        }}
      />
    </>
  );
};

export default BarChart;
