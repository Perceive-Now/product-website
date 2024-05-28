/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import DataSection from "../../../reusable/data-section";
import PageTitle from "../../../reusable/page-title";

import { getWIPOSector } from "../../../../utils/api/charts";
import BarChart from "../../../@product/bar-chart";

import WipoKeyTakeaway from "../../../../pages/product/ip-landscaping/keytakeaways/wipo/keytakeaway";

interface Props {
  keywords: string[];
}

export function PatentWipo({ keywords }: Props) {
  const { data, isLoading, isError, error } = useQuery(
    ["wipo_sector", ...keywords],
    async () => {
      return await getWIPOSector(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  const finalData = data && data.map((item) => ({ label: item.title, value: item.count }));
  //

  return (
    <DataSection
      keywords={keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle
          titleClass="font-bold"
          title="9. WIPO"
          subTitle="Distribution of Patents Across WIPO Sectors"
        />
      }
    >
      <div>
        <BarChart
          data={finalData as any}
          keys={["value"]}
          indexBy="label"
          groupMode={"stacked"}
          layout={"horizontal"}
          // legendX="Number of Patents"
          legendY="WIPO FIELD"
          innerPadding={0}
          borderRadius={4}
          // legends={"range"}
        />

        <div className="mt-4">{data && <WipoKeyTakeaway data={data} />}</div>
      </div>
    </DataSection>
  );
}
