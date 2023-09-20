import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//
import Accordion from "../../../../../components/reusable/accordion";
import ReactTable from "../../../../../components/reusable/ReactTable";

import { LoadingIcon } from "../../../../../components/icons";

//
import { getDeepSearchPatentItemDetail } from "../../../../../utils/api/deep-search/patents";

//
import {
  applicantColumnData,
  assigneeColumnData,
  inventorColumnData,
  attorneyColumnData,
  cpcColumnData,
  examinerColumnData,
  foreignCitationColumnData,
  usPatentCitationColumnData,
  wipoColumnData,
} from "./columns";

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
            <p className="text-xl font-bold">Abstract:</p>
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

      {/* Different tables */}
      <div className="mt-10 flex flex-col gap-5">
        {/* Attorney list */}
        <div className="border border-gray-200 shadow-lg rounded-xl p-2">
          <Accordion title="Attorney">
            <ReactTable columnsData={attorneyColumnData} rowsData={patentData?.attorney ?? []} />
          </Accordion>
        </div>

        {/* Examier list */}
        <div className="border border-gray-200 shadow-lg rounded-xl p-2">
          <Accordion title="Examiner">
            <ReactTable columnsData={examinerColumnData} rowsData={patentData?.examiner ?? []} />
          </Accordion>
        </div>

        {/* Foreign Citation list */}
        <div className="border border-gray-200 shadow-lg rounded-xl p-2">
          <Accordion title="Foreign citation">
            <ReactTable
              columnsData={foreignCitationColumnData}
              rowsData={patentData?.foreign_citation ?? []}
            />
          </Accordion>
        </div>

        {/* CPC list */}
        <div className="border border-gray-200 shadow-lg rounded-xl p-2">
          <Accordion title="CPC">
            <ReactTable columnsData={cpcColumnData} rowsData={patentData?.cpc ?? []} size="small" />
          </Accordion>
        </div>

        {/* Assignee list */}
        <div className="border border-gray-200 shadow-lg rounded-xl p-2">
          <Accordion title="Assignee">
            <ReactTable
              columnsData={assigneeColumnData}
              rowsData={patentData?.assignee ?? []}
              size="small"
            />
          </Accordion>
        </div>

        {/* Applicant list */}
        <div className="border border-gray-200 shadow-lg rounded-xl p-2">
          <Accordion title="Applicant">
            <ReactTable
              columnsData={applicantColumnData}
              rowsData={patentData?.applicant ?? []}
              size="small"
            />
          </Accordion>
        </div>

        {/* Inventor list */}
        <div className="border border-gray-200 shadow-lg rounded-xl p-2">
          <Accordion title="Inventor">
            <ReactTable
              columnsData={inventorColumnData}
              rowsData={patentData?.inventor ?? []}
              size="small"
            />
          </Accordion>
        </div>

        {/* WIPO list */}
        <div className="border border-gray-200 shadow-lg rounded-xl p-2">
          <Accordion title="WIPO">
            <ReactTable columnsData={wipoColumnData} rowsData={patentData?.wipo ?? []} />
          </Accordion>
        </div>

        {/* US Patent Citation list */}
        <div className="border border-gray-200 shadow-lg rounded-xl p-2">
          <Accordion title="US patent citation">
            <ReactTable
              columnsData={usPatentCitationColumnData}
              rowsData={patentData?.us_patent_citation ?? []}
            />
          </Accordion>
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
