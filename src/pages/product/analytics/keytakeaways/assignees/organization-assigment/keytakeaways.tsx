import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

//
import { useAppSelector } from "../../../../../../hooks/redux";

//
import { getPatentCompetitorActivity } from "../../../../../../utils/api/charts";

//
import Keytakeaway from "../../../../../../components/reusable/keytakeaways";

//
import {
  ICompetitorPortfolio,
  comparisonOfAssignmentConcentrationAmongOrganizations,
  leadingOrganizationInPatentAssignments,
  marketShareOfPatentAssignmentsAmongTopOrganizations,
  organizationWithLargestYearIncreaseAssignments,
} from "./key";
import KeyDetail from "src/components/@analytics/key-detail";

interface Props {
  data: ICompetitorPortfolio[];
}

/**
 *
 */
const OrganizationAssignmentTakeaways = ({ data }: Props) => {
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const keywords = searchedKeywords.map((kwd) => kwd.value);

  const { data: competitorActivity } = useQuery(
    ["patents-activity", ...keywords],
    async () => {
      return await getPatentCompetitorActivity(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!competitorActivity) return;

    //
  }, [competitorActivity]);

  return (
    <>
      {competitorActivity && (
        <KeyDetail section="Key Takeaway">
          <Keytakeaway
            title={"Leading Organization in Patent Assignments"}
            description={leadingOrganizationInPatentAssignments(data as any)}
          />
          <Keytakeaway
            title={"Market Share of Patent Assignments Among Top Organizations"}
            description={marketShareOfPatentAssignmentsAmongTopOrganizations(data as any) || "N/A"}
            // }
          />
          <Keytakeaway
            title={"Organization with Largest Year-on-Year Increase in Assignments"}
            description={
              organizationWithLargestYearIncreaseAssignments(competitorActivity) || "N/A"
            }
          />
          <Keytakeaway
            title={"Comparison of Assignment Concentration Among Organizations"}
            description={
              comparisonOfAssignmentConcentrationAmongOrganizations(competitorActivity) || "N/A"
            }
          />
        </KeyDetail>
      )}
    </>
  );
};

export default OrganizationAssignmentTakeaways;
