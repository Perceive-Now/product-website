import KeyDetail from "../../../../../../components/@dashboard/IP-landscaping/key-detail";
import Keytakeaway from "../../../../../../components/reusable/keytakeaways";

const ExaminerDistributionKeytakeaways = () => {
  return (
    <KeyDetail section="Key Takeaway">
      <Keytakeaway
        title={"Examiner Workload Distribution"}
        // description={
        //   " The annual growth rate of patent filings from year A to year B was C%, indicating an D trend in innovation activities."
        // }
      />
      <Keytakeaway
        title={"Examiner with Fastest Growing Workload"}
        // description={
        //   " In year A, the B sector accounted for C% of total patent filings, highlighting its dominant role in technological innovation."
        // }
      />
      <Keytakeaway
        title={"Workload Disparity Among Examiners"}
        // description={
        //   "The comparison of patent filings across decades shows a C% increase in the 2010s compared to the 2000s, evidencing a significant shift in innovation intensity."
        // }
      />
      <Keytakeaway
        title={"Efficiency Indicator by Examiner"}
        // description={data && PatentFilingLatestYear(data as any)}
      />
      <Keytakeaway
        title={"Annual Workload Trends Among Examiners"}
        // description={data && FiveYearMovingAverage(data as any)}
      />
    </KeyDetail>
  );
};

export default ExaminerDistributionKeytakeaways;
