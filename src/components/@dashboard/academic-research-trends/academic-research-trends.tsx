import { useState } from "react";
import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";

//
import BarChart from "../../@product/bar-chart";
import PageTitle from "../../reusable/page-title";
import TimePeriod from "../../reusable/time-period";
import ChartButtons from "../../reusable/chart-buttons";
import { ChartType } from "../../reusable/chart-buttons/chart-button/chart-button";
import { timeperiod } from "../academic-research-fundings/academic-research-fundings";

/**
 *
 */
export default function AcademicResearchTrends() {
  const [activeChart, setActiveChart] = useState<ChartType>("bar");
  const [data, setData] = useState([
    { patents: 4100, closedArticles: 7900, openArticles: 9700, city: "NE" },
    { patents: 4200, closedArticles: 2400, openArticles: 4700, city: "SE" },
    { patents: 2400, closedArticles: 5100, openArticles: 5800, city: "MW" },
    { patents: 8100, closedArticles: 9200, openArticles: 6100, city: "NW" },
    { patents: 2400, closedArticles: 8000, openArticles: 5900, city: "SW" },
  ]);

  //   const { data, isLoading } = useQuery(
  //     ["dashboard-academin-research-trend"],
  //     async () => {
  //       //
  //     }
  //   );

  return (
    <div className="px-3 pt-1 pb-3 rounded-lg border bg-white border-gray-200 shadow">
      <PageTitle title="Academic Research Trends" info="info" />

      <div className="pt-1 flex justify-end gap-x-3">
        <div>
          <TimePeriod timePeriods={timeperiod} />
        </div>

        <div className="flex items-center">
          <ChartButtons
            activeChart={activeChart}
            setActiveChart={setActiveChart}
          />
        </div>
      </div>

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
        keys={["patents", "openArticles", "closedArticles"]}
        indexBy="city"
        legendY="Number of Publications"
        data={data ?? []}
      />

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
