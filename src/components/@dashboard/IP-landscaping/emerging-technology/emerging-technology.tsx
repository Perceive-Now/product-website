import { FunctionComponent, useEffect } from "react";
import HeatMap from "../../../@product/heat-map";
import DataSection from "../../../reusable/data-section";
import PageTitle from "../../../reusable/page-title";
import { useQuery } from "@tanstack/react-query";
import { getEmergingTechnologyTrend } from "../../../../utils/api/charts";

interface Props {
  keywords: string[];
}

interface ITransformedData {
  [wipo_field_title: string]: ITransformedEntry;
}

interface ITransformedEntry {
  id: string;
  data: { x: number; y: number | null }[];
}
export const EmergingTechnologyTrend: FunctionComponent<Props> = ({ keywords }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["emerging-technology-trend", ...keywords],
    async () => {
      return await getEmergingTechnologyTrend(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  const transformedData: ITransformedData = {};

  data &&
    data.forEach((entry) => {
      if (!transformedData[entry.wipo_field_title]) {
        transformedData[entry.wipo_field_title] = { id: entry.wipo_field_title, data: [] };
      }

      if (entry.year && entry.count && transformedData[entry.wipo_field_title]) {
        transformedData[entry.wipo_field_title].data.push({
          x: entry.year,
          y: entry.count,
        });
      }
      // Object.values(transformedData).forEach((entry) => {
      //   entry.data = entry.data.slice(0, 5);
      // });
    });

  const tree_data = Object.values(transformedData);

  // const transformData = (inputData: ITransformedEntry[]) => {
  //   // Collect all unique years from the existing data
  //   const uniqueYears = Array.from(
  //     new Set(inputData.flatMap((entry) => entry.data.map((item) => item.x))),
  //   );

  //   inputData.forEach((entry) => {
  //     // Check and add missing years
  //     uniqueYears.forEach((year) => {
  //       const existingYear = entry.data.find((item) => item.x === year);

  //       if (!existingYear) {
  //         entry.data.push({ x: year, y: null });
  //       }
  //     });
  //   });
  //   return inputData;
  // };

  // const finalData = transformData(tree_data);
  const transformData = (inputData: ITransformedEntry[]) => {
    // Collect all unique years from the existing data
    const uniqueYears = Array.from(
      new Set(inputData.flatMap((entry) => entry.data.map((item) => item.x))),
    );

    // Sort the years in descending order
    const sortedYears = uniqueYears.sort((a, b) => b - a);

    // Include only the recent five years
    const recentYears = sortedYears.slice(0, 5);

    inputData.forEach((entry) => {
      // Filter data to include only the recent five years
      entry.data = entry.data.filter((item) => recentYears.includes(item.x));
    });

    return inputData;
  };

  const finalData = transformData(tree_data);

  return (
    <div className="border-gray-200 shadow-custom border px-2 pt-2 pb-4 w-full space-y-2">
      <DataSection
        keywords={keywords}
        isLoading={isLoading}
        isError={isError}
        error={error}
        title={
          <PageTitle
            // info={`This geographical heat map network was extracted from "X" no of publications and "Y" no of patents`}
            titleClass="font-bold"
            title="9. Emerging Technology Trends (WIPO)"
          />
        }
      >
        <div>
          <HeatMap
            data={finalData.slice(0, 5)}
            legend={[
              {
                anchor: "right",
                translateX: 60,
                translateY: -1,
                length: 500,
                thickness: 8,
                direction: "column",
                tickPosition: "after",
                tickSize: 3,
                tickSpacing: 4,
                tickOverlap: false,
                tickFormat: ">-.2s",
                title: "Growth rate",
                titleAlign: "end",
                titleOffset: 8,
              },
            ]}
          />
          <div className="space-y-2 text-secondary-800 mt-4">
            <h5 className="font-bold text-primary-900 text-lg">Key takeaways</h5>
            <div>
              <h6 className="font-semibold text-primary-900">
                Family A: California (100 patents), Texas (50 patents); Family B: New York (80
                patents), Florida (70 patents)
              </h6>
              <ul className="list-disc ml-3 text-sm mt-1 font-medium">
                <li>
                  The wearable blood pressure sensor market is on a growth trajectory with a
                  projected Compound Annual Growth Rate (CAGR) of 8.5% over the next five years.
                  This could potentially elevate the market valuation from an estimated $1.5 billion
                  to over $2.25 billion by the end of the forecast period.
                </li>
                <li>
                  The driving factors behind this growth could be an increasing awareness of health
                  and fitness, aging population, and the advancement in wearable technology.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DataSection>
    </div>
  );
};
