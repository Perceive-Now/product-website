import { useQuery } from "@tanstack/react-query";
import KeyDetail from "../../../../../components/@dashboard/IP-landscaping/key-detail";

import { FiveYearMovingAverage, PatentFilingLatestYear } from "./patent";

import { useAppSelector } from "../../../../../hooks/redux";
import { getPatentsYearly } from "../../../../../utils/api/charts";
import { useEffect } from "react";
import Keytakeaway from "../../../../../components/reusable/keytakeaways";

const PatentsKeyTakeaways = () => {
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const keywords = searchedKeywords.map((kwd) => kwd.value);

  const { data } = useQuery(
    ["patents-year", ...keywords],
    async () => {
      return await getPatentsYearly(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  return (
    <KeyDetail section="Size of Patent Families Over Time">
      <Keytakeaway
        title={"Annual Growth Rate in Patent Filings"}
        description={
          " The annual growth rate of patent filings from year A to year B was C%, indicating an D trend in innovation activities."
        }
      />
      <Keytakeaway
        title={"Market Share of Patent Filings by Sector"}
        description={
          " In year A, the B sector accounted for C% of total patent filings, highlighting its dominant role in technological innovation."
        }
      />
      <Keytakeaway
        title={"Comparison of Patent Filings Across Decades"}
        description={
          "The comparison of patent filings across decades shows a C% increase in the 2010s compared to the 2000s, evidencing a significant shift in innovation intensity."
        }
      />
      <Keytakeaway
        title={" Sector Leading in Patent Filings for the Latest Year"}
        description={data && PatentFilingLatestYear(data as any)}
      />
      <Keytakeaway
        title={"Five-Year Moving Average of Patent Filings"}
        description={data && FiveYearMovingAverage(data as any)}
      />
    </KeyDetail>
  );
};

export default PatentsKeyTakeaways;
