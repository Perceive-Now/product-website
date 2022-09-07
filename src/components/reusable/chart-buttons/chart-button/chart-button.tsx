import classNames from "classnames";

//
import { BarIcon, PieIcon, ScatterIcon } from "../../../icons";

//
import "./chart-button.css";

export default function ChartButton(props: IGraphButtonProps) {
  const { type, active = false, className, setActiveChart } = props;

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
      {type === "bar" && <BarIcon />}
      {type === "donut" && <PieIcon />}
      {type === "scatter" && <ScatterIcon />}
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
