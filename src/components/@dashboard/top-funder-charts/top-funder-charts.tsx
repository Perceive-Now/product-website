import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import BarChart from "../../@product/bar-chart";
import PieChart from "../../@product/pie-chart";
import PageTitle from "../../reusable/page-title";
import ScatterChart from "../../@product/scatter-chart";
import ChartButtons from "../../reusable/chart-buttons/chart-buttons";

//
import { getTopFundingChart } from "../../../utils/api/charts";

//
import { ChartType } from "../../reusable/chart-buttons";

/**
 *
 */
export default function TopFunderCharts() {
  const colors = [
    "#7F4BD8",
    "#442873",
    "#B6A2D8",
    "#d6d6d6",
    "#e0d4f2",
    "#b5a2d8",
  ];
  const [activeChart, setActiveChart] = useState<ChartType>("bar");

  //
  const { data, isLoading } = useQuery(["top-funder-charts"], async () => {
    return await getTopFundingChart();
  });

  //
  const finalBarData = isLoading
    ? []
    : (data ?? []).map((item) => ({
        year: item.year,
        [item.year]: item.value,
      }));

  //
  const finalPieData = isLoading
    ? []
    : (data ?? []).map((item) => ({
        id: item.year,
        label: `${item.year}`,
        value: item.value,
      }));

  //
  const finalScatterData = isLoading
    ? []
    : [
        {
          id: "Years",
          data: (data ?? []).map((item) => ({
            x: item.year,
            y: item.value,
          })),
        },
      ];

  return (
    <div className="px-3 pt-1 pb-3 rounded-lg border bg-white border-gray-200 shadow">
      <PageTitle
        titleClass="font-medium"
        title="Total Amount of Funding over time"
        info="info"
      />

      <div className="pt-1 flex items-center justify-end gap-x-3 h-5">
        <div className="flex items-center">
          <ChartButtons
            activeChart={activeChart}
            setActiveChart={setActiveChart}
          />
        </div>
      </div>

      {activeChart === "bar" && (
        <BarChart
          data={finalBarData ?? []}
          keys={finalBarData.map((d) => d.year)}
          indexBy="year"
          groupMode="stacked"
          legendY="FUNDING AMOUNT ($)"
          colors={colors}
        />
      )}

      {activeChart === "donut" && (
        <PieChart data={finalPieData} colors={colors} />
      )}

      {activeChart === "scatter" && (
        <ScatterChart
          data={finalScatterData}
          legendX="Years"
          legendY="Patents"
        />
      )}

      <div className="text-primary-600 mt-4 cursor-pointer">Read more</div>
    </div>
  );
}
