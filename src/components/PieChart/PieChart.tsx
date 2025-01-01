import dynamic from "next/dynamic";
import React from "react";
import PieChartCentralTitle from "$/components/PieChart/PicChartCentralTitle";
import { useMediaQuery, useTheme } from "@mui/material";
import EmptyCustomTooltip from "$/components/EmptyCustomTooltip";

const ResponsivePie = dynamic(
  () => import("@nivo/pie").then((m) => m.ResponsivePie),
  { ssr: false }
);

interface iPieChartProps {
  data: any[];
  centralTitle?: string | number;
}

const PieChart = ({ data, centralTitle }: iPieChartProps) => {
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

  return (
    <>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 20, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ datum: "data.color" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabel={"label"}
        arcLinkLabelsSkipAngle={10}
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        tooltip={EmptyCustomTooltip}
      />
    </>
  );
};

export default PieChart;
