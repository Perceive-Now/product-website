import KeyDetail from "src/components/@analytics/key-detail";
import Keytakeaway from "../../../../../../components/reusable/keytakeaways";

import {
  ICollaborationData,
  analyzeCollaborationTrends,
  analyzeHighestCollaborationYear,
  decadalIncreaseInCollaborations,
  regionalVariationsInCollaborationPatterns,
} from "./key";

interface Props {
  data: ICollaborationData[];
}

const TrendsInInventorCollaborationsOverTime = ({ data }: Props) => {
  return (
    <>
      <KeyDetail section="Key Takeaway">
        <Keytakeaway
          title={"Growth in Inventor Collaborations"}
          description={analyzeCollaborationTrends(data) || "N/A"}
        />
        <Keytakeaway
          title={"Year with Highest Collaboration Count"}
          description={analyzeHighestCollaborationYear(data) || "N/A"}
        />
        <Keytakeaway
          title={"Decadal Increase in Collaborations"}
          description={decadalIncreaseInCollaborations(data) || "N/A"}
        />
        <Keytakeaway
          title={"Regional Variations in Collaboration Patterns"}
          description={regionalVariationsInCollaborationPatterns(data) || "N/A"}
        />
      </KeyDetail>
    </>
  );
};

export default TrendsInInventorCollaborationsOverTime;
