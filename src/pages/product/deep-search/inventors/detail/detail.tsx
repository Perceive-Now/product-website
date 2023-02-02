import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Tooltip, TooltipProvider, TooltipWrapper } from "react-tooltip";

//
import { getDeepSearchPatentInventor } from "../../../../../utils/api/deep-search/inventors";

//
import { useAppSelector } from "../../../../../hooks/redux";

//
import { LoadingIcon } from "../../../../../components/icons";
import ReactTable from "../../../../../components/reusable/ReactTable";
import Pagination from "../../../../../components/reusable/pagination";
import AbstractModal from "../../../../../components/reusable/abstract-modal";
import ReportShareButtons from "../../../../../components/reusable/report-share-btns";

//
const PAGE_SIZE = 10;

/**
 *
 */
export default function DeepSearchInventorPage() {
  const { type } = useParams();
  const [searchParams] = useSearchParams();
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");

  //
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const keywords = searchedKeywords.map((kwd) => kwd.value);

  //
  const infoItem: IInfoItem[] = [
    {
      title: "Company/ University",
      value: "London's Global University",
    },
    {
      title: "No. of Patent ",
      value: 32,
    },
    {
      title: "Patent claims",
      value: 40,
    },
  ];

  //
  const patentColumnData: ColumnDef<IDeepSearchPatentListItem>[] = [
    {
      header: "Title",
      accessorKey: "title",
      cell: ({ row }) => (
        <span className="flex">
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
        </span>
      ),
      minSize: 330,
      maxSize: 330,
    },
    {
      header: "Organization",
      accessorKey: "company",
      cell: (data) => (
        <TooltipWrapper content={data.row.original.company}>
          <p className="line-clamp-1">{data.row.original.company || "-"}</p>
        </TooltipWrapper>
      ),
      minSize: 200,
      maxSize: 200,
    },
    {
      header: "Inventor",
      accessorKey: "inventor",
      cell: (data) => (
        <TooltipWrapper content={data.row.original.inventor}>
          <p className="line-clamp-1">{data.row.original.inventor || "-"}</p>
        </TooltipWrapper>
      ),
      minSize: 200,
      maxSize: 200,
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
      header: "Date (Y/M/D)",
      accessorKey: "date",
      minSize: 140,
      maxSize: 140,
    },
  ];

  // Getting patent detail
  const { data, isLoading } = useQuery({
    queryKey: [type, firstName, lastName],
    queryFn: async () => {
      if (!type || !firstName || !lastName) return;

      //
      const response = await getDeepSearchPatentInventor({
        firstName,
        lastName,
        keywords,
      });

      setTotalCount(response?.data?.count ?? 1);

      return response?.data?.data ?? [];
    },
    enabled: !!type || !!firstName || !!lastName,
  });

  //
  useEffect(() => {
    setCurrentPage(1);
  }, [searchedKeywords]);

  //
  if (isLoading) {
    return (
      <div className="flex w-full h-full justify-center items-center text-primary-600">
        <LoadingIcon width={40} height={40} />
      </div>
    );
  }

  const finalDataList = data ?? [];

  //
  return (
    <div>
      {/* Report share buttons section */}
      <div className="flex justify-end">
        <ReportShareButtons />
      </div>

      <div className="text-2xl leading-8 text-primary-900">
        {firstName} {lastName}
      </div>
      <div className="text-appGray-900 mt-2">London, England, UK</div>

      {/* Info section - These data amazingly have to be supplied from query params for now */}
      <div className="my-4 grid grid-cols-4 gap-3">
        {infoItem.map((item, index) => (
          <div
            className="col-span-1 rounded-lg p-2 bg-gray-100 shadow hover:bg-gray-200 hover:shadow-lg hover:-translate-y-[1px] h-11 flex flex-col justify-center items-center"
            key={index}
          >
            <p className="text-gray-700 mb-1">{item.title}</p>
            <p className="font-semibold">
              {item.value
                ? typeof item.value === "string"
                  ? item.value
                  : item.value.toLocaleString()
                : "-"}
            </p>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div>
        <p className="text-primary-900 text-[22px]">Patents</p>

        <TooltipProvider>
          <div className="my-4">
            {!!keywords.length && isLoading ? (
              <div className="w-full h-[300px] flex justify-center items-center text-primary-600">
                <LoadingIcon width={40} height={40} />
              </div>
            ) : (
              <ReactTable
                columnsData={type === "patent" ? patentColumnData : []}
                rowsData={finalDataList}
                size="medium"
              />
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
    </div>
  );
}

//
interface IInfoItem {
  title: string;
  value: string | number | null;
}
