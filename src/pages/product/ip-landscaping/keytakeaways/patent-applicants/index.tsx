import { useQuery } from "@tanstack/react-query";
import KeyDetail from "../../../../../components/@dashboard/IP-landscaping/key-detail";
import Keytakeaway from "../../../../../components/reusable/keytakeaways";
import { useAppSelector } from "../../../../../hooks/redux";
import { getPatentApplicantType } from "../../../../../utils/api/charts";
import { useEffect } from "react";
import { marketShareOfApplicationsByApplicantType } from "./patent-applicant";

const PatentApplicantKeyTakeaways = () => {
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const keywords = searchedKeywords.map((kwd) => kwd.value);

  const { data } = useQuery(
    ["patents-application-type", ...keywords],
    async () => {
      return await getPatentApplicantType(keywords);
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
        <KeyDetail section="Applicants" subtitle="Number of Applications by Applicant Type">
          <Keytakeaway
            title={"Market Share of Applications by Applicant Type"}
            description={marketShareOfApplicationsByApplicantType(data)}
          />
          <Keytakeaway
            title={"Trend in Applicant Type Over Time"}
            description={marketShareOfApplicationsByApplicantType(data)}
          />
          <Keytakeaway
            title={"Market Share of Applications by Applicant Type"}
            description={marketShareOfApplicationsByApplicantType(data)}
          />
          <Keytakeaway
            title={"Market Share of Applications by Applicant Type"}
            description={marketShareOfApplicationsByApplicantType(data)}
          />
          <Keytakeaway
            title={"Market Share of Applications by Applicant Type"}
            description={marketShareOfApplicationsByApplicantType(data)}
          />
        </KeyDetail>
      )}
    </>
  );
};

export default PatentApplicantKeyTakeaways;
