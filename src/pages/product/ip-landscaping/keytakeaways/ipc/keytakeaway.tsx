import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { useAppSelector } from "../../../../../hooks/redux";
import { getPatentCompetitorPortfolio } from "../../../../../utils/api/charts";
import KeyDetail from "../../../../../components/@dashboard/IP-landscaping/key-detail";
import Keytakeaway from "../../../../../components/reusable/keytakeaways";

const IPCKeyTakeaway = () => {
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
            title={"Leading IPC Class"}
            // description={leadingOrganizationInPatentAssignments(data as any)}
          />
          <Keytakeaway
            title={"Growth Trend in IPC Class Applications"}
            // description={marketShareOfPatentAssignmentsAmongTopOrganizations(data as any)}
            // }
          />
          <Keytakeaway
            title={"Comparison of IPC Class Dominance"}
            // description={cityWithHighestConcentrationOfApplicants(data as any)}
          />
          <Keytakeaway
            title={"Year with Most Diverse IPC Class Filings"}
            // description={shiftInGeographicalFocusOfApplicants(data as any)}
          />
        </KeyDetail>
      )}
    </>
  );
};

export default IPCKeyTakeaway;
