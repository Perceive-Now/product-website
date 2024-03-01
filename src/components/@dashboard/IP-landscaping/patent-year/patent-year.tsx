import { FunctionComponent, useEffect } from "react";
import DataSection from "../../../reusable/data-section";
import { useQuery } from "@tanstack/react-query";
import { getPatentsYearly } from "../../../../utils/api/charts";
import PageTitle from "../../../reusable/page-title";
import ScatterChart from "../../../@product/scatter-chart";

interface Props {
  keywords: string[];
}

interface IScholaryPublicationData {
  count: number;
  year: number;
}

interface IScatterItem {
  x: number;
  y: number;
}

interface IScatterList {
  id: string;
  data: IScatterItem[];
}

export const PatentYear: FunctionComponent<Props> = ({ keywords }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["patents-year", ...keywords],
    async () => {
      return await getPatentsYearly(keywords);
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
      openAccessData.push({ x: d.year, y: d.count });
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
        title={<PageTitle titleClass="font-bold" title="1. Total Patents Filed Over Time" />}
      >
        <div>
          {data && <ScatterChart data={scatterChartData} colors={["#7F4BD8", "#442873"]} />}
          <div className="space-y-2 text-secondary-800 mt-4">
            <h5 className="font-bold text-primary-900 text-lg">Key takeaways</h5>
            <div>
              <h6 className="font-semibold text-primary-900">
                Family A: California (100 patents), Texas (50 patents); Family B: New York (80
                patents), Florida (70 patents)
              </h6>
              <ul className="list-disc ml-3 text-sm mt-1 font-medium">
                <li>
                  Annual Patent Filing Trend: The total number of patents filed each year, with
                  year-over-year growth rates indicating innovation trends. For instance, a YOY
                  growth rate of X% suggests increasing/decreasing innovation activities.
                </li>
                <li>
                  Market Share of Patent Filings by Sector: Identification of sectors contributing
                  most to patent filings, e.g., "Technology sector accounts for X% of total filings
                  in year Y," highlighting sectoral innovation focus.
                </li>
                <li>
                  Comparison of Patent Filings Across Decades: Contrast in patent filing volumes
                  across different decades, showing shifts in innovation intensity, e.g., "Filings
                  in the 2010s increased by X% compared to the 2000s."
                </li>
                <li>
                  Impact of Legislative Changes on Patent Filings: Analysis of filing trends before
                  and after significant patent law changes, e.g., "Patent filings increased by X%
                  following the introduction of the America Invents Act."
                </li>
                <li>
                  Patent Filing Patterns Related to Economic Cycles: Correlation between economic
                  indicators and patent filings, suggesting, "During economic upturns/downturns,
                  patent filings increase/decrease by X%."
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DataSection>
    </div>
  );
};
