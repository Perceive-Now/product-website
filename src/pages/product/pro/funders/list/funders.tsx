// import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Tooltip, TooltipProvider, TooltipWrapper } from "react-tooltip";

import type { ColumnDef } from "@tanstack/react-table";

//
import { LoadingIcon } from "../../../../../components/icons";

import Search from "../../../../../components/reusable/search";
import ReactTable from "../../../../../components/reusable/ReactTable";
import Pagination from "../../../../../components/reusable/pagination";
// import AbstractModal from "../../../../../components/reusable/abstract-modal";
import RelatedKeyword from "../../../../../components/@product/relatedKeyword";
// import TableYearSelect from "../../../../../components/reusable/table-year-select";

import type { IKeywordOption } from "../../../../../components/reusable/search";

//
import { setDashboardSearch } from "../../../../../stores/dashboard";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";

//
import { getRelatedKeywords } from "../../../../../utils/api/dashboard";
import {
  getDeepSearchFundersList,
  IDeepSearchFunderListItem,
} from "../../../../../utils/api/deep-search/funders";
import Button from "../../../../../components/reusable/button";
import { formatNumber } from "../../../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import SubHeader from "../../../../../components/app/sub-header";
import Filter from "../../../../../components/icons/chooseplan/filter";

//
const PAGE_SIZE = 10;

/**
 *
 */
export default function DeepSearchFundersListPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const keywords = searchedKeywords.map((kwd) => kwd.value);
  const joinedkeywords = keywords.join(", ");

  //
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // const [date, setDate] = useState<number>(2022);

  // const dateYearsOptions = useMemo(() => {
  //   const startYear = new Date().getFullYear() - 1;
  //   const yearsToInclude = 50;
  //   const endYear = startYear - yearsToInclude;

  //   const years = [];
  //   for (let i = startYear; i >= endYear; i--) {
  //     years.push({
  //       label: i.toString(),
  //       value: i,
  //     });
  //   }

  //   return years;
  // }, []);

  //
  const { data: relatedKeywords } = useQuery({
    queryKey: ["dashboard-most-related-keywords", ...keywords],
    queryFn: () => {
      return getRelatedKeywords(keywords);
    },
    enabled: !!keywords.length,
  });

  // Getting funders list
  const { data: fundersList, isLoading } = useQuery({
    queryKey: [...keywords, currentPage],
    queryFn: async () => {
      const lastYearValue = new Date().getFullYear() - 1;

      //
      const response = await getDeepSearchFundersList({
        keywords,
        year: lastYearValue,
        limit: PAGE_SIZE,
        offset: (currentPage - 1) * PAGE_SIZE + 1,
      });

      //
      setTotalCount(response?.count || 0);

      //
      return response?.data ?? [];
    },
    enabled: !!keywords.length,
  });

  const finalFundersList = fundersList ?? [];

  //
  const columnData: ColumnDef<IDeepSearchFunderListItem>[] = [
    {
      header: "Funder Name",
      accessorKey: "funder_name",
      cell: ({ row }) => (
        <TooltipWrapper content={row.original.title}>
          <span className="flex">
            <span className="mr-1">
              {((currentPage - 1) * PAGE_SIZE + row.index + 1).toString().padStart(2, "0")}.
            </span>
            {/* <Link
              className="line-clamp-1 text-primary-600 hover:underline"
              to={`/deep-search/funders/${row.original._id}`}
            > */}
            {row.original.title}
            {/* </Link> */}
          </span>
        </TooltipWrapper>
      ),
      minSize: 230,
      maxSize: 230,
    },
    {
      header: "Last Project title",
      accessorKey: "title",
      cell: ({ row }) => (
        <TooltipWrapper content={row.original.title}>
          <span className="flex">
            <span className="mr-1">
              {((currentPage - 1) * PAGE_SIZE + row.index + 1).toString().padStart(2, "0")}.
            </span>
            {/* <Link
              className="line-clamp-1 text-primary-600 hover:underline"
              to={`/deep-search/funders/${row.original._id}`}
            > */}
            {row.original.title}
            {/* </Link> */}
          </span>
        </TooltipWrapper>
      ),
      minSize: 230,
      maxSize: 230,
    },

    {
      header: "Funding amount",
      accessorKey: "funding_amount",
      cell: (data) => (
        <p className="line-clamp-1">
          {data.row.original.funding ? formatNumber(data.row.original.funding) : "-"}
          <span className="ml-0.5">USD</span>{" "}
        </p>
      ),
      minSize: 200,
      maxSize: 200,
    },
    {
      header: "Funding type",
      accessorKey: "funding_type",
      cell: (data) => (
        <p className="line-clamp-1 capitalize">{data.row.original.funding_type ?? "-"}</p>
      ),
      minSize: 200,
      maxSize: 200,
    },

    {
      header: "Award start date",
      accessorKey: "award_date",
      minSize: 140,
      maxSize: 140,
    },
    {
      header: "Award end date",
      accessorKey: "award_date",
      minSize: 140,
      maxSize: 140,
    },
    {
      header: " ",
      cell: ({ row }) => (
        <Button
          type="secondary"
          size="small"
          handleClick={() =>
            navigate(`/deep-search/funders/${encodeURIComponent(row.original._id)}`)
          }
        >
          Track
        </Button>
      ),
      minSize: 50,
      maxSize: 50,
    },
  ];

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };

  //
  useEffect(() => {
    setCurrentPage(1);
  }, [searchedKeywords]);

  //
  return (
    <div>
      <SubHeader title={"Funders"} analytics={"/funders"} table="/funders/table" />
      {/* Search bar */}
      <div>
        <div className="grid grid-cols-8 mb-1">
          <div className="col-span-1 w-full">
            <Filter />
          </div>
          <div className="col-span-6">
            {/* <div className="flex items-center w-full"> */}
            <Search
              required
              size="small"
              className="w-full"
              onSubmit={handleSearch}
              initialValue={searchedKeywords}
            />
            {/* </div> */}
          </div>
        </div>
        {keywords.length > 0 ? (
          <p className="mt-[4px]">
            <span>Showing patents for: </span>
            <span className="font-semibold">"{joinedkeywords}"</span>
          </p>
        ) : (
          <p className="mt-[4px] text-appGray-900">
            Search keywords e.g. “COVID-19” to see related patents.
          </p>
        )}
      </div>

      {!!keywords.length && (
        <>
          {/* Filter section */}
          {/* <div className="mt-3 mb-5 flex items-start">
            <span className="font-semibold text-appGray-900 mr-2">Filter by:</span>
            <TableYearSelect
              label="Date"
              placeholder="Date"
              onChange={(year) => setDate(year)}
              value={date}
              options={dateYearsOptions}
            />
          </div> */}

          {/* Main content */}
          <div>
            <p className="text-primary-900 text-[22px] my-4">Funders</p>

            <TooltipProvider>
              <div className="my-4">
                {!!keywords.length && isLoading ? (
                  <div className="w-full h-[300px] flex justify-center items-center text-primary-600">
                    <LoadingIcon width={40} height={40} />
                  </div>
                ) : (
                  <ReactTable columnsData={columnData} rowsData={finalFundersList} size="medium" />
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

            {/* Related keywords */}
            <div className="mt-5">
              <p className="mb-2 uppercase text-sm text-primary-900">Related Keywords</p>

              <div className="flex flex-wrap gap-1">
                {relatedKeywords?.related_keywords?.slice(0, 15)?.map((keyword, index) => (
                  <RelatedKeyword keyword={keyword} key={index} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
