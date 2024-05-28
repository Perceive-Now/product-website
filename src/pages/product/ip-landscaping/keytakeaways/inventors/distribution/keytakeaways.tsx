import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { useAppSelector } from "../../../../../../hooks/redux";
import { getPatentCompetitorPortfolio } from "../../../../../../utils/api/charts";
import KeyDetail from "../../../../../../components/@dashboard/IP-landscaping/key-detail";
import Keytakeaway from "../../../../../../components/reusable/keytakeaways";

const GeographicalDistributionOfInventorsKeyTakeaways = () => {
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
            title={"Top Country for Inventor Activity"}
            // description={leadingOrganizationInPatentAssignments(data as any)}
          />
          <Keytakeaway
            title={"Rapid Increase in Inventor Numbers by Region"}
            // description={marketShareOfPatentAssignmentsAmongTopOrganizations(data as any)}
            // }
          />
          <Keytakeaway
            title={"City with Highest Number of Inventors"}
            // description={cityWithHighestConcentrationOfApplicants(data as any)}
          />
          <Keytakeaway
            title={"Shift in Inventor Geographical Distribution"}
            // description={shiftInGeographicalFocusOfApplicants(data as any)}
          />
          <Keytakeaway title={"International Diversity Among Inventors"} />
        </KeyDetail>
      )}
    </>
  );
};

export default GeographicalDistributionOfInventorsKeyTakeaways;
