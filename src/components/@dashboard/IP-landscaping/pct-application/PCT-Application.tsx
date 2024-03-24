import { useEffect } from "react";
import DataSection from "../../../reusable/data-section";
import { useQuery } from "@tanstack/react-query";
import { getPCTApplication } from "../../../../utils/api/charts";
import PageTitle from "../../../reusable/page-title";
import ScatterChart from "../../../@product/scatter-chart";

interface Props {
  keywords: string[];
}

interface IPCT {
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

export function PCTApplication({ keywords }: Props) {
  const { data, isLoading, isError, error } = useQuery(
    ["pct-application", ...keywords],
    async () => {
      return await getPCTApplication(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  //
  const finalScatterDataFormatHelper = (data: IPCT[]) => {
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
    <DataSection
      keywords={keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle
          titleClass="font-bold"
          subTitle="Trends in PCT Applications Over Time"
          title="9. PCT"
        />
      }
    >
      <div>
        {/* {data && ( */}
        <ScatterChart
          data={scatterChartData}
          // legendX="Year"
          legendY="No. of applications"
          // abbreviateLegendX={true}
          colors={["#7F4BD8", "#442873"]}
        />
        {/* )} */}
        <div className="space-y-2 text-secondary-800 mt-4">
          <h5 className="font-bold text-primary-900 text-lg">Key takeaways</h5>
          <div>
            <h6 className="font-semibold text-primary-900">
              Family A: California (100 patents), Texas (50 patents); Family B: New York (80
              patents), Florida (70 patents)
            </h6>
            <ul className="list-disc ml-3 text-sm mt-1 font-medium">
              <li>
                Annual Growth in PCT Applications: "PCT applications have witnessed an annual growth
                rate of X% over the last Y years, indicating an increasing preference for
                international patent protection."
              </li>
              <li>
                Year with Highest Number of PCT Applications: "The year Z saw a record number of PCT
                applications, totaling X, highlighting a peak year for global patent filing
                activities."
              </li>
              <li>
                Decade Comparison of PCT Filings: "Comparing the last two decades, there has been an
                increase of X% in PCT filings, showcasing a growing trend towards internationalizing
                patent protection."
              </li>
              <li>
                Average Annual Increase in PCT Applications: "The average annual increase in PCT
                applications has been X%, demonstrating a steady rise in the pursuit of
                international patent protection strategies."
              </li>
              <li>
                Impact of Global Events on PCT Applications: "Following the event A in year B, there
                was a noticeable increase/decrease in PCT applications by X%, reflecting the global
                impact on patent filing strategies."
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DataSection>
  );
}
