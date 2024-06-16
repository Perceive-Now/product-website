import KeyDetail from "../../../../../../components/@dashboard/IP-landscaping/key-detail";
import Keytakeaway from "../../../../../../components/reusable/keytakeaways";

import {
  cityWithHighestConcentrationOfApplicants,
  internationalDiversityOfPatentApplicants,
  rapidGrowthInApplicantNumbersByRegion,
  shiftInGeographicalFocusOfApplicants,
  topCountriesByNumberOfPatentApplicants,
} from "./key";

const GeographicalDistributionOfApplicantFamilyKeyTakeaways = ({ data }: any) => {
  return (
    <>
      {data && (
        <KeyDetail section="Key Takeaway">
          <Keytakeaway
            title={"Top Countries by Number of Patent Applicants"}
            description={topCountriesByNumberOfPatentApplicants(data) || "N/A"}
          />
          <Keytakeaway
            title={"Rapid Growth in Applicant Numbers by Region"}
            description={rapidGrowthInApplicantNumbersByRegion(data) || "N/A"}
          />
          <Keytakeaway
            title={"City with Highest Concentration of Applicants"}
            description={cityWithHighestConcentrationOfApplicants(data) || "N/A"}
          />
          <Keytakeaway
            title={"Shift in Geographical Focus of Applicants"}
            description={shiftInGeographicalFocusOfApplicants(data) || "N/A"}
          />
          <Keytakeaway
            title={"International Diversity of Patent Applicants"}
            description={internationalDiversityOfPatentApplicants(data) || "N/A"}
          />
        </KeyDetail>
      )}
    </>
  );
};

export default GeographicalDistributionOfApplicantFamilyKeyTakeaways;
