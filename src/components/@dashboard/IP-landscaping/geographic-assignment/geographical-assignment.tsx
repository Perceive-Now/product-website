import { FunctionComponent, useEffect } from "react";
import HeatMap from "../../../@product/heat-map";
import DataSection from "../../../reusable/data-section";
import PageTitle from "../../../reusable/page-title";
import { useQuery } from "@tanstack/react-query";
import { getGeographicalDistributionAssignment } from "../../../../utils/api/charts";
import countryNames from "../../../../utils/extra/country-2-names";

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
export const GeographicalDistributionAssignment: FunctionComponent<Props> = ({ keywords }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["geographical_assignments", ...keywords],
    async () => {
      return await getGeographicalDistributionAssignment(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  const transformedData: ITransformedData = {};
  const dataItems = data?.map((d) => ({
    country: countryNames[d.country],
    year: d.year,
    count: d.count,
  }));

  dataItems &&
    dataItems.forEach((entry) => {
      if (!transformedData[entry.country]) {
        transformedData[entry.country] = { id: entry.country, data: [] };
      }

      if (entry.year && entry.count && transformedData[entry.country]) {
        transformedData[entry.country].data.push({
          x: entry.year,
          y: entry.count > 0 ? entry.count : 0,
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

    const newData = inputData.map((entry) => {
      const newDataPoints = recentYears.map((year) => {
        const existingDataPoint = entry.data.find((item) => item.x === year);
        return existingDataPoint ? existingDataPoint : { x: year, y: 0 }; // If year doesn't exist, create a new data point with value 0
      });

      return { ...entry, data: newDataPoints };
    });

    return newData;

    // inputData.forEach((entry) => {
    //   // Filter data to include only the recent five years
    //   entry.data = entry.data.filter((item) => recentYears.includes(item.x));
    // });

    // console.log(inputData)

    // const sortedData = inputData.sort((a, b) => a.id.localeCompare(b.id));

    // return inputData;
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
          <PageTitle titleClass="font-bold" title="10. Geographical Distribution of Assignments" />
        }
      >
        <div>
          <HeatMap
            data={finalData}
            legendY={"Year"}
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
                  Country Leading in Patent Assignments: "Country D holds the highest number of
                  patent assignments, accounting for X% of the global total, marking it as a key
                  player in technology transfer."
                </li>
                <li>
                  Regional Growth in Patent Assignments: "Region E saw a X% increase in patent
                  assignments over the last Y years, indicating a surge in its technological
                  development."
                </li>
                <li>
                  City-Level Concentration of Patent Assignments: "City F is the leading city for
                  patent assignments, with X% of the total, highlighting its strategic importance in
                  innovation and technology commercialization."
                </li>
                <li>
                  Shifts in Geographical Patterns of Assignments: "The geographical pattern of
                  patent assignments has shifted towards Country G in the recent decade, with an
                  increase of X%, reflecting changes in global innovation dynamics."
                </li>
                <li>
                  International Collaboration in Patent Assignments: "X% of all patent assignments
                  involve international collaboration, demonstrating the global interconnectedness
                  of technology development and transfer."
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DataSection>
    </div>
  );
};
