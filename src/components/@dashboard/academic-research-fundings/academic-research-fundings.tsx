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
import ChartButtons from "../../reusable/chart-buttons";
import { ChartType } from "../../reusable/chart-buttons";

//
import { TIME_PERIODS } from "../../../utils/constants";
import { abbreviateString, formatNumber } from "../../../utils/helpers";
import { getAcademicResearchFundingChart } from "../../../utils/api/charts";

/**
 *
 */
export default function AcademicResearchFundings() {
  const [activeChart, setActiveChart] = useState<ChartType>("bar");

  const { data, isLoading } = useQuery(
    ["dashboard-academic-funding-chart"],
    async () => {
      return await getAcademicResearchFundingChart();
    }
  );
  let chartData = data?.chart ?? [];

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
    <div className="px-3 pt-1 pb-3 rounded-lg border bg-white border-gray-200 shadow">
      <PageTitle
        title="Academic Research Funding"
        info={`This list was extracted from "X" total number of universities worldwide`}
      />

      {/* Controls */}
      <div className="pt-1 flex justify-end gap-x-3">
        <div>
          <TimePeriod timePeriods={TIME_PERIODS} />
        </div>

        <div className="flex items-center">
          <ChartButtons
            activeChart={activeChart}
            setActiveChart={setActiveChart}
          />
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
        <span className="font-semibold">
          "
          {formatNumber(data?.captionText.fundingAmount ?? 0, {
            isCurrency: true,
          })}
          "
        </span>
        <span> </span>
        <span>
          amount of funding was received by the top 5 universities with the
          maximum amount of funding in the past
        </span>
        <span> </span>
        <span>{data?.captionText.numberOfYears ?? "-"}</span>
        <span> </span>
        <span>
          {(data?.captionText.numberOfYears ?? 0) > 1 ? "years" : "year"}
        </span>
        <span className="ml-1">
          <Link to="#">Read More</Link>
        </span>
      </div>
    </div>
  );
}
