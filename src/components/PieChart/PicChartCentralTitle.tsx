import styles from "$/components/PieChart/PicChartCentralTitle.module.css";
import { COLORS } from "$/constants/colors.constants";

interface iPieChartCentralTitleProps {
  centerX: number;
  centerY: number;
  centralTitle: string | number;
}

const PieChartCentralTitle = ({
  centerX,
  centerY,
  centralTitle,
}: iPieChartCentralTitleProps) => {
  return (
    <g>
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fill: COLORS.black }}
        className={styles.centralTitle}
      >
        {centralTitle}
      </text>
    </g>
  );
};

export default PieChartCentralTitle;
