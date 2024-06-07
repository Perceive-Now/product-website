import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Tooltip, TooltipProvider, TooltipWrapper } from "react-tooltip";
import { ColumnDef } from "@tanstack/react-table";

//
import Search from "../../../../../components/reusable/search";
import Pagination from "../../../../../components/reusable/pagination";
import ReactTable from "../../../../../components/reusable/ReactTable";
// import RadioButtons from "../../../../../components/reusable/radio-buttons";
import RelatedKeyword from "../../../../../components/@product/relatedKeyword";
// import TableYearSelect from "../../../../../components/reusable/table-year-select";

import type { IKeywordOption } from "../../../../../components/reusable/search";
import AbstractModal from "../../../../../components/reusable/abstract-modal";
import CitationModal from "../../../../../components/reusable/citation-modal";

//
import { LoadingIcon } from "../../../../../components/icons";

//
import { useAppSelector } from "../../../../../hooks/redux";
import { setDashboardSearch } from "../../../../../stores/dashboard";

//
import type { IDeepSearchPublicationListItem } from "../../../../../utils/api/deep-search/publications";

//
import { getRelatedKeywords } from "../../../../../utils/api/dashboard";
import { getDeepSearchPublicationList } from "../../../../../utils/api/deep-search/publications";
import TableShareButton from "../../../../../components/reusable/TableShareButton";
import SubHeader from "../../../../../components/app/sub-header";

//
const PAGE_SIZE = 10;

/**
 *
 */
