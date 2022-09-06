import classNames from "classnames";
import { BarIcon, PieIcon, ScatterIcon } from "../../../icons";

//
import "./chart-button.css";

export default function ChartButton({
  type,
  active = false,
  className,
  setActiveChart,
}: IGraphButtonProps) {
  let icon;

  switch (type) {
    case "bar":
      icon = <BarIcon />;
      break;
    case "donut":
      icon = <PieIcon />;
      break;
    case "scatter":
      icon = <ScatterIcon />;
      break;
    default:
      icon = null;
  }

  const handleActiveGraph = () => {
    setActiveChart(type);
  };

  return (
    <div
      className={classNames(
        "ml-2 cursor-pointer chart-button rounded-md",
        `chart-${type}`,
        active ? `chart-button-active` : "",
        className
      )}
      onClick={handleActiveGraph}
    >
      {icon}
    </div>
  );
}

export type ChartType = "donut" | "scatter" | "bar";

interface IGraphButtonProps {
  type: ChartType;
  active: boolean;
  className?: string;
  setActiveChart: (type: ChartType) => void;
}
