import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import type { ColumnDef } from "@tanstack/react-table";

//
import { LoadingIcon } from "../../../../../components/icons";

import Pagination from "../../../../../components/reusable/pagination";
import ReactTable from "../../../../../components/reusable/ReactTable";

//
import { getDeepSearchComapniesPatentItem } from "../../../../../utils/api/deep-search/companies";
import type { IDeepSearchCompanyPatentSingleItem } from "../../../../../utils/api/deep-search/companies";

//
import { useAppSelector } from "../../../../../hooks/redux";

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
      title: "Number of Patents",
      value: patentCount,
    },
    {
      title: "Number of Patent claims",
      value: patentClaimSum,
    },
    {
      title: "Number of Inventors",
      value: inventorCount,
    },
  ];

  //
  const columnsData: ColumnDef<IDeepSearchCompanyPatentSingleItem>[] = [
    {
      header: "Title",
      accessorKey: "title",
      minSize: 400,
      maxSize: 400,
      cell: (data) => <p className="line-clamp-1">{data.row.original.title}</p>,
    },
    {
      header: "Owner",
      accessorKey: "company",
      minSize: 330,
      maxSize: 330,
      cell: (data) => <p className="line-clamp-1">{data.row.original.company}</p>,
    },
    {
      header: "Abstract",
      cell: () => <p className="text-underline">View Abstract</p>,
      minSize: 130,
      maxSize: 130,
    },
    {
      header: "Date (Y/M/D)",
      accessorKey: "date",
      minSize: 170,
      maxSize: 170,
    },
  ];

  //
  return (
    <div>
      <div className="text-2xl leading-8 text-primary-900">{companyName}</div>

      {/* Info section - These data amazingly have to be supplied from query params for now */}
      <div className="my-4 grid grid-cols-4 gap-3">
        {infoItem.map((item, index) => (
          <div
            className="col-span-1 rounded-lg p-2 bg-gray-100 shadow hover:bg-gray-200 hover:shadow-lg hover:-translate-y-[1px] h-11 flex flex-col justify-center items-center"
            key={index}
          >
            <p className="text-gray-700 mb-1">{item.title}</p>
            <p className="font-semibold">{item.value ? (+item.value).toLocaleString() : "-"}</p>
          </div>
        ))}
      </div>

      {/* Actual data section */}
      <div>
        <p className="text-[22px] text-primary-900">Patents</p>

        <div className="my-4">
          {!!keywords.length && isLoading ? (
            <div className="w-full h-[300px] flex justify-center items-center text-primary-600">
              <LoadingIcon width={40} height={40} />
            </div>
          ) : (
            <ReactTable columnsData={columnsData} rowsData={finalData} />
          )}
        </div>

        <div className="flex justify-center">
          <Pagination
            page={currentPage}
            total={Math.ceil(totalCount / PAGE_SIZE)}
            onChange={(pageNum) => setCurrentPage(pageNum)}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

//
interface IInfoItem {
  title: string;
  value: string | null;
}
