import { FunctionComponent, useEffect } from "react";
import DataSection from "../../../reusable/data-section";
import PageTitle from "../../../reusable/page-title";
import { useQuery } from "@tanstack/react-query";
import { getPatentFamilySize } from "../../../../utils/api/charts";
import ScatterChart from "../../../@product/scatter-chart";

interface Props {
  keywords: string[];
}

interface IScatterItem {
  x: number;
  y: number;
}

interface IScatterList {
  id: string;
  data: IScatterItem[];
}

interface IScholaryPublicationData {
  family_size: number;
  year: number;
}

export const InventorAnalysis: FunctionComponent<Props> = ({ keywords }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["inventor_analysis", ...keywords],
    async () => {
      return await getPatentFamilySize(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  const finalScatterDataFormatHelper = (data: IScholaryPublicationData[]) => {
    if (!data) return [];

    const openAccessCountObj: IScatterList = { id: "Stage", data: [] };
    let openAccessData: IScatterItem[] = [];
    //
    data.forEach((d) => {
      openAccessData.push({ x: d.year, y: d.family_size });
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
          // info={`This geographical hLegal Status of Patentseat map network was extracted from "X" no of publications and "Y" no of patents`}
          titleClass="font-bold"
          title="2. Patent Families"
          subTitle="Size of Patent Families Over Time"
          // subTitle="Top 5 Inventors"
          // sideTitleOption={
          //   <RadioButtons
          //     options={[
          //       { label: "Industries", value: "Industry" },
          //       { label: "Universities", value: "Academic" },
          //     ]}
          //     activeMode={currentMode}
          //     handleModeChange={handleModeChange}
          //   />
          // }
        />
      }
    >
      <div className="space-y-2 text-secondary-800 mt-4">
        {/* {data && ( */}
        {data && <ScatterChart data={scatterChartData} colors={["#7F4BD8", "#442873"]} />}

        {/* <BarChart
            data={barChartData}
            keys={["value"]}
            indexBy="label"
            groupMode="stacked"
            legendY="Average family size (n)"
            legendX="Year"
            legends="legend"
          /> */}
        <h5 className="font-bold text-primary-900 text-lg">Key takeaways</h5>
        <div>
          <h6 className="font-semibold text-primary-900">
            Patent ID 001: 5 references, Patent ID 002: 3 references, Patent ID 003: 7 references
          </h6>
          <ul className="list-disc ml-3 text-sm mt-1 font-medium">
            <li>
              Growth Rate of Patent Family Size: Average size of patent families each year, with
              changes indicating trends in protection scope, e.g., "Average family size increased by
              X% over the last Y years."
            </li>
            <li>
              Market Share of Large Patent Families: Proportion of large patent families (e.g.,
              those with more than 10 related documents) in the total, suggesting, "Large families
              represent X% of the total, indicating strategic depth in filings."
            </li>
            <li>
              Sector Analysis of Patent Family Sizes: Average patent family size within key sectors,
              e.g., "The pharmaceutical sector shows an average family size of X, highlighting
              extensive global protection efforts."
            </li>
            <li>
              Temporal Stability of Patent Families: Stability of family sizes over time, with
              significant variations suggesting shifts in filing strategies, e.g., "Variability in
              family size increased by X% from decade Y to Z."
            </li>
            <li>
              Geographical Distribution of Patent Family Sizes: Regional differences in patent
              family sizes, indicating, "Region A's patent families are X% larger than the global
              average, suggesting focused innovation protection efforts."
            </li>
          </ul>
        </div>
      </div>
    </DataSection>
  );
};
