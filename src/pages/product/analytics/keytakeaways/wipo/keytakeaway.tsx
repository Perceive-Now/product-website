import KeyDetail from "src/components/@analytics/key-detail";

import Keytakeaway from "../../../../../components/reusable/keytakeaways";
import { dominantWIPOSector, mostRapidlyGrowingWIPOSectore } from "./key";

interface IData {
  title: string;
  count: number;
}

interface Props {
  data: IData[];
}

/**
 *
 */
const WipoKeyTakeaway = ({ data }: Props) => {
  return (
    <>
      <KeyDetail section="Key Takeaway">
        <Keytakeaway
          title={"Dominant WIPO Sector"}
          description={dominantWIPOSector(data) || "N/A"}
        />
        <Keytakeaway title={"Annual Growth in WIPO Sector Patent Filings"} description="N/A" />
        <Keytakeaway title={"Shift in WIPO Sector Focus Over Years"} description="N/A" />
        <Keytakeaway title={"Comparison of WIPO Sector Filings"} description="N/A" />
        <Keytakeaway
          title={"Most Rapidly Growing WIPO Sector"}
          description={mostRapidlyGrowingWIPOSectore(data) || "N/A"}
        />
      </KeyDetail>
    </>
  );
};

export default WipoKeyTakeaway;
