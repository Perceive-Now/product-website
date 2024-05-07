import { FunctionComponent, useEffect } from "react";
import DataSection from "../../../reusable/data-section";
import { getPatentExaminerWorkload } from "../../../../utils/api/charts";
import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../../reusable/page-title";
import ScrollableBarChart from "../../../@product/bar-scroll/scroll-bar";
// import ScrollableBarChart from "../../../@product/bar-scroll/scroll-bar";

interface Props {
  keywords: string[];
}

export const DistributionWorkload: FunctionComponent<Props> = ({ keywords }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["patent-examiner-workload", ...keywords],
    async () => {
      return await getPatentExaminerWorkload(keywords);
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
    label: item.examiner,
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
          title="4. Examiners"
          subTitle="Distribution of Examiner Workload"
        />
      }
    >
      <div>
        <ScrollableBarChart
          data={barChartData}
          // keys={["value"]}
          // indexBy="label"
          // groupMode={"stacked"}
          // // innerPadding={0}
          // borderRadius={4}
          // // layout={"vertical"}
          // legendX="Examiner"
          // legendY="No. of patents examined "
          // legends={"legend"}
        />
        {/* <ScrollableBarChart
            data={barChartData.slice(0, 50)}
          /> */}
      </div>
    </DataSection>
  );
};
