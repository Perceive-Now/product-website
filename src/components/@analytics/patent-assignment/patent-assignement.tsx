import { FunctionComponent, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

//
import DataSection from "../../reusable/data-section";
import PageTitle from "../../reusable/page-title";

//
import { getPatentCompetitorPortfolio } from "../../../utils/api/charts";

//
import ScrollableBarChart from "../../@chart/bar-scroll";
import OrganizationAssignmentTakeaways from "../../../pages/product/analytics/keytakeaways/assignees/organization-assigment/keytakeaways";

interface Props {
  keywords: string[];
}

/**
 *
 */
export const PatentAssignment: FunctionComponent<Props> = ({ keywords }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["patents-portfolio1", ...keywords],
    async () => {
      return await getPatentCompetitorPortfolio(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  //
  // const finalScatterDataFormatHelper = (data: IScholaryPublicationData[]) => {
  //   if (!data) return [];

  //   const openAccessCountObj: IScatterList = { id: "Stage", data: [] };
  //   let openAccessData: IScatterItem[] = [];
  //   //
  //   data.forEach((d) => {
  //     openAccessData.push({ x: d.year, y: d.count });
  //   });

  //   // For checking and sorting past 10years
  //   const uniqueYears = Array.from(
  //     new Set(openAccessData.map((entry) => entry.x))
  //   );
  //   const sortedYears = uniqueYears.sort((a, b) => b - a);
  //   const recentYears = sortedYears.slice(0, 10);
  //   //

  //   // filter
  //   openAccessData = openAccessData.filter((item) => recentYears.includes(item.x));
  //   openAccessCountObj.data = openAccessData.slice(0, 10);
  //   //
  //   return [openAccessCountObj];
  // };

  // const scatterChartData = finalScatterDataFormatHelper(data ?? []);

  const finalData = data && data.map((item) => ({ label: item.org, value: item.count }));

  return (
    <DataSection
      keywords={keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle
          titleClass="font-bold"
          title="5. Assignees"
          subTitle="Top Organizations by Number of Patent Assignments"
        />
      }
    >
      <div>
        {data && <ScrollableBarChart data={finalData} />}
        <div className="mt-4">{data && <OrganizationAssignmentTakeaways data={data} />}</div>
      </div>
    </DataSection>
  );
};
