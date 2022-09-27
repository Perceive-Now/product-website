import classNames from "classnames";

//
import { BarIcon, PieIcon, ScatterIcon } from "../../icons";

//
import "./chart-buttons.css";

/*
 *
 **/
export default function ChartButtons(props: IChartButtons) {
  const { activeChart, isMultiData, setActiveChart } = props;

  const buttonsType: ChartType[] = isMultiData
    ? ["bar", "scatter", "donut"]
    : ["bar", "donut", "scatter"];

  return (
    <div className="flex">
      {buttonsType.map((type) => (
        <ChartButton
          key={type}
          type={type}
          active={activeChart === type}
          setActiveChart={(type) => setActiveChart(type)}
        />
      ))}
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
  isMultiData?: boolean;
}

interface IGraphButtonProps {
  type: ChartType;
  active: boolean;
  className?: string;
  setActiveChart: (type: ChartType) => void;
}
