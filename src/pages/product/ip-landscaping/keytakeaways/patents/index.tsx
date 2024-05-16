import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import KeyDetail from "../../../../../components/@dashboard/IP-landscaping/key-detail";
import Keytakeaway from "../../../../../components/reusable/keytakeaways";
import { getPatentsYearly } from "../../../../../utils/api/charts";

import {
  FiveYearMovingAverage,
  PatentFilingLatestYear,
  annualGrowthRateInPatentFilings,
} from "./patent";

import { useAppSelector } from "../../../../../hooks/redux";

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
    <>
      {data && (
        <KeyDetail section="Size of Patent Families Over Time">
          <Keytakeaway
            title={"Annual Growth Rate in Patent Filings"}
            description={annualGrowthRateInPatentFilings(data) || "N/A"}
          />
          <Keytakeaway
            title={"Comparison of Patent Filings Across Decades"}
            description={"N/A"}
            // comparisonOfPatentFilingsAcrossDecades(data) ||
          />
          <Keytakeaway
            title={" Sector Leading in Patent Filings for the Latest Year"}
            description={PatentFilingLatestYear(data as any) || "N/A"}
          />
          <Keytakeaway
            title={"Five-Year Moving Average of Patent Filings"}
            description={FiveYearMovingAverage(data as any) || "N/A"}
          />
        </KeyDetail>
      )}
    </>
  );
};

export default PatentsKeyTakeaways;
