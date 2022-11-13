import { useQuery } from "@tanstack/react-query";

//
import ListItem from "../list-item";
import PageTitle from "../../reusable/page-title";

//
import { getTopUniversities } from "../../../utils/api/dashboard";

/**
 *
 */
export default function TopUniversities(props: ITopUniversitiesProps) {
  const { data } = useQuery(
    ["dashboard-top-universities", ...props.keywords],
    async () => {
      return await getTopUniversities(props.keywords);
    },
    { enabled: !!props.keywords.length }
  );

  const finalData = data ?? [];

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
    <div className="w-100 border bg-white rounded-lg p-3 shadow">
      <PageTitle
        title="Top Universities with Highest Research Footprint"
        subTitle='"Company name 1" has the largest number of patents. The leading expert in "company name 1" is "expert name 1". The most recent patent filed by them was titled “Title of the most recent patent published by company name 1"'
        titleClass="font-bold"
        info={`This list was extracted from "X" total number of universities worldwide`}
      />

      <div className="mt-4 px-3">
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-3">
          <div>
            <p className="text-lg font-semibold text-primary-900 mb-2">
              Patents
            </p>

            <div className="grid grid-cols-9 mb-3">
              <div className="col-span-1" />
              <div className="col-span-6 font-semibold">University Name</div>
              <div className="col-span-2 text-right pr-1 font-semibold">
                Patents
              </div>
            </div>

            {tempData.map((itm, index) => (
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
              <div className="col-span-5 font-semibold">University Name</div>
              <div className="col-span-3 text-right pr-1 font-semibold">
                Patents Claims
              </div>
            </div>

            {tempData.map((itm, index) => (
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
              <div className="col-span-6 font-semibold">University Name</div>
              <div className="col-span-2 text-right pr-1 font-semibold">
                Experts
              </div>
            </div>

            {tempData.map((itm, index) => (
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
              <div className="col-span-6 font-semibold">University Name</div>
              <div className="col-span-2 text-right pr-1 font-semibold">
                Publications
              </div>
            </div>

            {tempData.map((itm, index) => (
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

interface ITopUniversitiesProps {
  keywords: string[];
}
