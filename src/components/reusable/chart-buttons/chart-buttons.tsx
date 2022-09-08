import classNames from "classnames";

//
import { BarIcon, PieIcon, ScatterIcon } from "../../icons";

//
import "./chart-buttons.css";

/*
 *
 **/
export default function ChartButtons(props: IChartButtons) {
  const { activeChart, setActiveChart } = props;

  return (
    <div className="flex">
      <ChartButton
        type="bar"
        active={activeChart === "bar"}
        setActiveChart={(type) => setActiveChart(type)}
      />
      <ChartButton
        type="donut"
        active={activeChart === "donut"}
        setActiveChart={(type) => setActiveChart(type)}
      />
      <ChartButton
        type="scatter"
        active={activeChart === "scatter"}
        setActiveChart={(type) => setActiveChart(type)}
      />
    </div>
  );
}

function ChartButton(props: IGraphButtonProps) {
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

interface IChartButtons {
  activeChart: ChartType;
  setActiveChart: (type: ChartType) => void;
}

interface IGraphButtonProps {
  type: ChartType;
  active: boolean;
  className?: string;
  setActiveChart: (type: ChartType) => void;
}
