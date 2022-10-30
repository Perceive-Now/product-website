import { useQuery } from "@tanstack/react-query";

//
import PageTitle from "../../reusable/page-title";

//
import { formatNumber } from "../../../utils/helpers";
import { getTop3Universities } from "../../../utils/api/dashboard";

/**
 *
 */
export default function TopUniversities(props: ITopUniversitiesProps) {
  const { data } = useQuery(
    ["dashboard-top-universities", ...props.keywords],
    async () => {
      return await getTop3Universities(props.keywords);
    },
    { enabled: !!props.keywords.length }
  );

  const finalData = data ?? [];

  return (
    <div className="w-100 border bg-white rounded-lg p-3 shadow">
      <PageTitle
        title="Top 3 Universities with Highest Research Footprint"
        titleClass="font-bold"
        info={`This list was extracted from "X" total number of universities worldwide`}
      />

      <div className="mt-3 grid grid-cols-3 gap-x-3">
        {finalData.map((uniData, index) => (
          <div key={index} className="border px-3 py-4 rounded-2xl shadow-sm">
            <div>
              <div className="text-primary-900 font-semibold text-xl">
                {uniData.universityName}
              </div>

              <div className="text-gray-800 text-lg">
                {uniData.locationText}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-2">
              <div className="border-b-2 border-b-gray-300 pb-0.5">
                <div className="text-gray-800 text-2xl font-semibold">
                  {uniData.publications}
                </div>

                <div className="text-gray-800">Publications</div>
              </div>

              <div className="border-b-2 border-b-gray-300 pb-0.5">
                <div className="text-gray-800 text-2xl font-semibold">
                  {uniData.patents}
                </div>

                <div className="text-gray-800">Patents</div>
              </div>

              <div className="border-b-2 border-b-gray-300 mt-3 pb-0.5">
                <div className="text-gray-800 text-2xl font-semibold">
                  {formatNumber(uniData.fundingReceived, { isCurrency: true })}
                </div>

                <div className="text-gray-800 mt-0.5">Funding Received</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ITopUniversitiesProps {
  keywords: string[];
}
