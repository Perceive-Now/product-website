import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//
import type { ColumnDef } from "@tanstack/react-table";

//
import ReactTable from "../../../../components/reusable/ReactTable";
import RelatedKeyword from "../../../../components/@product/relatedKeyword";

//
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

//
import { getRelatedKeywords } from "../../../../utils/api/dashboard";
import {
  getDeepSearchPatentList,
  IDeepSearchPatentListItem,
} from "../../../../utils/api/deep-search/patents";
import Pagination from "../../../../components/reusable/pagination";
import Search, { IKeywordOption } from "../../../../components/reusable/search";
import { setDashboardSearch } from "../../../../stores/dashboard";

//
const PAGE_SIZE = 10;

//
export default function PatentListPage() {
  const dispatch = useAppDispatch();

  //
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const keywords = searchedKeywords.map((kwd) => kwd.value);
  const joinedkeywords = keywords.join(", ");

  //
  const [currentPage, setCurrentPage] = useState(0);

  //
  const { data: relatedKeywords } = useQuery(
    ["dashboard-most-related-keywords", ...keywords],
    async () => {
      return await getRelatedKeywords(keywords);
    },
    { enabled: !!keywords.length },
  );

  // Getting patent list
  const { data: patentList } = useQuery(
    ["deep-search-patent-list", ...keywords],
    async () => {
      return await getDeepSearchPatentList({
        keywords,
        year: new Date().getFullYear() - 1,
        limit: PAGE_SIZE,
        offset: currentPage * PAGE_SIZE + 1,
      });
    },
    { enabled: !!keywords.length },
  );

  const finalPatentList = patentList ?? [];

  //
  const columnData: ColumnDef<IDeepSearchPatentListItem>[] = [
    {
      header: "Title",
      accessorKey: "title",
      cell: (data) => <p className="line-clamp-1">{data.row.original.title || "-"}</p>,
      minSize: 330,
      maxSize: 330,
    },
    {
      header: "Organization",
      accessorKey: "company",
      cell: (data) => <p className="line-clamp-1">{data.row.original.company || "-"}</p>,
      minSize: 200,
      maxSize: 200,
    },
    {
      header: "Inventor",
      accessorKey: "inventor",
      cell: (data) => {
        const inventors = data.row.original.inventor;

        return (
          <div>
            <p className="line-clamp-1">{inventors[0].name || "-"}</p>
            {inventors.length > 1 && <p className="text-xs">+{inventors.length - 1} more</p>}
          </div>
        );
      },
      minSize: 200,
      maxSize: 200,
    },
    {
      header: "Abstract",
      cell: () => (
        <Link to={`/deep-search/patents/test`} className="text-gray-700 underline">
          View Abstract
        </Link>
      ),
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

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };

  //
  return (
    <div>
      {/* Search bar */}
      <div className="grid grid-cols-7 mb-4">
        <div className="col-span-4">
          <Search
            required
            size="small"
            className="w-full"
            onSubmit={handleSearch}
            initialValue={searchedKeywords}
          />

          <p className="mt-[4px]">
            <span>Showing patents for: </span>
            <span className="font-semibold">"{joinedkeywords}"</span>
          </p>
        </div>
      </div>

      {/* Main content */}
      <div>
        <p className="text-primary-900 text-[22px]">Patents</p>

        <div className="my-4">
          <ReactTable columnsData={columnData} rowsData={finalPatentList} size="medium" />
        </div>

        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage + 1}
            gotoPage={(pageNumer) => setCurrentPage(pageNumer)}
            totalCount={finalPatentList.length}
          />
        </div>
      </div>

      {/* Related keywords */}
      {keywords.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 uppercase text-sm text-primary-900">Related Keywords</p>

          <div className="flex flex-wrap gap-1">
            {relatedKeywords?.related_keywords?.slice(0, 15)?.map((keyword, index) => (
              <RelatedKeyword keyword={keyword} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
