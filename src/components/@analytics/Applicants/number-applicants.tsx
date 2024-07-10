import { FunctionComponent, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

//
import DataSection from "../../reusable/data-section";
import PageTitle from "../../reusable/page-title";

//
import BarChart from "../../@chart/bar-chart";

//
import { getPatentApplicantType } from "../../../utils/api/charts";
import PatentApplicantKeyTakeaways from "../../../pages/product/analytics/keytakeaways/patent-applicants/application-applicant/keytakeaway";

interface Props {
  keywords: string[];
}

/**
 *
 */
export const NumberApplicationsByApplicant: FunctionComponent<Props> = ({ keywords }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["patent-portfolio", ...keywords],
    async () => {
      return await getPatentApplicantType(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  // const sortedData = useMemo(() => {
  //   if (data) {
  //     return [...data].sort((a, b) => a.count - b.count);
  //   }
  //   return [];
  // }, [data]);

  const barChartData = (data ?? []).map((item) => ({
    label: item.applicant_type,
    value: item.count,
  }));

  return (
    <DataSection
      keywords={keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle
          titleClass="font-bold"
          title="3. Applicants"
          subTitle="Number of Applications by Applicant Type"
        />
      }
    >
      <div>
        <BarChart
          data={barChartData}
          keys={["value"]}
          indexBy="label"
          groupMode={"stacked"}
          // innerPadding={0}
          borderRadius={4}
          legends={"range"}
          legendY="Average family size (n)"
          legendX="Application type"
        />
        <PatentApplicantKeyTakeaways />
      </div>
    </DataSection>
  );
};
