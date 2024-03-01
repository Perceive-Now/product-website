import { FunctionComponent, useEffect } from "react";
import DataSection from "../../../reusable/data-section";
import { useQuery } from "@tanstack/react-query";
import { getExamincationTrend } from "../../../../utils/api/charts";
import PageTitle from "../../../reusable/page-title";
import ScatterChart from "../../../@product/scatter-chart";

interface Props {
  keywords: string[];
}

interface IScholaryPublicationData {
  grant_days: number;
  years: number;
}

interface IScatterItem {
  x: number;
  y: number;
}

interface IScatterList {
  id: string;
  data: IScatterItem[];
}

export const TrendExaminationYear: FunctionComponent<Props> = ({ keywords }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["patents-year-e", ...keywords],
    async () => {
      return await getExamincationTrend(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  //
  const finalScatterDataFormatHelper = (data: IScholaryPublicationData[]) => {
    if (!data) return [];

    const openAccessCountObj: IScatterList = { id: "Stage", data: [] };
    let openAccessData: IScatterItem[] = [];
    //
    data.forEach((d) => {
      openAccessData.push({ x: d.years, y: d.grant_days });
    });

    // For checking and sorting past 10years
    const uniqueYears = Array.from(new Set(openAccessData.map((entry) => entry.x)));
    const sortedYears = uniqueYears.sort((a, b) => b - a);
    const recentYears = sortedYears.slice(0, 10);
    //

    // filter
    openAccessData = openAccessData.filter((item) => recentYears.includes(item.x));
    openAccessCountObj.data = openAccessData.slice(0, 10);
    //
    return [openAccessCountObj];
  };

  const scatterChartData = finalScatterDataFormatHelper(data ?? []);

  return (
    <div className="border-gray-200 shadow-custom border px-2 pt-2 pb-4 w-full space-y-2">
      <DataSection
        keywords={keywords}
        isLoading={isLoading}
        isError={isError}
        error={error}
        title={
          <PageTitle titleClass="font-bold" title="8. Trends in Examination Times Over Years" />
        }
      >
        <div>
          {data && (
            <ScatterChart
              data={scatterChartData}
              // legendX="Year"
              legendY="Average days to grant patents"
              // abbreviateLegendX={true}
              colors={["#7F4BD8", "#442873"]}
            />
          )}
          <div className="space-y-2 text-secondary-800 mt-4">
            <h5 className="font-bold text-primary-900 text-lg">Key takeaways</h5>
            <div>
              <h6 className="font-semibold text-primary-900">
                Family A: California (100 patents), Texas (50 patents); Family B: New York (80
                patents), Florida (70 patents)
              </h6>
              <ul className="list-disc ml-3 text-sm mt-1 font-medium">
                <li>
                  Reduction in Average Examination Time: "The average time to examine a patent has
                  decreased by X% over the last Y years, improving the patent examination process
                  efficiency."
                </li>
                <li>
                  Year with Shortest Examination Time: "Year Z recorded the shortest average
                  examination time of X days, indicating an efficient operational period."
                </li>
                <li>
                  Trend of Increasing/Decreasing Examination Times: "Examination times have shown a
                  trend of decreasing by an average of X days per year over the last decade."
                </li>
                <li>
                  Impact of Technological Advances on Examination Times: "The introduction of new
                  examination technologies in year Y contributed to a reduction in average
                  examination time by X%."
                </li>
                <li>
                  Comparison of Examination Times Across Decades: "The 2010s saw a X% decrease in
                  average examination times compared to the 2000s, highlighting process
                  improvements."
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DataSection>
    </div>
  );
};
