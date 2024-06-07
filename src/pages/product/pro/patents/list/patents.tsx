import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tooltip, TooltipProvider, TooltipWrapper } from "react-tooltip";

import type { ColumnDef } from "@tanstack/react-table";

//
import { LoadingIcon } from "../../../../../components/icons";

import Search from "../../../../../components/reusable/search";
import ReactTable from "../../../../../components/reusable/ReactTable";
import Pagination from "../../../../../components/reusable/pagination";
import RadioButtons from "../../../../../components/reusable/radio-buttons";
import AbstractModal from "../../../../../components/reusable/abstract-modal";
// import RelatedKeyword from "../../../../../components/@product/relatedKeyword";
// import TableYearSelect from "../../../../../components/reusable/table-year-select";

import type { IKeywordOption } from "../../../../../components/reusable/search";

//
import { setDashboardSearch } from "../../../../../stores/dashboard";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";

//
import { getRelatedKeywords } from "../../../../../utils/api/dashboard";
import { getDeepSearchPatentList } from "../../../../../utils/api/deep-search/patents";
import TableShareButton from "../../../../../components/reusable/TableShareButton";
import SubHeader from "../../../../../components/app/sub-header";

//
const PAGE_SIZE = 10;

//
export default function PatentListPage() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const paramsClassification: string | null = searchParams.get("mode");

  //
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const keywords = searchedKeywords.map((kwd) => kwd.value);
  const joinedkeywords = keywords.join(", ");

  //
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [classification, setClassification] = useState<classificationMode>("Industry");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [publishedYear, setPublishedYear] = useState<number>(2022);

  //
  useEffect(() => {
    if (paramsClassification) {
      if (paramsClassification === "Industry" || paramsClassification === "Academic") {
        setClassification(paramsClassification);
      }
    }
  }, [paramsClassification]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const publishYearsOptions = useMemo(() => {
    const startYear = new Date().getFullYear() - 1;
    const yearsToInclude = 50;
    const endYear = startYear - yearsToInclude;

    const years = [];
    for (let i = startYear; i >= endYear; i--) {
      years.push({
        label: i.toString(),
        value: i,
      });
    }

    return years;
  }, []);

  //
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: relatedKeywords } = useQuery({
    queryKey: ["dashboard-most-related-keywords", ...keywords],
    queryFn: () => {
      return getRelatedKeywords(keywords);
    },
    enabled: !!keywords.length,
  });

  // Getting patent list
  const { data: patentList, isLoading } = useQuery({
    queryKey: [...keywords, classification, currentPage, publishedYear],
    queryFn: async () => {
      const lastYearValue = new Date().getFullYear() - 1;

      //
      const response = await getDeepSearchPatentList({
        keywords,
        year: publishedYear ?? lastYearValue,
        limit: PAGE_SIZE,
        offset: (currentPage - 1) * PAGE_SIZE + 1,
        classification,
      });

      //
      setTotalCount(response.count);

      //
      return response?.data ?? [];
    },
    enabled: !!keywords.length,
  });

  const finalPatentList = patentList ?? [];

  //
  const columnData: ColumnDef<IDeepSearchPatentListItem>[] = [
    {
      header: "Title",
      accessorKey: "title",
      cell: ({ row }) => (
        <TooltipWrapper content={row.original.title}>
          <span className="flex">
            <span className="mr-1">
              {((currentPage - 1) * PAGE_SIZE + row.index + 1).toString().padStart(2, "0")}.
            </span>
            <Link
              className="line-clamp-1 text-primary-600 hover:underline"
              to={`/deep-search/patents/${row.original._id}`}
            >
              {row.original.title}
            </Link>
          </span>
        </TooltipWrapper>
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
    {
      header: " ",
      cell: (data) => <TableShareButton path={`/deep-search/patents/${data.row.original._id}`} />,
      minSize: 140,
      maxSize: 140,
    },
  ];

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };

  //
  const changeClassificationMode = (mode: string) => {
    setClassification(mode as classificationMode);
  };

  //
  useEffect(() => {
    setCurrentPage(1);
  }, [searchedKeywords, classification, publishedYear]);

  //
  return (
    <div>
      <div>
        <SubHeader title={"Patents"} analytics={"/patents"} table="/patents/table" />
      </div>
      {/* Search bar */}
      <div>
        <div className="grid grid-cols-8 mb-1">
          <div className="col-span-1 w-full"></div>
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

      {/* Classification */}
      <div className="flex justify-end">
        <RadioButtons
          activeMode={classification}
          handleModeChange={changeClassificationMode}
          options={[
            { label: "Companies", value: "Industry" },
            { label: "Universities", value: "Academic" },
          ]}
        />
      </div>

      {!!keywords.length && (
        <>
          {/* Filter section */}
          {/* <div className="mb-5 flex items-start">
            <span className="font-semibold text-appGray-900 mr-2">Filter by:</span>
            <TableYearSelect
              label="Published Date"
              placeholder="Published Date"
              onChange={(year) => setPublishedYear(year)}
              value={publishedYear}
              options={publishYearsOptions}
            />
          </div> */}

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
                  <ReactTable columnsData={columnData} rowsData={finalPatentList} size="medium" />
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

          {/* Related keywords */}
          {/* {keywords.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 uppercase text-sm text-primary-900">Related Keywords</p>

              <div className="flex flex-wrap gap-1">
                {relatedKeywords?.related_keywords?.slice(0, 15)?.map((keyword, index) => (
                  <RelatedKeyword keyword={keyword} key={index} />
                ))}
              </div>
            </div>
          )} */}
        </>
      )}
    </div>
  );
}

//
export type classificationMode = "Academic" | "Industry";
