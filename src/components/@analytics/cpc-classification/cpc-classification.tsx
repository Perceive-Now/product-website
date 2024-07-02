import { FunctionComponent, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

//
import DataSection from "../../reusable/data-section";
import PageTitle from "../../reusable/page-title";

//
import { getPatentClassificationCPC } from "../../../utils/api/charts";

//
import ScrollableBarChart from "../../@chart/bar-scroll";
import DistributionOfPatentsByCPCClassifications from "../../../pages/product/analytics/keytakeaways/cpc/keytakeaway";

interface Props {
  keywords: string[];
}

/**
 *
 */
export const ClassificationCPC: FunctionComponent<Props> = ({ keywords }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["patent_cpc", ...keywords],
    async () => {
      return await getPatentClassificationCPC(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  const finalData = data && data.map((item) => ({ label: item.cpc_class, value: item.count }));

  return (
    <DataSection
      keywords={keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle
          titleClass="font-bold"
          title="7. CPC"
          subTitle=" Distribution of Patents by CPC Classifications"
        />
      }
    >
      <div className="space-y-2 text-secondary-800 mt-4">
        {data && (
          <ScrollableBarChart
            data={finalData as any}
            // keys={["count"]}
            // indexBy="label"
            // groupMode="stacked"
            // legends={"legend"}
            // legendX="CPC Class"
            // legendY="No. of patent count"
          />
        )}

        <div>{data && <DistributionOfPatentsByCPCClassifications data={data} />}</div>
      </div>
    </DataSection>
  );
};
