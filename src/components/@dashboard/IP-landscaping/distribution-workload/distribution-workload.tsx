import { FunctionComponent, useEffect } from "react";
import DataSection from "../../../reusable/data-section";
import { getPatentExaminerWorkload } from "../../../../utils/api/charts";
import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../../reusable/page-title";
import BarChart from "../../../@product/bar-chart";
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
    <div className="border-gray-200 shadow-custom border px-2 pt-2 pb-4 w-full space-y-2">
      <DataSection
        keywords={keywords}
        isLoading={isLoading}
        isError={isError}
        error={error}
        title={
          <PageTitle
            // info={`This geographical heat map network was extracted from "X" no of publications and "Y" no of patents`}
            titleClass="font-bold"
            title="7. Distribution of Examiner Workload"
          />
        }
      >
        <div>
          {/* {data && ( */}
          <BarChart
            data={barChartData.slice(0, 50)}
            keys={["value"]}
            indexBy="label"
            groupMode={"stacked"}
            // innerPadding={0}
            borderRadius={4}
            // layout={"vertical"}
            legendX="Examiner"
            legendY="No. of patents examined "
            legends={"legend"}
          />
          {/* <ScrollableBarChart
            data={barChartData.slice(0, 50)}
          /> */}
          {/* )} */}
          <div className="space-y-2 text-secondary-800 mt-4">
            <h5 className="font-bold text-primary-900 text-lg">Key takeaways</h5>
            <div>
              {/* <h6 className="font-semibold text-primary-900">
                Family A: California (100 patents), Texas (50 patents); Family B: New York (80
                patents), Florida (70 patents)
              </h6> */}
              <ul className="list-disc ml-3 text-sm mt-1 font-medium">
                <li>
                  Examiner Workload Distribution: "Examiner A handled X% of all patent examinations
                  last year, indicating a high concentration of workload."
                </li>
                <li>
                  Trend in Workload Distribution Among Examiners: "The workload distribution among
                  examiners has become more balanced over the last Y years, with the top X examiners
                  handling only Y% of cases."
                </li>
                <li>
                  Examiner with Fastest Growing Workload: "Examiner B's workload increased by X%
                  from year Y to Z, the fastest growth among all examiners."
                </li>
                <li>
                  Comparison of Examiner Workloads: "The workload of the top X% of examiners
                  represents Y% of the total, highlighting workload disparities."
                </li>
                <li>
                  Efficiency Indicator by Examiner: "Examiner C has the highest efficiency,
                  processing an average of X patents per month, indicating a potential benchmark for
                  workload management."
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DataSection>
    </div>
  );
};
