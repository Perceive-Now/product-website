import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { Tooltip, TooltipProvider, TooltipWrapper } from "react-tooltip";

import type { ColumnDef } from "@tanstack/react-table";

//
import { LoadingIcon } from "../../../../../components/icons";

import Pagination from "../../../../../components/reusable/pagination";
import ReactTable from "../../../../../components/reusable/ReactTable";
import AbstractModal from "../../../../../components/reusable/abstract-modal";

//
import { getDeepSearchComapniesPatentItem } from "../../../../../utils/api/deep-search/companies";
import type { IDeepSearchCompanyPatentSingleItem } from "../../../../../utils/api/deep-search/companies";

//
import { useAppSelector } from "../../../../../hooks/redux";
import Breadcrumb from "../../../../../components/reusable/breadcrumb";
import { Tab } from "@headlessui/react";
import classNames from "classnames";

//
const PAGE_SIZE = 10;

//
export default function DeepSearchCompanyPatent() {
  const [searchParam] = useSearchParams();

  //
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const keywords = searchedKeywords.map((kwd) => kwd.value);

  //
  const [companyName, patentCount, patentClaimSum, inventorCount] = [
    searchParam.get("name"),
    searchParam.get("p"),
    searchParam.get("pc"),
    searchParam.get("i"),
  ];

  //
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Getting company patent detail
  const { data: patentData, isLoading } = useQuery({
    queryKey: [...keywords, companyName, currentPage],
    queryFn: async () => {
      if (!companyName) return;

      //
      const response = await getDeepSearchComapniesPatentItem({
        keywords: keywords,
        name: companyName,
        limit: PAGE_SIZE,
        offset: (currentPage - 1) * PAGE_SIZE + 1,
      });

      //
      setTotalCount(response.count);

      //
      return response;
    },
    enabled: !!companyName,
  });

  //
  const finalData = patentData?.data ?? [];

  //
  const infoItem: IInfoItem[] = [
    {
      title: "Total Patents",
      value: patentCount,
    },
    {
      title: "Total Inventors",
      value: patentClaimSum,
    },
    {
      title: "Total Patent claims",
      value: inventorCount,
    },
  ];

  //
  const columnsData: ColumnDef<IDeepSearchCompanyPatentSingleItem>[] = [
    {
      header: "Patent title",
      accessorKey: "title",
      minSize: 400,
      maxSize: 400,
      cell: ({ row }) => (
        <p className="flex">
          <span className="mr-1">
            {((currentPage - 1) * PAGE_SIZE + row.index + 1).toString().padStart(2, "0")}.
          </span>
          <TooltipWrapper content={row.original.title}>
            <Link
              className="line-clamp-1 text-primary-600 hover:underline"
              to={`/deep-search/patents/${row.original._id}`}
            >
              {row.original.title}
            </Link>
          </TooltipWrapper>
        </p>
      ),
    },
    {
      header: "Company name/University name",
      accessorKey: "company",
      minSize: 330,
      maxSize: 330,
      cell: (data) => (
        <p className="line-clamp-1">
          <TooltipWrapper content={data.row.original.company}>
            {data.row.original.company}
          </TooltipWrapper>
        </p>
      ),
    },
    {
      header: "Inventors",
      accessorKey: "company",
      minSize: 330,
      maxSize: 330,
      cell: (data) => (
        <p className="line-clamp-1">
          <TooltipWrapper content={data.row.original.company}>
            {data.row.original.company}
          </TooltipWrapper>
        </p>
      ),
    },
    {
      header: "Examiner (Art group)",
      accessorKey: "company",
      minSize: 330,
      maxSize: 330,
      cell: (data) => (
        <p className="line-clamp-1">
          <TooltipWrapper content={data.row.original.company}>
            {data.row.original.company}
          </TooltipWrapper>
        </p>
      ),
    },
    {
      header: "Abstract",
      cell: (data) => {
        const originalData = data.row.original;

        return (
          <AbstractModal
            type="Patent"
            data={{
              id: originalData._id,
              title: originalData.title,
              abstract: originalData.abstract,
            }}
            viewPath={`/deep-search/patents/${originalData._id}`}
          />
        );
      },
      minSize: 130,
      maxSize: 130,
    },
    {
      header: "Published date",
      accessorKey: "date",
      minSize: 170,
      maxSize: 170,
    },
  ];

  const inventorsColumn: ColumnDef<IDeepSearchCompanyPatentSingleItem>[] = [
    {
      header: "Inventor Name",
      accessorKey: "inventor_name",
      minSize: 330,
      maxSize: 330,
      cell: (data) => (
        <p className="line-clamp-1">
          <TooltipWrapper content={data.row.original.company}>
            {data.row.original.company}
          </TooltipWrapper>
        </p>
      ),
    },
    {
      header: "City, Country",
      accessorKey: "city",
      minSize: 330,
      maxSize: 330,
      cell: (data) => (
        <p className="line-clamp-1">
          <TooltipWrapper content={data.row.original.company}>
            {data.row.original.company}
          </TooltipWrapper>
        </p>
      ),
    },
    {
      header: "No. of publications",
      accessorKey: "company",
      minSize: 330,
      maxSize: 330,
      cell: (data) => (
        <p className="line-clamp-1">
          <TooltipWrapper content={data.row.original.company}>
            {data.row.original.company}
          </TooltipWrapper>
        </p>
      ),
    },
    {
      header: "No. of citations",
      accessorKey: "no_of_citations",
      minSize: 330,
      maxSize: 330,
      cell: (data) => (
        <p className="line-clamp-1">
          <TooltipWrapper content={data.row.original.company}>
            {data.row.original.company}
          </TooltipWrapper>
        </p>
      ),
    },
  ];

  //
  return (
    <div>
      <Breadcrumb breadCrumbs={breadcrumbs} />
      <div className="text-2xl leading-8 text-primary-900 mt-4">
        {companyName ? <span>{companyName}</span> : <span>Microsoft Corporation</span>}
      </div>
      <p>Washington DC</p>

      {/* Info section - These data amazingly have to be supplied from query params for now */}
      <Tab.Group>
        <div className="mx-auto w-3/5">
          <Tab.List className="my-4 grid grid-cols-3 gap-3">
            {infoItem.map((item, index) => (
              <Tab
                className={({ selected }) =>
                  classNames(
                    "col-span-1 rounded-lg p-2 hover:shadow-lg hover:-translate-y-[1px] h-11 flex flex-col justify-center items-center",
                    selected
                      ? "bg-primary-900 text-white font-bold"
                      : "text-secondary-800 bg-gray-100 shadow hover:bg-gray-200",
                  )
                }
                key={index}
              >
                <p className=" mb-1 ">{item.title}</p>
                <p className="font-semibold">{item.value ? (+item.value).toLocaleString() : "-"}</p>
              </Tab>
            ))}
          </Tab.List>
        </div>

        {/* Actual data section */}
        <Tab.Panels>
          <Tab.Panel>
            <div>
              <p className="text-[22px] text-primary-900">List of patents</p>
              <TooltipProvider>
                <div className="my-4">
                  {!!keywords.length && isLoading ? (
                    <div className="w-full h-[300px] flex justify-center items-center text-primary-600">
                      <LoadingIcon width={40} height={40} />
                    </div>
                  ) : (
                    <ReactTable columnsData={columnsData} rowsData={finalData} />
                  )}
                </div>

                <Tooltip className="tooltip" float />
              </TooltipProvider>

              <div className="flex justify-center">
                <Pagination
                  page={currentPage}
                  total={Math.ceil(totalCount / PAGE_SIZE)}
                  onChange={(pageNum) => setCurrentPage(pageNum)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div>
              <p className="text-[22px] text-primary-900">List of inventors</p>

              <TooltipProvider>
                <div className="my-4">
                  {!!keywords.length && isLoading ? (
                    <div className="w-full h-[300px] flex justify-center items-center text-primary-600">
                      <LoadingIcon width={40} height={40} />
                    </div>
                  ) : (
                    <ReactTable columnsData={inventorsColumn} rowsData={finalData} />
                  )}
                </div>

                <Tooltip className="tooltip" float />
              </TooltipProvider>

              <div className="flex justify-center">
                <Pagination
                  page={currentPage}
                  total={Math.ceil(totalCount / PAGE_SIZE)}
                  onChange={(pageNum) => setCurrentPage(pageNum)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div>
              <p className="text-[22px] text-primary-900">List of patents</p>

              <TooltipProvider>
                <div className="my-4">
                  {!!keywords.length && isLoading ? (
                    <div className="w-full h-[300px] flex justify-center items-center text-primary-600">
                      <LoadingIcon width={40} height={40} />
                    </div>
                  ) : (
                    <ReactTable columnsData={columnsData} rowsData={finalData} />
                  )}
                </div>

                <Tooltip className="tooltip" float />
              </TooltipProvider>

              <div className="flex justify-center">
                <Pagination
                  page={currentPage}
                  total={Math.ceil(totalCount / PAGE_SIZE)}
                  onChange={(pageNum) => setCurrentPage(pageNum)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

//
interface IInfoItem {
  title: string;
  value: string | null;
}

const breadcrumbs = [
  { title: "Companies", link: "/companies" },
  { title: "Companies Details", link: "/patents/1" },
];
