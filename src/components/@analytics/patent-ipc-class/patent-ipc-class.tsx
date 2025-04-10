import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

//
import DataSection from "../../reusable/data-section";
import PageTitle from "../../reusable/page-title";

//
import { getPatentIPC } from "../../../utils/api/charts";
import ScrollableBarChart from "../../@chart/bar-scroll";
import IPCKeyTakeaway from "../../../pages/product/analytics/keytakeaways/ipc/keytakeaway";

interface Props {
  keywords: string[];
}

/**
 *
 */
export function PatentIPC({ keywords }: Props) {
  const { data, isLoading, isError, error } = useQuery(
    ["patent_ipc", ...keywords],
    async () => {
      return await getPatentIPC(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;
    //
  }, [data]);

  const finalData = data && data.map((item) => ({ label: item.ipc_class, value: item.count }));

  return (
    <DataSection
      keywords={keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle
          titleClass="font-bold"
          subTitle="Top IPC Classes in Patent Applications"
          title="8. IPC"
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
            // legendY="No. of patent count"
            // legendX="IPC Class"
          />
        )}

        <div>{data && <IPCKeyTakeaway data={data} />}</div>
      </div>
    </DataSection>
  );
}
