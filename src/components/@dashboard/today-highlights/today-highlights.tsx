import PageTitle from "../../reusable/page-title";

/*
 *
 **/
export default function TodayHighlights() {
  return (
    <div className="w-100 border bg-white rounded-lg p-3">
      <PageTitle title="Today's Highlights" titleClass="font-bold" />
      <div className="text-gray-800 text-lg font-medium">
        Global Technology Trends
      </div>

      <div className="mt-3 grid grid-cols-3 gap-x-3">
        {TodayHighlightsData.map((uniData) => {
          return (
            <div key={uniData.id} className="border px-6 py-3 rounded-2xl">
              <div>{uniData.title}</div>
              <div>{uniData.value}</div>
              <div>{uniData.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const TodayHighlightsData = [
  {
    id: 1,
    title: "Patents",
    value: "513",
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
