import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

//
import BarChart from "../../@product/bar-chart";
import PieChart from "../../@product/pie-chart";
import ScatterChart from "../../@product/scatter-chart";

//
import PageTitle from "../../reusable/page-title";
import TimePeriod from "../../reusable/time-period";
import ChartButtons from "../../reusable/chart-buttons/chart-buttons";

//
import { TIME_PERIODS } from "../../../utils/constants";
import { getPatentsCount } from "../../../utils/api/dashboard";
import { getPatentsPieChart } from "../../../utils/api/charts";

//
import { ChartType } from "../../reusable/chart-buttons";

/**
 *
 */
export default function Patents() {
  const navigate = useNavigate();

  const colorsArray = ["#B6A2D8", "#7F4BD8", "#442873"];

  const [activeChart, setActiveChart] = useState<ChartType>("bar");

  const { data, isLoading } = useQuery(["patents-pie-chart"], async () => {
    return await getPatentsPieChart();
  });

  const { data: patentCount } = useQuery(
    ["patents-count-for-chart"],
    async () => {
      return await getPatentsCount();
    }
  );

  const finalBarData = isLoading ? [] : data ?? [];

  const finalPieData = isLoading
    ? []
    : (data ?? []).map((item, idx) => ({
        id: item.name,
        label: `${item.name} (${item.percentage}%)`,
        value: item.value,
        color: colorsArray[idx],
      }));

  const finalScatterData = isLoading
    ? []
    : [
        {
          id: "Years",
          data: (data ?? []).map((item) => ({
            x: item.name,
            y: item.percentage,
          })),
        },
      ];

  const handleArcClick = (data: any) => {
    navigate("/patents", {
      state: { search: [{ label: data.id, value: data.id }] },
    });
  };

  return (
    <div className="px-3 pt-1 pb-3 rounded-lg border bg-white border-gray-200 shadow">
      <PageTitle
        title="Patents"
        info={`Stats in this graph are extracted from a total of "X" number of patents`}
      />

      <div className="pt-1 flex items-center justify-end gap-x-3 h-5">
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
          data={finalBarData ?? []}
          keys={["value"]}
          indexBy="name"
          groupMode="stacked"
        />
      )}

      {activeChart === "donut" && (
        <PieChart
          data={finalPieData}
          colors={(bar) => bar.data.color}
          onClick={handleArcClick}
        />
      )}

      {activeChart === "scatter" && (
        <ScatterChart
          data={finalScatterData}
          legendX="Years"
          legendY="Patents"
        />
      )}

      <div className="mt-4 text-sm">
        <span className="font-bold">"{patentCount?.patentCount ?? "-"}"</span>
        <span> </span>
        <span>total number of patents were filed in the past</span>
        <span> </span>
        <span className="font-semibold">{patentCount?.yearsElapsed}</span>
        <span> </span>
        <span>years</span>
      </div>
    </div>
  );
}