export default function PublicationListPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];

  const keywords = searchedKeywords.map((kwd) => kwd.value);
  const joinedkeywords = keywords.join(", ");

  const paramsClassification: string | null = searchParams.get("mode");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedPublishedYear, setSelectedPublishedYear] = useState<number>(2022);
  //
  const [classification, setClassification] = useState<classificationMode>("Industry");
  //
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  //
  useEffect(() => {
    if (paramsClassification) {
      if (paramsClassification === "Industry" || paramsClassification === "Academic") {
        setClassification(paramsClassification);
      }
    }
  }, [paramsClassification]);

  //
  const { data: relatedKeywords } = useQuery(
    ["dashboard-most-related-keywords", ...keywords],
    async () => {
      return await getRelatedKeywords(keywords);
    },
    { enabled: !!keywords.length },
  );

  // const publishYearsOptions = useMemo(() => {
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

  // Getting publication list
  const { data: publicationsList, isLoading } = useQuery({
    queryKey: [...keywords, classification, selectedPublishedYear, currentPage],
    queryFn: async () => {
      const response = await getDeepSearchPublicationList({
        keywords,
        year: selectedPublishedYear ? selectedPublishedYear : new Date().getFullYear() - 1,
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

  const finalPublicationList = publicationsList ?? [];

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };

  //
  // const changeClassificationMode = (mode: string) => {
  //   setClassification(mode as classificationMode);
  // };

  //
  const openColumnData: ColumnDef<IDeepSearchPublicationListItem>[] = [
    {
      header: "Publication Name",
      accessorKey: "title",
      cell: (data) => (
        <TooltipWrapper content={data.row.original.title}>
          <span className="flex">
            <span className="mr-1">
              {((currentPage - 1) * PAGE_SIZE + data.row.index + 1).toString().padStart(2, "0")}.
            </span>

            <Link
              to={`/deep-search/publications/${encodeURIComponent(
                data.row.original._id,
              )}?source=Open`}
              className="text-primary-600 hover:underline line-clamp-1"
            >
              {data.row.original.title}
            </Link>
          </span>
        </TooltipWrapper>
      ),
      minSize: 160,
      maxSize: 160,
    },
    {
      header: "Journel Name",
      accessorKey: "journel_name",
      cell: (data) => (
        <TooltipWrapper content={data.row.original.journal_name}>
          <p className="line-clamp-1">{data.row.original.journal_name || "-"}</p>
        </TooltipWrapper>
      ),
      minSize: 130,
      maxSize: 130,
    },
    {
      header: "DOI",
      accessorKey: "doi_url",
      cell: (data) => (
        <a
          href={data.row.original.doi_url || "#"}
          className="line-clamp-1"
          target="_blank"
          rel="noreferrer"
        >
          {data.row.original.doi_url || "-"}
        </a>
      ),
      minSize: 130,
      maxSize: 130,
    },
    {
      header: "Citation",
      cell: ({ row }) => (
        <CitationModal
          author={row.original?.citiation?.author}
          date={row.original?.citiation?.date}
          publisher={row.original?.citiation?.publisher}
          title={row.original?.citiation?.title}
        />
      ),
      minSize: 150,
      maxSize: 150,
    },
    {
      header: " ",
      cell: (data) => (
        <TableShareButton
          path={`/deep-search/publications/${encodeURIComponent(
            data.row.original._id,
          )}?source=Open`}
        />
      ),
      minSize: 200,
      maxSize: 200,
    },
  ];

  const closedColumnData: ColumnDef<IDeepSearchPublicationListItem>[] = [
    {
      header: "Publication Name",
      accessorKey: "title",
      cell: (data) => (
        <TooltipWrapper content={data.row.original.title}>
          <span className="flex">
            <span className="mr-1">
              {((currentPage - 1) * PAGE_SIZE + data.row.index + 1).toString().padStart(2, "0")}.
            </span>

            <Link
              to={`/deep-search/publications/${encodeURIComponent(
                data.row.original._id,
              )}?source=Closed`}
              className="text-primary-600 hover:underline line-clamp-1"
            >
              {data.row.original.title || "-"}
            </Link>
          </span>
        </TooltipWrapper>
      ),
      minSize: 160,
      maxSize: 160,
    },
    {
      header: "Abstract",
      accessorKey: "abstract",
      cell: ({ row }) => (
        <AbstractModal
          data={{
            title: row.original.title,
            abstract: row.original.abstract,
            id: row.original._id,
          }}
          viewPath={`/deep-search/publications/${encodeURIComponent(
            row.original._id,
          )}?source=Closed`}
          type="Publication"
        />
      ),
      minSize: 130,
      maxSize: 130,
    },
    {
      header: "Citation",
      cell: ({ row }) => (
        <CitationModal
          author={row.original?.citiation?.author}
          date={row.original?.citiation?.date}
          publisher={row.original?.citiation?.publisher}
          title={row.original?.citiation?.title}
        />
      ),
      minSize: 150,
      maxSize: 150,
    },
    {
      header: " ",
      cell: (data) => (
        <TableShareButton
          path={`/deep-search/publications/${encodeURIComponent(
            data.row.original._id,
          )}?source=Closed`}
        />
      ),
      minSize: 200,
      maxSize: 200,
    },
  ];

  //
  useEffect(() => {
    setCurrentPage(1);
  }, [classification]);

  //
  return (
    <div>
      <SubHeader title={"Publications"} analytics={"/publications"} table="/publications/table" />
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
      {/* <div className="flex justify-end">
        <RadioButtons
          activeMode={classification}
          handleModeChange={changeClassificationMode}
          options={[
            { label: "Industry closed access", value: "Industry" },
            { label: "Academic closed access", value: "Academic" },
            { label: "Open access", value: "Open" },
          ]}
        />
      </div> */}

      {!!keywords.length && (
        <>
          {/* Filter section */}
          {/* <div className="mb-5 flex items-start">
            <span className="font-semibold text-appGray-900 mr-2">Filter by:</span>
            <TableYearSelect
              label="Publication Date"
              placeholder="Publication Date"
              onChange={(year) => setSelectedPublishedYear(year)}
              value={selectedPublishedYear}
              options={publishYearsOptions}
            />
          </div> */}

          {/* Main content */}
          <div>
            <p className="text-primary-900 text-[22px] mb-4">Publications</p>

            <TooltipProvider>
              <div className="my-4">
                {!!keywords.length && isLoading ? (
                  <div className="w-full h-[300px] flex justify-center items-center text-primary-600">
                    <LoadingIcon width={40} height={40} />
                  </div>
                ) : (
                  <ReactTable
                    size="small"
                    rowsData={finalPublicationList}
                    columnsData={classification === "Open" ? openColumnData : closedColumnData}
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

          {/* Related keywords */}
          <div className="mt-5">
            <p className="mb-2 uppercase text-sm text-primary-900">Related Keywords</p>

            <div className="flex flex-wrap gap-1">
              {relatedKeywords?.related_keywords?.slice(0, 15)?.map((keyword, index) => (
                <RelatedKeyword keyword={keyword} key={index} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Industry and Academic are closed source, open is open source.
type classificationMode = "Industry" | "Academic" | "Open";
