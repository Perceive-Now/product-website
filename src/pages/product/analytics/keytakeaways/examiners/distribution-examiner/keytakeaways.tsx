import KeyDetail from "src/components/@analytics/key-detail";
import Keytakeaway from "../../../../../../components/reusable/keytakeaways";

import {
  examinerWithFastestGrowingWorkload,
  examinerWorkloadDistribution,
  workloadDisparityAmongExaminers,
} from "./key";

/**
 *
 */
const ExaminerDistributionKeytakeaways = ({ data }: any) => {
  return (
    <KeyDetail section="Key Takeaway">
      <Keytakeaway
        title={"Examiner Workload Distribution"}
        description={examinerWorkloadDistribution(data) || "N/A"}
      />
      <Keytakeaway
        title={"Examiner with Fastest Growing Workload"}
        description={examinerWithFastestGrowingWorkload(data) || "N/A"}
      />
      <Keytakeaway
        title={"Workload Disparity Among Examiners"}
        description={workloadDisparityAmongExaminers(data) || "N/A"}
      />
      <Keytakeaway
        title={"Efficiency Indicator by Examiner"}
        description={
          // efficiencyIndicatorByExaminer(data) ||
          "API Error"
        }
      />
      <Keytakeaway
        title={"Annual Workload Trends Among Examiners"}
        description={
          // annualWorkloadTrendsAmongExaminers(data) ||
          "N/A"
        }
      />
    </KeyDetail>
  );
};

export default ExaminerDistributionKeytakeaways;
