import KeyDetail from "../../../../../components/@dashboard/IP-landscaping/key-detail";
import Keytakeaway from "../../../../../components/reusable/keytakeaways";

import { ICPCData, dominantCPCClassification } from "./key";

interface Props {
  data: ICPCData[];
}

const DistributionOfPatentsByCPCClassifications = ({ data }: Props) => {
  return (
    <>
      <KeyDetail section="Key Takeaway">
        <Keytakeaway
          title={"Dominant CPC Classification"}
          description={dominantCPCClassification(data) || "N/A"}
        />
        <Keytakeaway title={"Yearly Trends in CPC Classifications"} description={"N/A"} />
        <Keytakeaway title={"Comparison of CPC Classifications Over Time"} description={"N/A"} />
        <Keytakeaway title={"Rapid Growth CPC Classifications"} description={"N/A"} />
      </KeyDetail>
    </>
  );
};

export default DistributionOfPatentsByCPCClassifications;
