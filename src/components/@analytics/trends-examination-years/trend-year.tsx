import { FunctionComponent, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

//
import DataSection from "../../reusable/data-section";
import PageTitle from "../../reusable/page-title";

//
import ScatterChart from "../../@chart/scatter-chart";
import { getExamincationTrend } from "../../../utils/api/charts";

//
import ExaminerTrendKeytakeaways from "../../../pages/product/analytics/keytakeaways/examiners/trends-examination/keytakeaway";

interface Props {
  keywords: string[];
}

interface IScholaryPublicationData {
  grant_days: number;
  years: number;
}

interface IScatterItem {
  x: number;
  y: number;
}

interface IScatterList {
  id: string;
  data: IScatterItem[];
}

/**
 *
 */
export const TrendExaminationYear: FunctionComponent<Props> = ({ keywords }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["patents-year-e", ...keywords],
    async () => {
      return await getExamincationTrend(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  //
  const finalScatterDataFormatHelper = (data: IScholaryPublicationData[]) => {
    if (!data) return [];

    const openAccessCountObj: IScatterList = { id: "Stage", data: [] };
    let openAccessData: IScatterItem[] = [];
    //
    data.forEach((d) => {
      openAccessData.push({ x: d.years, y: d.grant_days });
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
      title={<PageTitle titleClass="font-bold" subTitle="Trends in Examination Times Over Years" />}
    >
      <div>
        {data && (
          <ScatterChart
            data={scatterChartData}
            // legendX="Year"
            legendY="Average days to grant patents"
            // abbreviateLegendX={true}
            colors={["#7F4BD8", "#442873"]}
          />
        )}
        <div className="mt-4">
          <ExaminerTrendKeytakeaways />
        </div>
      </div>
    </DataSection>
  );
};
