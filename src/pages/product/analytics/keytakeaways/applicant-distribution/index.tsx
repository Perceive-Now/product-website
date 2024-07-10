import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

//
import { useAppSelector } from "../../../../../hooks/redux";

//
import { getGeographicDistributionApplicant } from "../../../../../utils/api/charts";

//
import KeyDetail from "src/components/@analytics/key-detail";
import Keytakeaway from "../../../../../components/reusable/keytakeaways";

//
import {
  cityWithHighestConcentrationOfApplicants,
  internationalDiversityOfPatentApplicants,
  rapidGrowthInApplicantNumbersByRegion,
  topCountriesByNumberOfPatentApplicants,
} from "./applicant";

/**
 *
 */
const GeographicDistributionOfApplicantsTakeaways = () => {
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const keywords = searchedKeywords.map((kwd) => kwd.value);

  const { data } = useQuery(
    ["patents-year", ...keywords],
    async () => {
      return await getGeographicDistributionApplicant(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  return (
    <>
      {data && (
        <KeyDetail section="Size of Patent Families Over Time">
          <Keytakeaway
            title={"Top Countries by Number of Patent Applicants"}
            description={topCountriesByNumberOfPatentApplicants(data as any)}
          />
          <Keytakeaway
            title={"Rapid Growth in Applicant Numbers by Region"}
            description={rapidGrowthInApplicantNumbersByRegion(data as any)}
            // }
          />
          <Keytakeaway
            title={"City with Highest Concentration of Applicants"}
            description={cityWithHighestConcentrationOfApplicants(data as any)}
          />
          <Keytakeaway
            title={"Shift in Geographical Focus of Applicants"}
            // description={shiftInGeographicalFocusOfApplicants(data as any)}
          />
          <Keytakeaway
            title={"International Diversity of Patent Applicants"}
            description={data && internationalDiversityOfPatentApplicants(data as any)}
          />
          <Keytakeaway
            title={"Impact of Regulatory Changes on Geographical Distribution"}
            description={data && (data as any)}
          />
        </KeyDetail>
      )}
    </>
  );
};

export default GeographicDistributionOfApplicantsTakeaways;
