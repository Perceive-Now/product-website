/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent, useEffect } from "react";
import BarChart from "../../../@product/bar-chart";
import DataSection from "../../../reusable/data-section";
import { useQuery } from "@tanstack/react-query";
import { getPatentCompetitorPortfolio } from "../../../../utils/api/charts";
import PageTitle from "../../../reusable/page-title";
import ScrollableBarChart from "../../../@product/bar-scroll";

interface Props {
  keywords: string[];
}

// interface IScholaryPublicationData {
//   count: number;
//   year: number;
// }

// interface IScatterItem {
//   x: number;
//   y: number;
// }

// interface IScatterList {
//   id: string;
//   data: IScatterItem[];
// }

// type IYear = "1st5year" | "2nd5year";

export const PatentAssignment: FunctionComponent<Props> = ({ keywords }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["patents-portfolio1", ...keywords],
    async () => {
      return await getPatentCompetitorPortfolio(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  //
  // const finalScatterDataFormatHelper = (data: IScholaryPublicationData[]) => {
  //   if (!data) return [];

  //   const openAccessCountObj: IScatterList = { id: "Stage", data: [] };
  //   let openAccessData: IScatterItem[] = [];
  //   //
  //   data.forEach((d) => {
  //     openAccessData.push({ x: d.year, y: d.count });
  //   });

  //   // For checking and sorting past 10years
  //   const uniqueYears = Array.from(
  //     new Set(openAccessData.map((entry) => entry.x))
  //   );
  //   const sortedYears = uniqueYears.sort((a, b) => b - a);
  //   const recentYears = sortedYears.slice(0, 10);
  //   //

  //   // filter
  //   openAccessData = openAccessData.filter((item) => recentYears.includes(item.x));
  //   openAccessCountObj.data = openAccessData.slice(0, 10);
  //   //
  //   return [openAccessCountObj];
  // };

  // const scatterChartData = finalScatterDataFormatHelper(data ?? []);

  const finalData = data && data.map((item) => ({ label: item.org, value: item.count }));

  return (
    <DataSection
      keywords={keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle
          titleClass="font-bold"
          title="5. Assignees"
          subTitle="Top Organizations by Number of Patent Assignments"
        />
      }
    >
      <div>
        {data && (
          <ScrollableBarChart
            data={finalData} // data={{
            //   keys: ["count"],
            //   data: finalData as any
            // }}
            // keys={["count"]}
            // indexBy="label"
            // groupMode="stacked"
            // legendY="No. of assignment"
            // legendX="Organizations"
            // innerPadding={0}
            // borderRadius={4}
            // legends={"range"}
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
                Leading Organization in Patent Assignments: "Organization A leads with X% of all
                patent assignments, indicating its dominant position in innovation."
              </li>
              <li>
                Growth in Patent Assignments for Top Organizations: "The top X organizations saw a
                Y% increase in patent assignments over the last Z years, showing their growing
                influence in technology development."
              </li>
              <li>
                Organization with Largest Year-on-Year Increase: "Organization B experienced the
                largest year-on-year increase in patent assignments, with a growth rate of X%,
                highlighting its rapid expansion in innovation activities."
              </li>
              <li>
                Comparison of Market Share Among Top Organizations: "The market share of patent
                assignments among the top X organizations has become more concentrated, with the top
                3 holding Y% of total assignments."
              </li>
              <li>
                Sector Dominance by Organization: "In the renewable energy sector, Organization C
                accounts for X% of patent assignments, underlining its leadership in this innovation
                area."
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DataSection>
  );
};
