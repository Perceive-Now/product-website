import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

//
import RelatedKeyword from "../../../../components/@product/relatedKeyword";

//
import PageTitle from "../../../../components/reusable/page-title";
import ReactTable from "../../../../components/reusable/ReactTable";
import Pagination from "../../../../components/reusable/pagination";
import Search, { IKeywordOption } from "../../../../components/reusable/search";

//
import { getRelatedKeywords } from "../../../../utils/api/dashboard";
import { getExperts, IExpertItem } from "../../../../utils/api/advance-search";

//
import { setDashboardSearch } from "../../../../stores/dashboard";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

/**
 *
 */
export default function ExpertsPage() {
  const dispatch = useAppDispatch();
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search);

  //
  const [currentPage, setCurrentPage] = useState<number>(1);

  const joinedKeywords = searchedKeywords?.map((kwd) => `"${kwd.value}"`).join(", ");

  const keywords = searchedKeywords?.map((kwd) => kwd.value) ?? [];

  const { data: expertsDataRaw, isLoading } = useQuery(
    ["advanced-search-experts", ...keywords],
    async () => {
      return await getExperts(keywords);
    },
    { enabled: !!searchedKeywords?.length },
  );

  const expertsData = isLoading ? [] : expertsDataRaw?.data?.resultsList ?? [];

  //
  const { data: relatedKeywords } = useQuery(
    ["dashboard-most-related-keywords", ...keywords],
    async () => {
      return await getRelatedKeywords(keywords);
    },
    { enabled: !!keywords.length },
  );

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };

  //
  const columns: ColumnDef<IExpertItem>[] = [
    {
      header: "Expert",
      accessorKey: "expertName",
      accessorFn: (row) => row.expertName ?? "-",
    },
    {
      header: "Company/University",
      accessorKey: "affiliationName",
    },
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Patents",
      id: "patentsCount",
      accessorFn: (row) => row.patentsCount ?? "-",
      minSize: 100,
    },
    {
      header: "Papers",
      accessorKey: "publicationsCount",
      accessorFn: (row) => row.publicationsCount ?? "-",
      minSize: 100,
    },
  ];

  //
  const gotoPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="w-1/2">
        <Search initialValue={searchedKeywords} onSubmit={handleSearch} />
      </div>

      {searchedKeywords && searchedKeywords.length > 0 && (
        <div className="my-3">
          <p className="text-sm">
            <span className="text-gray-700">Showing active experts for:</span>
            <span className="font-semibold ml-1">{joinedKeywords}</span>
          </p>

          <div className="my-3">
            <PageTitle
              title="Experts"
              learnMore={`Expert trends are extracted from approx. 31 million authors and inventors of 96 million publications & 7 million patents respectively. These analytics allow you to uncover the top active experts for collaboration, outsourcing & network expansion.`}
            />
          </div>

          <div>
            <ReactTable columnsData={columns} rowsData={expertsData} />
          </div>

          <div className="flex justify-center mt-7">
            <Pagination currentPage={currentPage} totalCount={111} gotoPage={gotoPage} />
          </div>

          <div className="mt-5">
            <div className="uppercase font-semibold text-primary-900 text-sm mb-2">
              Related keywords
            </div>

            <div className="flex flex-wrap gap-x-2 gap-y-1 items-start">
              {relatedKeywords?.related_keywords?.slice(0, 15)?.map((keyword) => (
                <RelatedKeyword keyword={keyword} key={keyword} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
