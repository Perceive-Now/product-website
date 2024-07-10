import KeyDetail from "src/components/@analytics/key-detail";
import Keytakeaway from "../../../../../components/reusable/keytakeaways";
import { IPatentLocation, regionalMarketShareOfPatentFamily } from "./patent-family";

interface Props {
  patentLocation: IPatentLocation[];
}

/**
 *
 */
const GeographicalDistributionPatentKeyTakeaway = ({ patentLocation }: Props) => {
  return (
    <>
      {patentLocation && (
        <KeyDetail section="Key takeaways">
          <Keytakeaway
            title={"Regional Market Share of Patent Families"}
            description={regionalMarketShareOfPatentFamily(patentLocation) || "N/A"}
          />
          <Keytakeaway
            title={"Growth Trends in Regional Patent Family Concentrations"}
            description={"N/A"}
          />
          {/* <Keytakeaway
            title={"International Collaboration in Patent Families"}
            description={"N/A"}
          /> */}
        </KeyDetail>
      )}
    </>
  );
};

export default GeographicalDistributionPatentKeyTakeaway;
