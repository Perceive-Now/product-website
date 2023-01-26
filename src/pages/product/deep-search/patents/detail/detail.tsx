import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//
import { LoadingIcon } from "../../../../../components/icons";

//
import { getDeepSearchPatentItemDetail } from "../../../../../utils/api/deep-search/patents";

/**
 *
 */
export default function PatentDetailPage() {
  const { id } = useParams();

  // Getting patent detail
  const { data: patentData, isLoading } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      if (!id) return;

      //
      return await getDeepSearchPatentItemDetail(id);
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex w-full h-full justify-center items-center text-primary-600">
        <LoadingIcon width={40} height={40} />
      </div>
    );
  }

  //
  return (
    <div>
      <div className="grid grid-cols-11 gap-x-5">
        <div className="col-span-7">
          <p className="text-2xl text-primary-900 font-semibold">{patentData?.title}</p>

          <div className="mt-3 text-gray-700">
            <p className="text-xl font-bold">Abstract</p>
            <p className="mt-2">{patentData?.abstract}</p>
          </div>
        </div>

        <div className="col-span-4 text-gray-700">
          <p className="text-xl font-bold">Details:</p>
          <div className="mt-3 flex flex-col gap-2">
            <DetailItem title="Patent number:" value={patentData?.id} />
            <DetailItem title="Patent type:" value={patentData?.type} />
            <DetailItem title="Patent date:" value={patentData?.date} />
            <DetailItem title="WIPO kind:" value={patentData?.wipo_kind} />
            <DetailItem title="Number of claims:" value={patentData?.num_claims} />
            <DetailItem title="Withdrawn:" value={patentData?.withdrawn} />
          </div>
        </div>
      </div>
    </div>
  );
}

//
function DetailItem(props: IDetailItemProps) {
  return (
    <div className="flex">
      <p className="w-[190px] font-bold">{props.title}</p>
      <p>{props.value ?? "-"}</p>
    </div>
  );
}

//
interface IDetailItemProps {
  title: string;
  value?: string | number;
}
