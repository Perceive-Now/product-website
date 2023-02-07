import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { LoadingIcon } from "../../../../../components/icons";
import { getDeepSearchFunderDetail } from "../../../../../utils/api/deep-search/funders";

export default function DeepSearchFunderPage() {
  const { id } = useParams();
  const decodedId = decodeURIComponent(id ?? "");

  // Getting publication detail
  const { data, isLoading } = useQuery({
    queryKey: ["funders", id],
    queryFn: async () => {
      if (!decodedId) return;

      //
      return await getDeepSearchFunderDetail(decodedId);
    },
    enabled: !!decodedId,
  });

  if (isLoading) {
    return (
      <div className="flex w-full h-full justify-center items-center text-primary-600">
        <LoadingIcon width={40} height={40} />
      </div>
    );
  }

  //
  const infoItem: IInfoItem[] = [
    {
      title: "Funder",
      accessor: "funder",
    },
    {
      title: "Lead investigator",
      accessor: "lead_investigator",
    },
    {
      title: "Award amount",
      accessor: "funding",
    },
  ];
  return (
    <div>
      {/* Report share buttons section */}
      {/* <div className="flex justify-end">
    <ReportSaveButtons />
  </div> */}

      <div className="text-2xl leading-8 text-primary-900">{data?.title}</div>

      <div className="my-4 grid grid-cols-12 gap-3">
        {infoItem.map((item, index) => (
          <div
            className="col-span-4 rounded-lg p-3 bg-gray-100 shadow hover:bg-gray-200 hover:shadow-lg hover:-translate-y-[1px]  flex flex-col justify-center items-center"
            key={index}
          >
            <p className="text-gray-700 mb-1">{item.title}</p>
            <p className="text-center text-appGray-900">
              {data ? data[item.accessor] || "-" : "-"}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-12 gap-x-5">
        <div className="col-span-9">
          <div className="text-appGray-900 font-bold text-xl mb-2">Project Abstract</div>

          <div className="text-appGray-900">{data?.abstract}</div>
        </div>

        <div className="col-span-3">
          <div className="text-appGray-900 font-bold text-xl mb-3">Detail</div>

          <div className="grid grid-cols-3">
            <div className="font-bold text-appGray-900 col-span-2 mb-2">Funding type:</div>

            <div className="col-span-1 text-appGray-900 capitalize">
              {data?.funding_type || "-"}
            </div>

            {/*  */}
            <div className="font-bold text-appGray-900 col-span-2 mb-2">Award start date:</div>

            <div className="col-span-1 text-appGray-900">{data?.award_start_date || "-"}</div>

            {/* */}
            <div className="font-bold text-appGray-900 col-span-2 mb-2">Award end date:</div>

            <div className="col-span-1 text-appGray-900">{data?.award_end_date || "-"}</div>

            {/*  */}
            <div className="font-bold text-appGray-900 col-span-2 mb-2">Organization type:</div>

            <div className="col-span-1 text-appGray-900">-</div>
          </div>
        </div>
      </div>
    </div>
  );
}

//
interface IInfoItem {
  title: string;
  accessor: "funder" | "lead_investigator" | "funding";
}
