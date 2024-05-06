import KeyDetail from "../../../../../../components/@dashboard/IP-landscaping/key-detail";
import Keytakeaway from "../../../../../../components/reusable/keytakeaways";

const ExaminerTrendKeytakeaways = () => {
  return (
    <KeyDetail section="Key Takeaway">
      <Keytakeaway
        title={"Reduction in Average Examination Time"}
        // description={
        //   " The annual growth rate of patent filings from year A to year B was C%, indicating an D trend in innovation activities."
        // }
      />
      <Keytakeaway
        title={"Year with Shortest Examination Time"}
        // description={
        //   " In year A, the B sector accounted for C% of total patent filings, highlighting its dominant role in technological innovation."
        // }
      />
      <Keytakeaway
        title={"Trend of Decreasing Examination Times"}
        // description={
        //   "The comparison of patent filings across decades shows a C% increase in the 2010s compared to the 2000s, evidencing a significant shift in innovation intensity."
        // }
      />
      <Keytakeaway
        title={"Impact of Technological Advances on Examination Times"}
        // description={data && PatentFilingLatestYear(data as any)}
      />
      <Keytakeaway
        title={"Comparison of Examination Times Across Decades"}
        // description={data && FiveYearMovingAverage(data as any)}
      />
      <Keytakeaway
        title={"Impact of Regulatory Changes on Geographical Distribution"}
        // description={data && FiveYearMovingAverage(data as any)}
      />
    </KeyDetail>
  );
};

export default ExaminerTrendKeytakeaways;
