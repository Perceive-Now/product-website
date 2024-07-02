import { FunctionComponent, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

//
import DataSection from "../../reusable/data-section";
import PageTitle from "../../reusable/page-title";

//
import { getGeoFiling } from "../../../utils/api/charts";
//
import StatesCodes from "../../../utils/extra/us-states-codes";
//
import USMap from "../../@chart/us-map";
import GeographicalDistributionPatentKeyTakeaway from "../../../pages/product/analytics/keytakeaways/patent-families/geographical";

//
interface Props {
  keywords: string[];
}

/**
 *
 */
export const GeographicalDistributionFiling: FunctionComponent<Props> = ({ keywords }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["geographical-filing", ...keywords],
    async () => {
      return await getGeoFiling(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  const mapData = (data ?? []).map((item) => ({
    country: StatesCodes[item.state],
    patents: item.count,
  }));

  // console.log(mapData)

  // const dataItems = data?.map((d) => ({
  //   country: countryNames[d.country],
  //   year: d.state,
  //   count: d.count,
  // }));

  // const transformedData: ITransformedData = {};
  // const transformedDataReverse: ITransformedData = {};

  // dataItems &&
  //   dataItems.forEach((entry) => {
  //     if (!transformedData[entry.country]) {
  //       transformedData[entry.country] = { id: entry.country, data: [] };
  //     }

  //     if (entry.year && entry.count && transformedData[entry.country]) {
  //       transformedData[entry.country].data.push({
  //         x: entry.year,
  //         y: entry.count,
  //       });
  //     }
  //   });

  // data &&
  //   data.forEach((entry) => {
  //     if (!transformedDataReverse[entry.state]) {
  //       transformedDataReverse[entry.state] = { id: entry.state, data: [] };
  //     }

  //     if (entry.state && entry.count && transformedDataReverse[entry.state]) {
  //       transformedDataReverse[entry.state].data.push({
  //         x: entry.country,
  //         y: entry.count,
  //       });
  //     }
  //   });

  // const tree_data = Object.values(transformedData);

  // console.log(dt)
  // console.log(tree_data)
  // const tree_data_reverse = Object.values(transformedDataReverse);

  // const transformData = (inputData: ITransformedEntry[]) => {
  //   // Collect all unique years from the existing data
  //   const uniqueYears = Array.from(
  //     new Set(inputData.flatMap((entry) => entry.data.map((item) => item.x))),
  //   );

  //   // Sort the years in descending order
  //   const sortedYears = uniqueYears.sort((a, b) => b - a);

  //   // Include only the recent five years
  //   const recentYears = sortedYears.slice(0, 5);

  //   const newData = inputData.map((entry) => {
  //     const newDataPoints = recentYears.map((year) => {
  //       const existingDataPoint = entry.data.find((item) => item.x === year);
  //       return existingDataPoint ? existingDataPoint : { x: year, y: 0 }; // If year doesn't exist, create a new data point with value 0
  //     });

  //     return { ...entry, data: newDataPoints };
  //   });

  //   return newData;
  // };

  // const finalData = transformData(tree_data);
  // const finalDataReverse = transformDataRev

  return (
    <DataSection
      keywords={keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle titleClass="font-bold" subTitle="Geographical Distribution of Patent Families" />
      }
    >
      <div className="mt-4">
        {data && <USMap data={mapData} type={"heatmap_industry"} />}

        {data && <GeographicalDistributionPatentKeyTakeaway patentLocation={data} />}
      </div>
    </DataSection>
  );
};
