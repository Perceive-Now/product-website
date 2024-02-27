import { FunctionComponent, useEffect } from "react";
import HeatMap from "../../../@product/heat-map";
import DataSection from "../../../reusable/data-section";
import PageTitle from "../../../reusable/page-title";
import { useQuery } from "@tanstack/react-query";
import { getGeographicalDistributionInventors } from "../../../../utils/api/charts";

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
export const GeographicalDistributionInventors: FunctionComponent<Props> = ({ keywords }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["geographic_applicant", ...keywords],
    async () => {
      return await getGeographicalDistributionInventors(keywords);
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
      if (!transformedData[entry.country]) {
        transformedData[entry.country] = { id: entry.country, data: [] };
      }

      if (entry.year && entry.count && transformedData[entry.country]) {
        transformedData[entry.country].data.push({
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
          <PageTitle
            // info={`This geographical heat map network was extracted from "X" no of publications and "Y" no of patents`}
            titleClass="font-bold"
            title="11. Geographical Distribution of Inventors"
          />
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
              {/* <h6 className="font-semibold text-primary-900">
                Family A: California (100 patents), Texas (50 patents); Family B: New York (80
                patents), Florida (70 patents)
              </h6> */}
              <ul className="list-disc ml-3 text-sm mt-1 font-medium">
                <li>
                  Top Country for Inventor Activity: "Country H leads in inventor activity,
                  contributing to X% of all patent filings, showcasing its pivotal role in global
                  innovation."
                </li>
                <li>
                  Rapid Increase in Inventor Numbers by Region: "Region I's inventor count has
                  surged by X% in the last Y years, emerging as a significant innovation hub."
                </li>
                <li>
                  City with Highest Number of Inventors: "City J has the highest concentration of
                  inventors, with X% of the total, underlining its status as a central innovation
                  locality."
                </li>
                <li>
                  Shift in Inventor Geographical Distribution: "Over the past decade, there has been
                  a notable shift towards Region K for inventor activity, with a growth rate of X%,
                  indicating evolving innovation ecosystems."
                </li>
                <li>
                  International Diversity Among Inventors: "The diversity of patent inventors is
                  vast, with contributions from over X different countries, highlighting the global
                  collaboration in innovation."
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DataSection>
    </div>
  );
};
