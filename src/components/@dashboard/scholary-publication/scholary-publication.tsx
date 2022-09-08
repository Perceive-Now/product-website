import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import BarChart from "../../@product/bar-chart";
import PageTitle from "../../reusable/page-title";
import ChartButtons from "../../reusable/chart-buttons";

//
import { getPublicationsCount } from "../../../utils/api/dashboard";
import { getScholaryPublications } from "../../../utils/api/charts";

//
import { ChartType } from "../../reusable/chart-buttons";

/**
 *
 */
export default function ScholaryPublication() {
  const [activeChart, setActiveChart] = useState<ChartType>("bar");
  const colors = ["#7F4BD8", "#442873"];

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

  return (
    <div className="px-3 pt-1 pb-3 rounded-lg border bg-white border-gray-200 shadow">
      <PageTitle title="Scholarly Publications" info="info" />

      <div className="pt-1 flex justify-between items-center h-5">
        <div className="flex gap-x-3">
          <div className="flex gap-x-1 text-sm items-center">
            <div className="w-2 h-2 bg-primary-500 rounded-full" />
            <span>Open</span>
          </div>

          <div className="flex gap-x-1 text-sm items-center">
            <div className="w-2 h-2 bg-primary-800 rounded-full" />
            <span>Closed</span>
          </div>
        </div>

        <div className="flex items-center">
          <ChartButtons
            activeChart={activeChart}
            setActiveChart={setActiveChart}
          />
        </div>
      </div>

      <BarChart
        keys={["openArticles", "closedArticles"]}
        indexBy="year"
        legendY="Number of Publications"
        data={(isLoading ? [] : publicationChartData) ?? []}
        colors={colors}
      />

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
