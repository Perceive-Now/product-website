import { useQuery } from "@tanstack/react-query";

//
import ListItem from "../list-item";

//
import PageTitle from "../../reusable/page-title";
import DataSection from "../../reusable/data-section";

//
import { getTopUniversities } from "../../../utils/api/dashboard";

/**
 *
 */
export default function TopUniversities(props: ITopUniversitiesProps) {
  const { data, isLoading, isError, error } = useQuery(
    ["dashboard-top-universities", ...props.keywords],
    async () => {
      return await getTopUniversities(props.keywords);
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

  const expertsValues = (data?.Inventors ?? [])
    .map((item) => ({ title: item.company, value: item.inventor_count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const publicationValues = (data?.Publications ?? [])
    .map((item) => ({ title: item.key, value: item.doc_count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  //
  return (
    <DataSection
      keywords={props.keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle
          title="Top Universities with Highest Research Footprint"
          subTitle='"Company name 1" has the largest number of patents. The leading inventor in "company name 1" is "inventor name 1". The most recent patent filed by them was titled “Title of the most recent patent published by company name 1"'
          titleClass="font-semibold"
          info={`This list was extracted from "X" total number of universities worldwide`}
        />
      }
    >
      <div className="grid grid-cols-2 gap-y-3 gap-x-4 my-3">
        <div>
          <p className="text-lg font-semibold text-primary-900 mb-2">Patents</p>

          <div className="grid grid-cols-9 mb-3">
            <div className="col-span-1" />
            <div className="col-span-6 font-semibold">University Name</div>
            <div className="col-span-2 text-right pr-1 font-semibold">Patents</div>
          </div>

          {patensValues.map((itm, index) => (
            <ListItem name={itm.title} value={itm.value} index={index} key={index} />
          ))}
        </div>

        <div>
          <p className="text-lg font-semibold text-primary-900 mb-2">Patents Claim</p>

          <div className="grid grid-cols-9 mb-3">
            <div className="col-span-1" />
            <div className="col-span-5 font-semibold">University Name</div>
            <div className="col-span-3 text-right pr-1 font-semibold">Patents Claims</div>
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
            <div className="col-span-6 font-semibold">University Name</div>
            <div className="col-span-2 text-right pr-1 font-semibold">Inventors</div>
          </div>

          {expertsValues.map((itm, index) => (
            <ListItem name={itm.title} value={itm.value} index={index} key={index} />
          ))}
        </div>

        <div>
          <p className="text-lg font-semibold text-primary-900 mb-2">Publications</p>

          <div className="grid grid-cols-9 mb-3">
            <div className="col-span-1" />
            <div className="col-span-6 font-semibold">University Name</div>
            <div className="col-span-2 text-right pr-1 font-semibold">Publications</div>
          </div>

          {publicationValues.map((itm, index) => (
            <ListItem name={itm.title} value={itm.value} index={index} key={index} />
          ))}
        </div>
      </div>
    </DataSection>
  );
}

interface ITopUniversitiesProps {
  keywords: string[];
}
