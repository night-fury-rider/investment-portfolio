import dynamic from "next/dynamic";
import React from "react";
import EmptyCustomTooltip from "$/components/EmptyCustomTooltip";

const ResponsiveBar = dynamic(
  () => import("@nivo/bar").then((m) => m.ResponsiveBar),
  { ssr: false }
);

interface iBarChartProps {
  data: any[];
}

const BarChart = ({ data }: iBarChartProps) => {
  const handleMouseEnter = (
    event: React.MouseEvent<SVGRectElement, MouseEvent>
  ) => {
    document.body.style.cursor = "pointer";
    event.currentTarget.style.transform = "scale(1.025)";
    event.currentTarget.style.transformOrigin = "bottom center"; // Scale upwards
    event.currentTarget.style.transition = "transform 0.3s ease-in-out";
  };
  const handleMouseLeave = (
    event: React.MouseEvent<SVGRectElement, MouseEvent>
  ) => {
    document.body.style.cursor = "default";
    event.currentTarget.style.transform = "scale(1)";
    event.currentTarget.style.transformOrigin = "bottom center"; // Reset to bottom origin
    event.currentTarget.style.transition = "transform 0.3s ease-in-out";
  };

  return (
    <>
      <ResponsiveBar
        data={data}
        keys={["value"]}
        indexBy="label"
        margin={{ top: 40, right: 30, bottom: 60, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "category10" }}
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
          legend: "country",
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
        onMouseEnter={(bar, event) => handleMouseEnter(event)}
        onMouseLeave={(bar, event) => handleMouseLeave(event)}
        role="application"
        ariaLabel="Yuvraj Patil Bar Chart"
        barAriaLabel={(e) =>
          e.id + ": " + e.formattedValue + " in country: " + e.indexValue
        }
        tooltip={EmptyCustomTooltip}
      />
    </>
  );
};

export default BarChart;
