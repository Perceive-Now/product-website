import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//
import ListItem from "../list-item";

//
import PageTitle from "../../reusable/page-title";
import DataSection from "../../reusable/data-section";

//
import { getCompetitors } from "../../../utils/api/dashboard";

//
import { ChevronRight } from "../../icons";

/*
 *
 **/
export default function Competitors(props: ICompetitorProps) {
  const navigate = useNavigate();

  //
  const handleViewMoreClick = () => {
    navigate(`/deep-search/companies`);
  };

  //
  const { data, isLoading, isError, error } = useQuery(
    ["dashboard-competitors-table", ...props.keywords],
    async () => {
      return await getCompetitors(props.keywords);
    },
    { enabled: !!props.keywords.length },
  );

  //
  const claimValues = (data?.Patent_claims ?? [])
    .map((item) => ({ title: item.company, value: item.claim_sum }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const patensValues = (data?.patents ?? [])
    .map((item) => ({ title: item.key, value: item.doc_count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const exptersValues = (data?.Inventors ?? [])
    .map((item) => ({ title: item.company, value: item.inventor_count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const publicationValues = (data?.Publications ?? [])
    .map((item) => ({ title: item.key, value: item.doc_count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  //
  return (
    <div>
      <DataSection
        keywords={props.keywords}
        isLoading={isLoading}
        isError={isError}
        error={error}
        title={
          <PageTitle
            title="Companies"
            // info={`This list of top companies was extracted from "X" no of publications and "Y" no of patents`}
            titleClass="font-semibold"
          />
        }
        className={props.keywords?.length > 0 ? "pb-0 rounded-b-none" : ""}
      >
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 my-3">
          <div>
            <p className="text-lg font-semibold text-primary-900 mb-2">Patents</p>

            <div className="grid grid-cols-9 mb-3">
              <div className="col-span-1" />
              <div className="col-span-6 font-semibold">Company Name</div>
              <div className="col-span-2 text-right pr-1 font-semibold">Patents</div>
            </div>

            {patensValues.map((itm, index) => (
              <ListItem name={itm.title} value={itm.value} index={index} key={index} />
            ))}
          </div>

          <div>
            <p className="text-lg font-semibold text-primary-900 mb-2">Patent Claims</p>

            <div className="grid grid-cols-9 mb-3">
              <div className="col-span-1" />
              <div className="col-span-5 font-semibold">Company Name</div>
              <div className="col-span-3 text-right pr-1 font-semibold">Patent Claims</div>
            </div>

            {claimValues.map((itm, index) => (
              <ListItem name={itm.title} value={itm.value} index={index} key={index} />
            ))}
          </div>
        </div>

        <div className="border-b border-gray-300 mb-6 pt-3" />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-lg font-semibold text-primary-900 mb-2">Inventors</p>

            <div className="grid grid-cols-9 mb-3">
              <div className="col-span-1" />
              <div className="col-span-6 font-semibold">Company Name</div>
              <div className="col-span-2 text-right pr-1 font-semibold">Inventors</div>
            </div>

            {exptersValues.map((itm, index) => (
              <ListItem name={itm.title} value={itm.value} index={index} key={index} />
            ))}
          </div>

          <div>
            <p className="text-lg font-semibold text-primary-900 mb-2">Publications</p>

            <div className="grid grid-cols-9 mb-3">
              <div className="col-span-1" />
              <div className="col-span-6 font-semibold">Company Name</div>
              <div className="col-span-2 text-right pr-1 font-semibold">Publications</div>
            </div>

            {publicationValues.map((itm, index) => (
              <ListItem name={itm.title} value={itm.value} index={index} key={index} />
            ))}
          </div>
        </div>
      </DataSection>

      {props.keywords?.length > 0 && !isLoading && (
        <div
          className="bg-primary-900 hover:bg-primary-600 p-1 text-white border-b-2 rounded-b-lg cursor-pointer"
          onClick={handleViewMoreClick}
        >
          <div className="flex justify-center">
            View more
            <ChevronRight className="ml-0.5 text-white" />
          </div>
        </div>
      )}
    </div>
  );
}

interface ICompetitorProps {
  keywords: string[];
}
