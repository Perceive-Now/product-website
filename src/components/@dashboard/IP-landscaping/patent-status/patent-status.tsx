import { FunctionComponent, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
//
import DataSection from "../../../reusable/data-section";
//
import { getPatentLegalStatus } from "../../../../utils/api/charts";
import PageTitle from "../../../reusable/page-title";
import PieChart from "../../../@product/pie-chart";
import PatentsKeyTakeaways from "../../../../pages/product/ip-landscaping/keytakeaways/patents";

interface Props {
  keywords: string[];
}

/**
 *
 */
export const PatentLegalStatus: FunctionComponent<Props> = ({ keywords }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["patents-status", ...keywords],
    async () => {
      return await getPatentLegalStatus(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  const pieChartData = (data ?? []).map((item) => ({
    id: item.title,
    label: item.title,
    value: item.count,
  }));

  //
  return (
    <DataSection
      keywords={keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={<PageTitle titleClass="font-bold" subTitle="Distribution Of Patent Types" />}
    >
      <div className="space-y-2 text-secondary-800 mt-4">{<PieChart data={pieChartData} />}</div>
      <div>
        <PatentsKeyTakeaways />
      </div>
    </DataSection>
  );
};
