import { useEffect } from "react";
import DataSection from "../../../reusable/data-section";
import { useQuery } from "@tanstack/react-query";
import { getPCTApplication } from "../../../../utils/api/charts";
import PageTitle from "../../../reusable/page-title";
import ScatterChart from "../../../@product/scatter-chart";

interface Props {
  keywords: string[];
}

interface IPCT {
  count: number;
  year: number;
}

interface IScatterItem {
  x: number;
  y: number;
}

interface IScatterList {
  id: string;
  data: IScatterItem[];
}

export function PCTApplication({ keywords }: Props) {
  const { data, isLoading, isError, error } = useQuery(
    ["pct-application", ...keywords],
    async () => {
      return await getPCTApplication(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  //
  const finalScatterDataFormatHelper = (data: IPCT[]) => {
    if (!data) return [];

    const openAccessCountObj: IScatterList = { id: "Stage", data: [] };
    let openAccessData: IScatterItem[] = [];
    //
    data.forEach((d) => {
      openAccessData.push({ x: d.year, y: d.count });
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
          subTitle="Trends in PCT Applications Over Time"
          title="10. PCT"
        />
      }
    >
      <div>
        {/* {data && ( */}
        <ScatterChart
          data={scatterChartData}
          // legendX="Year"
          legendY="No. of applications"
          // abbreviateLegendX={true}
          colors={["#7F4BD8", "#442873"]}
        />
        {/* )} */}
        <div className="mt-4"></div>
      </div>
    </DataSection>
  );
}
