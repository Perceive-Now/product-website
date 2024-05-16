import { useEffect } from "react";
import KeyDetail from "../../../../../components/@dashboard/IP-landscaping/key-detail";
import Keytakeaway from "../../../../../components/reusable/keytakeaways";
import { useQuery } from "@tanstack/react-query";
import { getPatentFamilySize } from "../../../../../utils/api/charts";
import { useAppSelector } from "../../../../../hooks/redux";
import {
  AverageFamilySizeEachYear,
  largePatentFamilyTrends,
  PatentFamilyGrowthRate,
  findYearWithLargestAverage,
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
  // Fetching time period
  useEffect(() => {
    if (!patentFamilySize) return;

    //
  }, [patentFamilySize]);

  return (
    <>
      {patentFamilySize && (
        <KeyDetail section="Key takeaways">
          <Keytakeaway
            title={"Average Size of Patent Families Each Year"}
            description={AverageFamilySizeEachYear(patentFamilySize)}
          />
          <Keytakeaway
            title={"Trend in Large Patent Families"}
            description={largePatentFamilyTrends(patentFamilySize)}
          />
          <Keytakeaway
            title={"Year with Largest Average Patent Family Size"}
            description={findYearWithLargestAverage(patentFamilySize)}
          />
          <Keytakeaway
            title={"Growth Rate of Patent Family Size"}
            description={PatentFamilyGrowthRate(patentFamilySize)}
          />
        </KeyDetail>
      )}
    </>
  );
};

export default SizeOfPatentFamilyKeyTakeaway;
