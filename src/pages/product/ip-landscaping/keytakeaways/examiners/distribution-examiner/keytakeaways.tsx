import KeyDetail from "../../../../../../components/@dashboard/IP-landscaping/key-detail";
import Keytakeaway from "../../../../../../components/reusable/keytakeaways";

import { examinerWithFastestGrowingWorkload, examinerWorkloadDistribution } from "./key";

const ExaminerDistributionKeytakeaways = ({ data }: any) => {
  return (
    <KeyDetail section="Key Takeaway">
      <Keytakeaway
        title={"Examiner Workload Distribution"}
        description={examinerWorkloadDistribution(data, data.examiner) || "N/A"}
      />
      <Keytakeaway
        title={"Examiner with Fastest Growing Workload"}
        description={examinerWithFastestGrowingWorkload(data) || "N/A"}
      />
      <Keytakeaway title={"Workload Disparity Among Examiners"} description={"N/A"} />
      <Keytakeaway
        title={"Efficiency Indicator by Examiner"}
        description={
          // efficiencyIndicatorByExaminer(data) ||
          "N/A"
        }
      />
      <Keytakeaway
        title={"Annual Workload Trends Among Examiners"}
        // description={data && FiveYearMovingAverage(data as any)}
      />
    </KeyDetail>
  );
};

export default ExaminerDistributionKeytakeaways;
