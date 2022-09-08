import { Link } from "react-router-dom";
import { Fragment, useState } from "react";

//
import { useQuery } from "@tanstack/react-query";
import { getAcademicResearchFundingChart } from "../../../utils/api/charts";

//
import BarChart from "../../@product/bar-chart";
import PieChart from "../../@product/pie-chart";

//
import PageTitle from "../../reusable/page-title";
import TimePeriod from "../../reusable/time-period";
import ChartButtons from "../../reusable/chart-buttons";
import ScatterChart from "../../@product/scatter-chart";

//
import { COLORS } from "../../../utils/constants";

//
import { ChartType } from "../../reusable/chart-buttons";

//
import { abbreviateString, formatNumber } from "../../../utils/helpers";
import { TIME_PERIODS } from "../../../utils/constants";

/**
 *
 */
export default function AcademicResearchFundings() {
  const colors = [
    "#7F4BD8",
    "#442873",
    "#B6A2D8",
    "#d6d6d6",
    "#e0d4f2",
    "#b5a2d8",
  ];
  const [activeChart, setActiveChart] = useState<ChartType>("bar");

  const { data, isLoading } = useQuery(
    ["dashboard-academic-funding-chart"],
    async () => {
      return await getAcademicResearchFundingChart();
    }
  );
  let chartData = data?.chart ?? [];

  let chart = null;
  switch (activeChart) {
    case "bar":
      let finalBarChartData = chartData.map((data) => {
        return {
          [data.name]: data.percentage,
          university: abbreviateString(data.name),
        };
      });

      chart = (
        <Fragment>
          <div className="flex justify-end gap-x-3 pt-1 -mb-3">
            {chartData.map((data, index) => {
              return (
                <div
                  className="flex gap-x-1 text-sm items-center flex-wrap"
                  key={index}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: colors[index],
                      height: "16px",
                      width: "16px",
                    }}
                  />
                  <span>
                    {data.name} ({abbreviateString(data.name)})
                  </span>
                </div>
              );
            })}
          </div>

          <BarChart
            keys={chartData.map((d) => d.name)}
            indexBy="university"
            legendY="Number of Funding"
            legendX="Universities"
            data={finalBarChartData}
            groupMode="stacked"
            colors={colors}
          />
        </Fragment>
      );
      break;
    case "donut":
      const finalPieValue = isLoading
        ? []
        : chartData.map((itm, index) => ({
            id: index,
            label: itm.name,
            value: itm.percentage,
          }));
      chart = <PieChart data={finalPieValue} colors={colors} />;
      break;
    case "scatter":
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
      chart = (
        <ScatterChart
          data={finalScatterData}
          legendX="University"
          legendY="Funding"
          abbreviateLegendX={true}
        />
      );
      break;
  }

  return (
    <div className="px-3 pt-1 pb-3 rounded-lg border bg-white border-gray-200 shadow">
      <PageTitle title="Academic Research Funding" info="info" />

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

      {chart}

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
