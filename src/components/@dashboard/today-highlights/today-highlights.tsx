import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//
import PageTitle from "../../reusable/page-title";
import DataSection from "../../reusable/data-section";

//
import { formatNumber } from "../../../utils/helpers";
import { getTodaysHighlight } from "../../../utils/api/dashboard";

/*
 *
 **/
export default function TodayHighlights(props: IHighlightsProps) {
  const { data, isLoading } = useQuery(
    ["dashboard-today-highlights", ...props.keywords],
    async () => {
      return await getTodaysHighlight(props.keywords);
    },
    { enabled: !!props.keywords.length }
  );

  //
  const finalData = [
    {
      id: "patentsCount",
      name: "Patents",
      value: data?.patentsCount,
      link: "/",
    },
    {
      id: "industryPublicationsCount",
      name: "Industry Publications",
      value: data?.industryPublicationsCount,
      link: "/",
    },
    {
      id: "industryExpertsCount",
      name: "Industry Inventors",
      value: data?.industryExpertsCount,
      link: "/",
    },
    {
      id: "fundingAmount",
      name: "Funding Amount (USD)",
      value: data?.fundingAmount,
      link: "/",
    },
    {
      id: "academicPublicationsCount",
      name: "Academic Publications",
      value: data?.academicPublicationsCount,
      link: "/",
    },
    {
      id: "academicExpertsCount",
      name: "Academic Inventors",
      value: data?.academicExpertsCount,
      link: "/",
    },
  ];

  //
  const getItemValue = (id: string, value?: number) => {
    if (!value) return null;

    //
    return id === "fundingAmount"
      ? formatNumber(value, { isCurrency: true })
      : value.toLocaleString();
  };

  //
  return (
    <DataSection
      keywords={props.keywords}
      isLoading={isLoading}
      title={
        <PageTitle
          title="Today's Highlights"
          titleClass="font-semibold"
          info="Global Technology Trends shows a quick view of number of patents, publication, experts and funding in your area of interest"
        />
      }
    >
      <div className="text-gray-800 text-lg font-medium">
        Global Technology Trends
      </div>

      <div className="mt-3 grid grid-cols-3 gap-x-3  gap-y-3">
        {finalData.map((item, index) => (
          <div
            key={index}
            className="px-6 py-3 rounded-2xl flex items-center justify-center"
          >
            <div className="max-w-[240px] w-full">
              <div className="text-center text-md mb-2 capitalize">
                {item.name}
              </div>

              <div className="text-center text-[28px] mb-2 text-gray-900">
                {getItemValue(item.id, item.value) ?? "-"}
              </div>

              <hr className="border-[#D9D9D9]" />

              <div className="text-center pt-2">
                <div className="cursor-pointer text-purple-600">
                  <Link to={item.link}>View All</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DataSection>
  );
}

interface IHighlightsProps {
  keywords: string[];
}
