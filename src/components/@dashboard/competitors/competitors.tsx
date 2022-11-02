import { useQuery } from "@tanstack/react-query";

//
import ListItem from "../list-item";
import PageTitle from "../../reusable/page-title";

//
import { getCompetitors } from "../../../utils/api/dashboard";

/*
 *
 **/
export default function Competitors(props: ICompetitorProps) {
  const { data } = useQuery(
    ["dashboard-competitors-table", ...props.keywords],
    async () => {
      return await getCompetitors(props.keywords);
    },
    { enabled: !!props.keywords.length }
  );

  const claimValues = Object.entries(data?.claimsCount ?? {})
    .map(([key, value]) => ({ name: key, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const patensValues = Object.entries(data?.patentsCount ?? {})
    .map(([key, value]) => ({ name: key, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const exptersValues = Object.entries(data?.expertsCount ?? {})
    .map(([key, value]) => ({ name: key, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const publicationValues = Object.entries(data?.publicationsCount ?? {})
    .map(([key, value]) => ({ name: key, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const tempData = [
    {
      name: "Hello world",
      value: 1234,
    },
    {
      name: "Hello world",
      value: 1234,
    },
    {
      name: "Hello world",
      value: 1234,
    },
    {
      name: "Hello world",
      value: 1234,
    },
    {
      name: "Hello world",
      value: 1234,
    },
  ];

  return (
    <div className="mt-2 rounded-2xl border border-gray-200 shadow">
      <div className="pt-4 px-3">
        <PageTitle
          title="Competitors"
          info={`This list of top competitors was extracted from "X" no of publications and "Y" no of patents`}
          titleClass="font-bold"
          subTitle={`"Company name 1" has the largest number of patents. The leading expert in "company name 1" is "expert name 1". The most recent patent filed by them was titled “Title of the most recent patent published by company name 1"`}
        />
      </div>

      <div className="mt-4 px-3">
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-3">
          <div>
            <p className="text-lg font-semibold text-primary-900 mb-2">
              Patents
            </p>

            <div className="grid grid-cols-9 mb-3">
              <div className="col-span-1" />
              <div className="col-span-6 font-semibold">Company Name</div>
              <div className="col-span-2 text-right pr-1 font-semibold">
                Patents
              </div>
            </div>

            {patensValues.map((itm, index) => (
              <ListItem
                name={itm.name}
                value={itm.value}
                index={index}
                key={index}
              />
            ))}
          </div>

          <div>
            <p className="text-lg font-semibold text-primary-900 mb-2">
              Patents Claim
            </p>

            <div className="grid grid-cols-9 mb-3">
              <div className="col-span-1" />
              <div className="col-span-5 font-semibold">Company Name</div>
              <div className="col-span-3 text-right pr-1 font-semibold">
                Patents Claims
              </div>
            </div>

            {claimValues.map((itm, index) => (
              <ListItem
                name={itm.name}
                value={itm.value}
                index={index}
                key={index}
              />
            ))}
          </div>
        </div>

        <div className="border-b border-gray-300 mb-6 pt-3" />

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <p className="text-lg font-semibold text-primary-900 mb-2">
              Experts
            </p>

            <div className="grid grid-cols-9 mb-3">
              <div className="col-span-1" />
              <div className="col-span-6 font-semibold">Company Name</div>
              <div className="col-span-2 text-right pr-1 font-semibold">
                Experts
              </div>
            </div>

            {exptersValues.map((itm, index) => (
              <ListItem
                name={itm.name}
                value={itm.value}
                index={index}
                key={index}
              />
            ))}
          </div>

          <div>
            <p className="text-lg font-semibold text-primary-900 mb-2">
              Publications
            </p>

            <div className="grid grid-cols-9 mb-3">
              <div className="col-span-1" />
              <div className="col-span-6 font-semibold">Company Name</div>
              <div className="col-span-2 text-right pr-1 font-semibold">
                Publications
              </div>
            </div>

            {publicationValues.map((itm, index) => (
              <ListItem
                name={itm.name}
                value={itm.value}
                index={index}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ICompetitorProps {
  keywords: string[];
}
