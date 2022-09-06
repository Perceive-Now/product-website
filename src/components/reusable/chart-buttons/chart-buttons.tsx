import ChartButton, { ChartType } from "./chart-button/chart-button";

/*
 *
 **/
export default function ChartButtons({
  activeChart,
  setActiveChart,
}: IChartButtons) {
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

interface IChartButtons {
  activeChart: ChartType;
  setActiveChart: (type: ChartType) => void;
}
