import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { useAppSelector } from "../../../../../../hooks/redux";
import { getPatentCompetitorPortfolio } from "../../../../../../utils/api/charts";
import KeyDetail from "../../../../../../components/@dashboard/IP-landscaping/key-detail";
import Keytakeaway from "../../../../../../components/reusable/keytakeaways";
import {
  leadingOrganizationInPatentAssignments,
  marketShareOfPatentAssignmentsAmongTopOrganizations,
} from "./key";

const OrganizationAssignmentTakeaways = () => {
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
            title={"Leading Organization in Patent Assignments"}
            description={leadingOrganizationInPatentAssignments(data as any)}
          />
          <Keytakeaway
            title={"Market Share of Patent Assignments Among Top Organizations"}
            description={marketShareOfPatentAssignmentsAmongTopOrganizations(data as any)}
            // }
          />
          <Keytakeaway
            title={"Organization with Largest Year-on-Year Increase in Assignments"}
            // description={cityWithHighestConcentrationOfApplicants(data as any)}
          />
          <Keytakeaway
            title={"Sector Dominance by Organization in Patent Assignments"}
            // description={shiftInGeographicalFocusOfApplicants(data as any)}
          />
          <Keytakeaway title={"Comparison of Assignment Concentration Among Organizations"} />
        </KeyDetail>
      )}
    </>
  );
};

export default OrganizationAssignmentTakeaways;
