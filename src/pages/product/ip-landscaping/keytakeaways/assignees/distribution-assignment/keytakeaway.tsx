import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { useAppSelector } from "../../../../../../hooks/redux";
import { getPatentCompetitorPortfolio } from "../../../../../../utils/api/charts";
import KeyDetail from "../../../../../../components/@dashboard/IP-landscaping/key-detail";
import Keytakeaway from "../../../../../../components/reusable/keytakeaways";

const GeographicalDistributionAssignmentTakeaways = () => {
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
          <Keytakeaway title={"Country Leading in Patent Assignments"} description={"N/A"} />
          <Keytakeaway title={"Regional Growth in Patent Assignments"} description={"N/A"} />
          <Keytakeaway
            title={"City-Level Concentration of Patent Assignments"}
            description={"N/A"}
          />
          <Keytakeaway
            title={"Shifts in Geographical Patterns of Assignments"}
            description={"N/A"}
          />
          <Keytakeaway
            title={"International Collaboration in Patent Assignments"}
            description={"N/A"}
          />
        </KeyDetail>
      )}
    </>
  );
};

export default GeographicalDistributionAssignmentTakeaways;
