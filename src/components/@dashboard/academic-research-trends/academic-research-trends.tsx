import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//
import BarChart from "../../@product/bar-chart";
import RadialChart from "../../@product/radial-chart";

//
import PageTitle from "../../reusable/page-title";
import TimePeriod from "../../reusable/time-period";
import ChartButtons, { ChartType } from "../../reusable/chart-buttons";

//
import { TIME_PERIODS } from "../../../utils/constants";
import { getAcademicResearchTrends } from "../../../utils/api/charts";

/**
 *
 */
export default function AcademicResearchTrends() {
  const [activeChart, setActiveChart] = useState<ChartType>("bar");

  const { data, isLoading } = useQuery(
    ["dashboard-academic-research-trend"],
    async () => {
      return await getAcademicResearchTrends();
    }
  );

  //
  const finalData = isLoading ? [] : data?.chart ?? [];

  //
  const finalPieData = isLoading ? [] : data?.chart ?? [];

  const radialData = finalPieData
    .map((itm) => itm.locationName)
    .map((itm) => {
      const data = finalPieData.find((it) => it.locationName === itm)!;

      const total =
        data.openArticlesCount + data.closedArticlesCount + data.patentsCount;
      const openPercentage = (data.openArticlesCount / total) * 100;
      const closedPercentage = (data.closedArticlesCount / total) * 100;
      const patentsPercentage = (data.patentsCount / total) * 100;

      return {
        id: itm,
        data: [
          {
            x: "Patents",
            y: patentsPercentage,
            value: data.patentsCount,
          },
          {
            x: "Open Articles",
            y: openPercentage,
            value: data.openArticlesCount,
          },
          {
            x: "Closed Articles",
            y: closedPercentage,
            value: data.closedArticlesCount,
          },
        ],
      };
    });

  return (
    <div className="px-3 pt-1 pb-3 rounded-lg border bg-white border-gray-200 shadow">
      <PageTitle
        title="Academic Research Trends"
        info={`This list was extracted from "X" total number of universities worldwide`}
      />

      <div className="pt-1 flex justify-end items-center gap-x-3">
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
        <>
          <div className="flex justify-end gap-x-3 pt-1 -mb-3">
            <div className="flex gap-x-1 text-sm items-center">
              <div className="w-2 h-2 bg-primary-100 rounded-full" />
              <span>Patents</span>
            </div>

            <div className="flex gap-x-1 text-sm items-center">
              <div className="w-2 h-2 bg-primary-500 rounded-full" />
              <span>Open</span>
            </div>

            <div className="flex gap-x-1 text-sm items-center">
              <div className="w-2 h-2 bg-primary-800 rounded-full" />
              <span>Closed</span>
            </div>
          </div>

          <BarChart
            keys={["patentsCount", "openArticlesCount", "closedArticlesCount"]}
            indexBy="locationName"
            legendY="Number of Publications"
            data={finalData}
          />
        </>
      )}

      {activeChart === "donut" && <RadialChart data={radialData} />}

      <div className="mt-4">
        <span>
          A total of "X" number of publications and "Y" number of patents were
          published in the past 5 years in academia
        </span>
        <span className="ml-1">
          <Link to="#">Read More</Link>
        </span>
      </div>
    </div>
  );
}
