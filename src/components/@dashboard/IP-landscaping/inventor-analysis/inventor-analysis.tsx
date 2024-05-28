import { FunctionComponent, useEffect } from "react";
import DataSection from "../../../reusable/data-section";
import PageTitle from "../../../reusable/page-title";
import { useQuery } from "@tanstack/react-query";
import { getPatentFamilySize } from "../../../../utils/api/charts";
import ScatterChart from "../../../@product/scatter-chart";
import SizeOfPatentFamilyKeyTakeaway from "../../../../pages/product/ip-landscaping/keytakeaways/patent-families";

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
          titleClass="font-bold"
          title="2. Patent Families"
          subTitle="Size of Patent Families Over Time"
        />
      }
    >
      <div className="space-y-2 text-secondary-800 mt-4">
        {data && <ScatterChart data={scatterChartData} colors={["#7F4BD8", "#442873"]} />}
        <SizeOfPatentFamilyKeyTakeaway />
      </div>
    </DataSection>
  );
};
