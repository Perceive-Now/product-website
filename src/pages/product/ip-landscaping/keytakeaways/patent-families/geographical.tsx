import { useEffect } from "react";
import KeyDetail from "../../../../../components/@dashboard/IP-landscaping/key-detail";
import Keytakeaway from "../../../../../components/reusable/keytakeaways";
import { useQuery } from "@tanstack/react-query";
import { getGeoFiling } from "../../../../../utils/api/charts";
import { useAppSelector } from "../../../../../hooks/redux";
import { regionalMarketShareOfPatentFamily } from "./patent-family";

const GeographicalDistributionPatentKeyTakeaway = () => {
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const keywords = searchedKeywords.map((kwd) => kwd.value);

  const { data: patentLocation } = useQuery(
    ["patents-geo", ...keywords],
    async () => {
      return await getGeoFiling(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!patentLocation) return;

    //
  }, [patentLocation]);

  return (
    <>
      {patentLocation && (
        <KeyDetail section="Key takeaways">
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

export default GeographicalDistributionPatentKeyTakeaway;
