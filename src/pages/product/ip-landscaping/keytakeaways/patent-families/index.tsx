import KeyDetail from "../../../../../components/@dashboard/IP-landscaping/key-detail";
import Keytakeaway from "../../../../../components/reusable/keytakeaways";

import {
  AverageFamilySizeEachYear,
  largePatentFamilyTrends,
  PatentFamilyGrowthRate,
  findYearWithLargestAverage,
  IFamilyYear,
} from "./patent-family";

interface Props {
  patentFamilySize: IFamilyYear[];
}

const SizeOfPatentFamilyKeyTakeaway = ({ patentFamilySize }: Props) => {
  return (
    <KeyDetail section="Key takeaways">
      <Keytakeaway
        title={"Average Size of Patent Families Each Year"}
        description={AverageFamilySizeEachYear(patentFamilySize) || "N/A"}
      />
      <Keytakeaway
        title={"Trend in Large Patent Families"}
        description={largePatentFamilyTrends(patentFamilySize) || "N/A"}
      />
      <Keytakeaway
        title={"Year with Largest Average Patent Family Size"}
        description={findYearWithLargestAverage(patentFamilySize) || "N/A"}
      />
      <Keytakeaway
        title={"Growth Rate of Patent Family Size"}
        description={PatentFamilyGrowthRate(patentFamilySize) || "N/A"}
      />
    </KeyDetail>
  );
};

export default SizeOfPatentFamilyKeyTakeaway;
