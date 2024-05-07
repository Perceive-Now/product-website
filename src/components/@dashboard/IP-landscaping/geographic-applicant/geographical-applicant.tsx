/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent, useEffect } from "react";
import HeatMap from "../../../@product/heat-map";
import DataSection from "../../../reusable/data-section";
import PageTitle from "../../../reusable/page-title";
import { useQuery } from "@tanstack/react-query";
import { getGeographicDistributionApplicant } from "../../../../utils/api/charts";
import countryNames from "../../../../utils/extra/country-2-names";

interface Props {
  keywords: string[];
}

interface ITransformedData {
  [wipo_field_title: string]: ITransformedEntry;
}

interface ITransformedEntry {
  id: string | number;
  data: { x: any; y: number | null }[];
}

export const GeographicalDistributionApplicant: FunctionComponent<Props> = ({ keywords }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["geographical_inventors", ...keywords],
    async () => {
      return await getGeographicDistributionApplicant(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  const dataItems = data?.map((d) => ({
    country: countryNames[d.country],
    year: d.year,
    count: d.count,
  }));

  const transformedData: ITransformedData = {};
  const transformedDataReverse: ITransformedData = {};

  dataItems &&
    dataItems.forEach((entry) => {
      if (!transformedData[entry.country]) {
        transformedData[entry.country] = { id: entry.country, data: [] };
      }

      if (entry.year && entry.count && transformedData[entry.country]) {
        transformedData[entry.country].data.push({
          x: entry.year,
          y: entry.count,
        });
      }
    });

  data &&
    data.forEach((entry) => {
      if (!transformedDataReverse[entry.year]) {
        transformedDataReverse[entry.year] = { id: entry.year, data: [] };
      }

      if (entry.year && entry.count && transformedDataReverse[entry.year]) {
        transformedDataReverse[entry.year].data.push({
          x: entry.country,
          y: entry.count,
        });
      }
    });

  const tree_data = Object.values(transformedData);
  // const tree_data_reverse = Object.values(transformedDataReverse);

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
  };

  const finalData = transformData(tree_data);
  // const finalDataReverse = transformDataReverse(tree_data_reverse);

  return (
    <DataSection
      keywords={keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle titleClass="font-bold" subTitle="Geographical Distribution of Applicants" />
      }
    >
      <div>
        {/* <div>
          <HeatMap
            data={tree_data_reverse}
            legendY={"Year"}
            cell="circle"
            legentType="legend"
          />
        </div> */}
        {/* <div className="italic text-[36px] text-center my-2 font-normal">VS</div> */}
        <HeatMap
          data={finalData}
          legendY={"Year"}
          legentType="legend"
          // legend={[
          //   {
          //     anchor: "right",
          //     translateX: 60,
          //     translateY: -1,
          //     length: 500,
          //     thickness: 8,
          //     direction: "column",
          //     tickPosition: "after",
          //     tickSize: 3,
          //     tickSpacing: 4,
          //     tickOverlap: false,
          //     tickFormat: ">-.2s",
          //     title: "Growth rate",
          //     titleAlign: "end",
          //     titleOffset: 8,
          //   },
          // ]}
        />
      </div>
    </DataSection>
  );
};
