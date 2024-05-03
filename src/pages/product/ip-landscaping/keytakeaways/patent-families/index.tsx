import React, { useEffect } from "react";
import KeyDetail from "../../../../../components/@dashboard/IP-landscaping/key-detail";
import Keytakeaway from "../../../../../components/reusable/keytakeaways";
import { useQuery } from "@tanstack/react-query";
import { getGeoFiling, getPatentFamilySize } from "../../../../../utils/api/charts";
import { useAppSelector } from "../../../../../hooks/redux";
import {
  AverageFamilySizeEachYear,
  LargePatentFamilyTrends,
  PatentFamilyGrowthRate,
  findYearWithLargestAverage,
  regionalMarketShareOfPatentFamily,
} from "./patent-family";

const SizeOfPatentFamilyKeyTakeaway = () => {
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const keywords = searchedKeywords.map((kwd) => kwd.value);

  const { data: patentFamilySize } = useQuery(
    ["patents-family-size", ...keywords],
    async () => {
      return await getPatentFamilySize(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  const { data: patentLocation } = useQuery(
    ["patents-geo", ...keywords],
    async () => {
      return await getGeoFiling(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!patentFamilySize) return;

    //
  }, [patentFamilySize]);

  return (
    <>
      {patentFamilySize && (
        <KeyDetail section="Section: Patent Families" subtitle="Size of Patent Families Over Time">
          <Keytakeaway
            title={"Average Size of Patent Families Each Year"}
            description={AverageFamilySizeEachYear(patentFamilySize)}
          />
          <Keytakeaway
            title={"Trend in Large Patent Families"}
            description={LargePatentFamilyTrends(patentFamilySize)}
          />
          <Keytakeaway
            title={"Year with Largest Average Patent Family Size"}
            description={findYearWithLargestAverage(patentFamilySize)}
          />
          <Keytakeaway
            title={" Sector Leading in Patent Filings for the Latest Year"}
            description={""}
          />
          <Keytakeaway
            title={"Growth Rate of Patent Family Size"}
            description={PatentFamilyGrowthRate(patentFamilySize)}
          />
          <div className="font-bold text-primary-900 text-sm">
            Size of Patent Families Over Time
          </div>
          <Keytakeaway
            title={"Regional Market Share of Patent Families"}
            description={patentLocation && regionalMarketShareOfPatentFamily(patentLocation)}
          />
          <Keytakeaway
            title={"Growth Rate of Patent Family Size"}
            description={patentLocation && regionalMarketShareOfPatentFamily(patentLocation)}
          />
          <Keytakeaway
            title={"Growth Trends in Regional Patent Family Concentrations"}
            description={patentLocation && regionalMarketShareOfPatentFamily(patentLocation)}
          />
          {/* <Keytakeaway
            title={"Comparison of Urban vs. Rural Patent Family Distributions"}
            description={patentLocation && regionalMarketShareOfPatentFamily(patentLocation)}
          /> */}
          {/* <Keytakeaway
            title={"International Collaboration in Patent Families"}
            description={patentLocation && regionalMarketShareOfPatentFamily(patentLocation)}
          /> */}
          {/* <Keytakeaway
            title={"Impact of Regulatory Changes on Geographical Distribution"}
            description={patentLocation && regionalMarketShareOfPatentFamily(patentLocation)}
          /> */}
        </KeyDetail>
      )}
    </>
  );
};

export default SizeOfPatentFamilyKeyTakeaway;
