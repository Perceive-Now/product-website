import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import PageTitle from "../../reusable/page-title";
import ChartButtons, { ChartType } from "../../reusable/chart-buttons";

//
import BarChart from "../../@product/bar-chart";
import RadialChart from "../../@product/radial-chart";
import ScatterChart from "../../@product/scatter-chart";

//
import { getExpertsCount } from "../../../utils/api/dashboard";
import { getExpertsCountGraph } from "../../../utils/api/charts";

/**
 *
 */
export default function ExpertsGraph() {
  const [activeChart, setActiveChart] = useState<ChartType>("bar");

  const { data: expertsChartData, isLoading } = useQuery(
    ["experts-count-graph"],
    async () => {
      return await getExpertsCountGraph();
    }
  );

  const { data: expertsCount } = useQuery(
    ["expert-count-for-chart"],
    async () => {
      return await getExpertsCount();
    }
  );

  //
  const finalPieData = isLoading ? [] : expertsChartData ?? [];

  const radialData = finalPieData
    .map((itm) => itm.year)
    .map((itm) => {
      const data = finalPieData.find((it) => it.year === itm)!;

      const total = data.openExpertsCount + data.closedExpertsCount;
      const openPercentage = (data.openExpertsCount / total) * 100;
      const closedPercentage = (data.closedExpertsCount / total) * 100;

      return {
        id: itm,
        data: [
          { x: "Open", y: openPercentage, value: data.openExpertsCount },
          {
            x: "Closed",
            y: closedPercentage,
            value: data.closedExpertsCount,
          },
        ],
      };
    });

  const finalScatterDataFormatHelper = (data: any) => {
    if (!data) return [];

    let openExpertsObj = { id: "Open Experts", data: [] };
    let closedExpertsObj = { id: "Closed Experts", data: [] };

    let openExpertsData: any = [];
    let closedExpertsData: any = [];

    data.forEach((d: any) => {
      openExpertsData = [
        ...openExpertsData,
        { x: d.year, y: d.openExpertsCount },
      ];

      closedExpertsData = [
        ...closedExpertsData,
        { x: d.year, y: d.closedExpertsCount },
      ];
    });

    openExpertsObj.data = openExpertsData;
    closedExpertsObj.data = closedExpertsData;

    return [openExpertsObj, closedExpertsObj];
  };

  const finalScatterData = isLoading
    ? []
    : finalScatterDataFormatHelper(expertsChartData) ?? [];

  return (
    <div className="px-3 pt-1 pb-3 rounded-lg border bg-white border-gray-200 shadow">
      <PageTitle
        title="Number of Experts and Researchers"
        info={`This list was extracted from "X" total number of experts and researchers worldwide`}
      />

      <div className="pt-1 flex justify-between items-center h-5">
        <div className="flex gap-x-3">
          {activeChart === "bar" && (
            <>
              <div className="flex gap-x-1 text-sm items-center">
                <div className="w-2 h-2 bg-primary-500 rounded-full" />
                <span>Open</span>
              </div>

              <div className="flex gap-x-1 text-sm items-center">
                <div className="w-2 h-2 bg-primary-800 rounded-full" />
                <span>Closed</span>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center">
          <ChartButtons
            isMultiData={true}
            activeChart={activeChart}
            setActiveChart={setActiveChart}
          />
        </div>
      </div>

      {activeChart === "bar" && (
        <BarChart
          keys={["openExpertsCount", "closedExpertsCount"]}
          indexBy="year"
          legendY="Number of Experts"
          data={(isLoading ? [] : expertsChartData) ?? []}
        />
      )}

      {activeChart === "scatter" && (
        <ScatterChart
          data={finalScatterData}
          legendX="Year"
          legendY="Experts"
        />
      )}

      {activeChart === "donut" && (
        <RadialChart data={radialData} colors={["#7F4BD8", "#442873"]} />
      )}

      <div className="mt-4 text-sm">
        <span className="font-bold">"{expertsCount?.expertsCount ?? "-"}"</span>
        <span> </span>
        <span>
          total number of experts have published research studies in the past
        </span>
        <span> </span>
        <span className="font-semibold">{expertsCount?.yearsElapsed}</span>
        <span> </span>
        <span>years</span>
      </div>
    </div>
  );
}
