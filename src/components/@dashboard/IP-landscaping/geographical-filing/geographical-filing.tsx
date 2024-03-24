import { FunctionComponent, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

//
import DataSection from "../../../reusable/data-section";
import PageTitle from "../../../reusable/page-title";

//
import { getGeoFiling } from "../../../../utils/api/charts";
//
import StatesCodes from "../../../../utils/extra/us-states-codes";
//
import USMap from "../../../@product/us-map";

interface Props {
  keywords: string[];
}

// interface ITransformedData {
//   [wipo_field_title: string]: ITransformedEntry;
// }

// interface ITransformedEntry {
//   id: string | number;
//   data: { x: any; y: number | null }[];
// }

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
        <PageTitle
          titleClass="font-bold"
          // title="4. Geographical Distribution of Patent Families"
          subTitle="Geographical Distribution of Patent Families"
        />
      }
    >
      <div className="space-y-2 text-secondary-800 mt-4">
        {/* <HeatMap
          data={tree_data}
          legendY={"Year"}
          legentType="legend"
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
        /> */}
        {data && <USMap data={mapData} type={"heatmap_industry"} />}

        <h5 className="font-bold text-primary-900 text-lg">Key takeaways</h5>
        <div>
          <ul className="list-disc ml-3 text-sm mt-1 font-medium">
            <li>
              Regional Market Share of Patent Families: The concentration of patent families by
              region, e.g., "Region A accounts for X% of global patent families, indicating a major
              innovation hub."
            </li>
            <li>
              Growth Trends in Regional Patent Family Concentrations: Year-over-year growth in
              patent family concentrations by region, e.g., "Region B's share of global patent
              families grew by X% in the last Y years."
            </li>
            <li>
              Comparison of Urban vs. Rural Patent Family Distributions: The disparity in patent
              family locations, suggesting, "Urban areas account for X% of patent families, compared
              to Y% in rural areas."
            </li>
            <li>
              Impact of Regulatory Changes on Geographical Distribution: Shifts in patent family
              concentrations following major patent policy changes, indicating, "Following policy
              change X, region C saw a Y% increase in patent family concentration."
            </li>
            <li>
              International Collaboration Indicated by Patent Family Locations: Instances of
              international patent families, with metrics like, "X% of patent families have members
              in more than one country, indicating high levels of international collaboration."
            </li>
          </ul>
        </div>
      </div>
    </DataSection>
  );
};
