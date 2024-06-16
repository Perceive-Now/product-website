import { FunctionComponent, useEffect } from "react";
import HeatMap from "../../../@product/heat-map";
import DataSection from "../../../reusable/data-section";
import PageTitle from "../../../reusable/page-title";
import { useQuery } from "@tanstack/react-query";
import { getGeographicalDistributionAssignment } from "../../../../utils/api/charts";
import countryNames from "../../../../utils/extra/country-2-names";
import GeographicalDistributionAssignmentTakeaways from "../../../../pages/product/ip-landscaping/keytakeaways/assignees/distribution-assignment/keytakeaway";

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
    <DataSection
      keywords={keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle titleClass="font-bold" subTitle="Geographical Distribution of Assignments" />
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
        <div className="mt-4">
          {data && <GeographicalDistributionAssignmentTakeaways data={data} />}
        </div>
      </div>
    </DataSection>
  );
};
