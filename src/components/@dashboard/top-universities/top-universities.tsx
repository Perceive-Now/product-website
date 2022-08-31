import PageTitle from "../../reusable/page-title";

/**
 *
 */
export default function TopUniversities() {
  return (
    <div className="w-100 border bg-white rounded-lg p-3">
      <PageTitle
        title="Top 3 Universities with Highest Research Footprint"
        titleClass="font-bold"
      />

      <div className="mt-3 grid grid-cols-3 gap-x-3">
        {topUniversitiesData.map((uniData) => (
          <div key={uniData.id} className="border px-3 py-4 rounded-2xl">
            <div>
              <div className="text-primary-900 font-semibold text-xl">
                {uniData.title}
              </div>

              <div className="text-gray-800 text-lg">{uniData.location}</div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-2">
              <div className="border-b-2 border-b-gray-300 pb-0.5">
                <div className="text-gray-800 text-2xl font-semibold">
                  {uniData.publication}
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
                  {uniData.funding}
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

const topUniversitiesData = [
  {
    id: 1,
    title: "John Hopkins University",
    location: "Baltimore, Maryland, US",
    publication: "3,492",
    patents: "9",
    funding: "+$90.3M",
  },
  {
    id: 2,
    title: "John Hopkins University",
    location: "Baltimore, Maryland, US",
    publication: "3,492",
    patents: "9",
    funding: "+$90.3M",
  },
  {
    id: 3,
    title: "John Hopkins University",
    location: "Baltimore, Maryland, US",
    publication: "3,492",
    patents: "9",
    funding: "+$90.3M",
  },
];
