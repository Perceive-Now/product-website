import KeyDetail from "src/components/@analytics/key-detail";
import Keytakeaway from "../../../../../../components/reusable/keytakeaways";

import {
  IInventorCountryData,
  internationalDiversityAmongInventors,
  rapidIncreaseInInventorNumbersByRegion,
  shiftInInventorGeographicalDistribution,
  topCountryForInventorActivity,
} from "./key";

interface Props {
  data: IInventorCountryData[];
}

const GeographicalDistributionOfInventorsKeyTakeaways = ({ data }: Props) => {
  return (
    <>
      {data && (
        <KeyDetail section="Key Takeaway">
          <Keytakeaway
            title={"Top Country for Inventor Activity"}
            description={topCountryForInventorActivity(data) || "N/A"}
          />
          <Keytakeaway
            title={"Rapid Increase in Inventor Numbers by Region"}
            description={rapidIncreaseInInventorNumbersByRegion(data) || "N/A"}
          />
          <Keytakeaway title={"City with Highest Number of Inventors"} description={"N/A"} />
          <Keytakeaway
            title={"Shift in Inventor Geographical Distribution"}
            description={shiftInInventorGeographicalDistribution(data) || "N/A"}
          />
          <Keytakeaway
            title={"International Diversity Among Inventors"}
            description={internationalDiversityAmongInventors(data) || "N/A"}
          />
        </KeyDetail>
      )}
    </>
  );
};

export default GeographicalDistributionOfInventorsKeyTakeaways;
