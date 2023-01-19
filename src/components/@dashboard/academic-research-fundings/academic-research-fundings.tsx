import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//
import BarChart from "../../@product/bar-chart";
import PieChart from "../../@product/pie-chart";
import ScatterChart from "../../@product/scatter-chart";

//
import PageTitle from "../../reusable/page-title";
import TimePeriod from "../../reusable/time-period";
import DataSection from "../../reusable/data-section";
import ChartButtons from "../../reusable/chart-buttons";
import { ChartType } from "../../reusable/chart-buttons";

//
import { TIME_PERIODS } from "../../../utils/constants";
import { abbreviateString } from "../../../utils/helpers";
import { getAcademicResearchFundingChart } from "../../../utils/api/charts";

/**
 *
 */
export default function AcademicResearchFundings(props: IFundingProps) {
  const [activeChart, setActiveChart] = useState<ChartType>("bar");

  const { data, isLoading, isError, error } = useQuery(
    ["dashboard-academic-funding-chart", ...props.keywords],
    async () => {
      return await getAcademicResearchFundingChart(props.keywords);
    },
    { enabled: !!props.keywords.length },
  );
  const chartData = data?.chart ?? [];

  const finalBarChartData = chartData.map((data) => ({
    university: abbreviateString(data.name),
    value: data.percentage,
  }));

  const finalPieValue = isLoading
    ? []
    : chartData.map((itm, index) => ({
        id: index,
        label: itm.name,
        value: itm.percentage,
      }));

  const finalScatterData = isLoading
    ? []
    : [
        {
          id: "universities",
          data: chartData.map((data) => ({
            x: data.name,
            y: data.percentage,
          })),
        },
      ];

  return (
    <DataSection
      keywords={props.keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle
          title="Academic Patent Landscape"
          info={`This list was extracted from "X" total number of universities worldwide`}
          titleClass="font-semibold"
        />
      }
    >
      {/* Controls */}
      <div className="pt-1 flex justify-end gap-x-3">
        <div>
          <TimePeriod timePeriods={TIME_PERIODS} />
        </div>

        <div className="flex items-center">
          <ChartButtons activeChart={activeChart} setActiveChart={setActiveChart} />
        </div>
      </div>

      {activeChart === "bar" && (
        <BarChart
          keys={["value"]}
          indexBy="university"
          legendY="Number of Funding"
          legendX="Universities"
          data={finalBarChartData}
          groupMode="stacked"
        />
      )}

      {activeChart === "donut" && <PieChart data={finalPieValue} />}

      {activeChart === "scatter" && (
        <ScatterChart
          data={finalScatterData}
          legendX="University"
          legendY="Funding"
          abbreviateLegendX={true}
        />
      )}

      {/* Caption */}
      <div className="mt-4">
        <Link to="/funders">Read more</Link>
      </div>
    </DataSection>
  );
}

interface IFundingProps {
  keywords: string[];
}
