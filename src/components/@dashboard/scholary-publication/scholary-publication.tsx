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
import { getPublicationsCount } from "../../../utils/api/dashboard";
import { getScholaryPublications } from "../../../utils/api/charts";

//

/**
 *
 */
export default function ScholaryPublication() {
  const [activeChart, setActiveChart] = useState<ChartType>("bar");

  const { data: publicationChartData, isLoading } = useQuery(
    ["scholary-publications"],
    async () => {
      return await getScholaryPublications();
    }
  );

  const { data: publicationCount } = useQuery(
    ["scholarly-publications-count-for-chart"],
    async () => {
      return await getPublicationsCount();
    }
  );

  //
  const finalPieData = isLoading ? [] : publicationChartData ?? [];

  const radialData = finalPieData
    .map((itm) => itm.year)
    .map((itm) => {
      const data = finalPieData.find((it) => it.year === itm)!;

      const total = data.openArticles + data.closedArticles;
      const openPercentage = (data.openArticles / total) * 100;
      const closedPercentage = (data.closedArticles / total) * 100;

      return {
        id: itm,
        data: [
          { x: "Open Articles", y: openPercentage, value: data.openArticles },
          {
            x: "Closed Articles",
            y: closedPercentage,
            value: data.closedArticles,
          },
        ],
      };
    });

  const finalScatterDataFormatHelper = (data: any) => {
    if (!data) return [];

    let closedArticlesObj = { id: "Closed Articles", data: [] };
    let openArticlesObj = { id: "Open Articles", data: [] };

    let closedArticlesData: any = [];
    let openArticlesData: any = [];

    data.forEach((d: any) => {
      closedArticlesData = [
        ...closedArticlesData,
        { x: d.year, y: d.closedArticles },
      ];
      openArticlesData = [
        ...openArticlesData,
        { x: d.year, y: d.openArticles },
      ];
    });

    closedArticlesObj.data = closedArticlesData;
    openArticlesObj.data = openArticlesData;

    return [closedArticlesObj, openArticlesObj];
  };

  const finalScatterData = isLoading
    ? []
    : finalScatterDataFormatHelper(publicationChartData) ?? [];

  //
  return (
    <div className="px-3 pt-1 pb-3 rounded-lg border bg-white border-gray-200 shadow">
      <PageTitle
        title="Scholarly Publications"
        info={`Stats in this graph are extracted from a total of "X" number of open access publications and "Y" number of closed access publications`}
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
            activeChart={activeChart}
            setActiveChart={setActiveChart}
            isMultiData={true}
          />
        </div>
      </div>

      {activeChart === "bar" && (
        <BarChart
          keys={["openArticles", "closedArticles"]}
          indexBy="year"
          legendY="Number of Publications"
          data={(isLoading ? [] : publicationChartData) ?? []}
        />
      )}

      {activeChart === "scatter" && (
        <ScatterChart
          data={finalScatterData}
          legendX="Year"
          legendY="Publications"
        />
      )}

      {activeChart === "donut" && (
        <RadialChart data={radialData} colors={["#7F4BD8", "#442873"]} />
      )}

      <div className="mt-4 text-sm">
        <span className="font-bold">
          "{publicationCount?.totalPublicationsCount ?? "-"}"
        </span>
        <span> </span>
        <span>total number of publications was published in the past</span>
        <span> </span>
        <span className="font-semibold">{publicationCount?.yearsElapsed}</span>
        <span> </span>
        <span>years</span>
      </div>
    </div>
  );
}
