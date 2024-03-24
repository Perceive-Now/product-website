import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import classNames from "classnames";

//
import Accordion from "../../../../../components/reusable/accordion";
import ReactTable from "../../../../../components/reusable/ReactTable";

import { BookmarkIcon, LoadingIcon } from "../../../../../components/icons";

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
  pctColumnData,
  ipcColumnData,
} from "./columns";
import Breadcrumb from "../../../../../components/reusable/breadcrumb";

/**
 *
 */
export default function PatentDetailPage() {
  const { id } = useParams();

  const [categories] = useState({
    Abstract: [],
    Claims: [],
    Details: [],
  });

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
      <Breadcrumb breadCrumbs={breadcrumbs} />
      <div className="grid grid-cols-11 gap-x-5">
        <div className="col-span-8">
          <p className="text-2xl text-primary-900 font-semibold">
            {patentData?.title ?? "Translation of artificial intelligence representations"}
          </p>
          {/* <PatentDetailTab /> */}
          <div className="w-full px-2 py-16 sm:px-0 mt-2">
            <Tab.Group>
              <Tab.List className="flex space-x-[2px] rounded-lg border overflow-hidden ">
                {Object.keys(categories).map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        "w-full py-1 text-lg font-semibold leading-5 ",
                        selected ? "bg-primary-900 text-white" : "text-secondary-800 bg-gray-300",
                      )
                    }
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-2">
                {/* abstract-tab */}
                <Tab.Panel>
                  <h6 className="font-bold text-xl">Abstract</h6>
                  <p className="text-secondary-800 mt-1">
                    A method for controlling an electronic apparatus includes storing a plurality of
                    artificial intelligence models in a first memory, based on receiving a control
                    signal for loading a first artificial intelligence model among the plurality of
                    stored artificial intelligence models into a second memory, identifying an
                    available memory size of the second memory, and based on a size of the first
                    artificial intelligence model being larger than the available memory size of the
                    second memory, obtaining a first compression artificial intelligence model by
                    compressing the first artificial intelligence model based om the available
                    memory size of the second memory, and loading the first compression artificial
                    intelligence model into the second memory.
                  </p>
                </Tab.Panel>
                {/* claims-tab */}
                <Tab.Panel>
                  <h6 className="font-bold text-xl">Claims</h6>
                  <div className="text-secondary-800 mt-1">
                    <ul className="list-decimal	ml-2">
                      <li>
                        A method for controlling an electronic apparatus, the method
                        comprising:storing a plurality of artificial intelligence models in a first
                        memory;based on receiving a control signal for loading a first artificial
                        intelligence model among the plurality of stored artificial intelligence
                        models into a second memory, identifying an available memory size of the
                        second memory;based on a size of the first artificial intelligence model
                        being smaller than the available memory size of the second memory, loading
                        the first artificial intelligence model into the second memory;based on the
                        size of the first artificial intelligence model being larger than the
                        available memory size of the second memory, obtaining a first compression
                        artificial intelligence model by compressing the first artificial
                        intelligence model based on the available memory size of the second
                        memory;identifying whether a performance of the first compression artificial
                        intelligence model satisfies a predetermined condition; andbased on the
                        performance of the first compression artificial intelligence model
                        satisfying the predetermined condition, loading the first compression
                        artificial intelligence model into the second memory.
                      </li>
                      <li>
                        The method as claimed in claim 1, further comprising: based on the
                        performance of the first compression artificial intelligence model not
                        satisfying the predetermined condition, obtaining a second compression
                        artificial intelligence model obtained by compressing the first artificial
                        intelligence model using a different method than the first compression
                        artificial intelligence model, and loading the second compression artificial
                        intelligence model into the second memory.
                      </li>
                      <li>
                        The method as claimed in claim 2, wherein the performance of the first
                        compression artificial intelligence model is any one or any combination of a
                        processor share rate of the first compression artificial intelligence model,
                        the size of the first compression artificial intelligence model, and an
                        accuracy of the first compression artificial intelligence model.
                      </li>
                      <li>
                        The method as claimed in claim 2, further comprising:based on a plurality of
                        compression artificial intelligence models obtained by compressing the first
                        artificial intelligence model using a plurality of methods not satisfying
                        the predetermined condition, displaying a message notifying that the
                        predetermined condition is not satisfied.
                      </li>
                    </ul>
                  </div>
                </Tab.Panel>
                {/* Details tab */}
                <Tab.Panel>
                  {/* Different tables */}
                  <div className="mt-10 flex flex-col gap-5">
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
                        <ReactTable
                          columnsData={wipoColumnData}
                          rowsData={patentData?.wipo ?? []}
                        />
                      </Accordion>
                    </div>
                    {/* CPC list */}
                    <div className="border border-gray-200 shadow-lg rounded-xl p-2">
                      <Accordion title="CPC">
                        <ReactTable
                          columnsData={cpcColumnData}
                          rowsData={patentData?.cpc ?? []}
                          size="small"
                        />
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
                    {/* PCT */}
                    <div className="border border-gray-200 shadow-lg rounded-xl p-2">
                      <Accordion title="PCT">
                        <ReactTable
                          columnsData={pctColumnData}
                          rowsData={patentData?.cpc ?? []}
                          size="small"
                        />
                      </Accordion>
                    </div>
                    {/* IPC */}
                    <div className="border border-gray-200 shadow-lg rounded-xl p-2">
                      <Accordion title="IPC">
                        <ReactTable
                          columnsData={ipcColumnData}
                          rowsData={patentData?.cpc ?? []}
                          size="small"
                        />
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
                    {/* Attorney list */}
                    <div className="border border-gray-200 shadow-lg rounded-xl p-2">
                      <Accordion title="Attorney">
                        <ReactTable
                          columnsData={attorneyColumnData}
                          rowsData={patentData?.attorney ?? []}
                        />
                      </Accordion>
                    </div>
                    {/* Examier list */}
                    <div className="border border-gray-200 shadow-lg rounded-xl p-2">
                      <Accordion title="Examiner">
                        <ReactTable
                          columnsData={examinerColumnData}
                          rowsData={patentData?.examiner ?? []}
                        />
                      </Accordion>
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
          {/* <div className="mt-3 text-gray-700">
            <p className="text-xl font-bold">Abstract:</p>
            <p className="mt-2">{patentData?.abstract}</p>
          </div> */}
        </div>
        <div className="col-span-3 text-gray-700">
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">Summary</p>
            <button type="button" className="flex items-center gap-x-0.5">
              <BookmarkIcon />
              <span>Save</span>
            </button>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <DetailItem title="Patent number:" value={patentData?.id} />
            <DetailItem title="Patent type:" value={patentData?.type} />
            <DetailItem title="Filed date:" value={patentData?.date} />
            <DetailItem title="Grant date:" value={patentData?.date} />
            <DetailItem title="WIPO kind:" value={patentData?.wipo_kind} />
            <DetailItem title="USPC:" value={patentData?.wipo_kind} />
            <DetailItem title="CPC:" value={patentData?.wipo_kind} />
            <DetailItem title="Number of claims:" value={patentData?.num_claims} />
            <DetailItem title="Documented cited:" value={patentData?.withdrawn} />
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

const breadcrumbs = [
  { title: "Patents", link: "/patents" },
  { title: "Patent Details", link: "/patents/1" },
];
