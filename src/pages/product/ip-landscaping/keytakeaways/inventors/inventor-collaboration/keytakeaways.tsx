import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { useAppSelector } from "../../../../../../hooks/redux";
import { getPatentCompetitorPortfolio } from "../../../../../../utils/api/charts";
import KeyDetail from "../../../../../../components/@dashboard/IP-landscaping/key-detail";
import Keytakeaway from "../../../../../../components/reusable/keytakeaways";

const TrendsInInventorCollaborationsOverTime = () => {
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
            title={"Growth in Inventor Collaborations"}
            // description={leadingOrganizationInPatentAssignments(data as any)}
          />
          <Keytakeaway
            title={"Rapid Increase in Inventor Numbers by Region"}
            // description={marketShareOfPatentAssignmentsAmongTopOrganizations(data as any)}
            // }
          />
          <Keytakeaway
            title={"Year with Highest Collaboration Count"}
            // description={cityWithHighestConcentrationOfApplicants(data as any)}
          />
          <Keytakeaway
            title={"Decadal Increase in Collaborations"}
            // description={shiftInGeographicalFocusOfApplicants(data as any)}
          />
          <Keytakeaway title={"Regional Variations in Collaboration Patterns"} />
        </KeyDetail>
      )}
    </>
  );
};

export default TrendsInInventorCollaborationsOverTime;
