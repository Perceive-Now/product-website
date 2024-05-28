import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { useAppSelector } from "../../../../../hooks/redux";
import { getPatentCompetitorPortfolio } from "../../../../../utils/api/charts";
import KeyDetail from "../../../../../components/@dashboard/IP-landscaping/key-detail";
import Keytakeaway from "../../../../../components/reusable/keytakeaways";

const DistributionOfPatentsByCPCClassifications = () => {
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const keywords = searchedKeywords.map((kwd) => kwd.value);

  const { data } = useQuery(
    ["patents-year", ...keywords],
    async () => {
      return await getPatentCompetitorPortfolio(keywords);
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
        <KeyDetail section="Key Takeaway">
          <Keytakeaway
            title={"Dominant CPC Classification"}
            // description={leadingOrganizationInPatentAssignments(data as any)}
          />
          <Keytakeaway
            title={"Yearly Trends in CPC Classifications"}
            // description={marketShareOfPatentAssignmentsAmongTopOrganizations(data as any)}
            // }
          />
          <Keytakeaway
            title={"Comparison of CPC Classifications Over Time"}
            // description={cityWithHighestConcentrationOfApplicants(data as any)}
          />
          <Keytakeaway
            title={"Rapid Growth CPC Classifications"}
            // description={shiftInGeographicalFocusOfApplicants(data as any)}
          />
        </KeyDetail>
      )}
    </>
  );
};

export default DistributionOfPatentsByCPCClassifications;
