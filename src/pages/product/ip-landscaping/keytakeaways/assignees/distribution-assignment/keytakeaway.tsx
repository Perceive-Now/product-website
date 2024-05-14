import KeyDetail from "../../../../../../components/@dashboard/IP-landscaping/key-detail";
import Keytakeaway from "../../../../../../components/reusable/keytakeaways";
import {
  IAssigneeData,
  countryLeadingInPatentAssignments,
  shiftsInGeographicalPatternsOfAssignments,
} from "./key";

interface Props {
  data: IAssigneeData[];
}

const GeographicalDistributionAssignmentTakeaways = ({ data }: Props) => {
  return (
    <>
      {data && (
        <KeyDetail section="Key Takeaway">
          <Keytakeaway
            title={"Country Leading in Patent Assignments"}
            description={countryLeadingInPatentAssignments(data) || "N/A"}
          />
          <Keytakeaway title={"Regional Growth in Patent Assignments"} description={"N/A"} />
          <Keytakeaway
            title={"City-Level Concentration of Patent Assignments"}
            description={"N/A"}
          />
          <Keytakeaway
            title={"Shifts in Geographical Patterns of Assignments"}
            description={shiftsInGeographicalPatternsOfAssignments(data) || "N/A"}
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
