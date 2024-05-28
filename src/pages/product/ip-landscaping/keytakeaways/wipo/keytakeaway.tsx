import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { useAppSelector } from "../../../../../hooks/redux";
import { getPatentCompetitorPortfolio } from "../../../../../utils/api/charts";
import KeyDetail from "../../../../../components/@dashboard/IP-landscaping/key-detail";
import Keytakeaway from "../../../../../components/reusable/keytakeaways";

const WipoKeyTakeaway = () => {
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
            title={"Dominant WIPO Sector"}
            // description={leadingOrganizationInPatentAssignments(data as any)}
          />
          <Keytakeaway
            title={"Annual Growth in WIPO Sector Patent Filings"}
            // description={marketShareOfPatentAssignmentsAmongTopOrganizations(data as any)}
            // }
          />
          <Keytakeaway
            title={"Shift in WIPO Sector Focus Over Years"}
            // description={cityWithHighestConcentrationOfApplicants(data as any)}
          />
          <Keytakeaway
            title={"Comparison of WIPO Sector Filings"}
            // description={shiftInGeographicalFocusOfApplicants(data as any)}
          />
          <Keytakeaway
            title={"Most Rapidly Growing WIPO Sector"}
            // description={shiftInGeographicalFocusOfApplicants(data as any)}
          />
        </KeyDetail>
      )}
    </>
  );
};

export default WipoKeyTakeaway;
