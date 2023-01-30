import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import type { ColumnDef } from "@tanstack/react-table";

//
import { LoadingIcon } from "../../../../../components/icons";

import Search from "../../../../../components/reusable/search";
import ReactTable from "../../../../../components/reusable/ReactTable";
import Pagination from "../../../../../components/reusable/pagination";
import RadioButtons from "../../../../../components/reusable/radio-buttons";
import RelatedKeyword from "../../../../../components/@product/relatedKeyword";

import type { IKeywordOption } from "../../../../../components/reusable/search";

//
import { setDashboardSearch } from "../../../../../stores/dashboard";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";

//
import { getRelatedKeywords } from "../../../../../utils/api/dashboard";
import { getDeepSearchPatentList } from "../../../../../utils/api/deep-search/patents";

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
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [classification, setClassification] = useState<classificationMode>("Industry");

  //
  const { data: relatedKeywords } = useQuery({
    queryKey: ["dashboard-most-related-keywords", ...keywords],
    queryFn: () => {
      return getRelatedKeywords(keywords);
    },
    enabled: !!keywords.length,
  });

  // Getting patent list
  const { data: patentList, isLoading } = useQuery({
    queryKey: [...keywords, classification, currentPage],
    queryFn: async () => {
      const response = await getDeepSearchPatentList({
        keywords,
        year: new Date().getFullYear() - 1,
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
      cell: (data) => <p className="line-clamp-1">{data.row.original.inventor || "-"}</p>,
      minSize: 200,
      maxSize: 200,
    },
    {
      header: "Abstract",
      cell: (data) => (
        <Link
          to={`/deep-search/patents/${data.row.original._id}`}
          className="text-gray-700 underline"
        >
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
  const changeClassificationMode = (mode: string) => {
    setClassification(mode as classificationMode);
  };

  //
  useEffect(() => {
    setCurrentPage(1);
  }, [searchedKeywords, classification]);

  //
  return (
    <div>
      {/* Search bar */}
      <div className="grid grid-cols-7 mb-1">
        <div className="col-span-4">
          <Search
            required
            size="small"
            className="w-full"
            onSubmit={handleSearch}
            initialValue={searchedKeywords}
          />

          {!!keywords.length && (
            <p className="mt-[4px]">
              <span>Showing patents for: </span>
              <span className="font-semibold">"{joinedkeywords}"</span>
            </p>
          )}
        </div>
      </div>

      {/* Classification */}
      <div className="flex justify-end">
        <RadioButtons
          activeMode={classification}
          handleModeChange={changeClassificationMode}
          options={[
            { label: "Industry", value: "Industry" },
            { label: "Academic", value: "Academic" },
          ]}
        />
      </div>

      {/* Main content */}
      <div>
        <p className="text-primary-900 text-[22px]">Patents</p>

        <div className="my-4">
          {!!keywords.length && isLoading ? (
            <div className="w-full h-[300px] flex justify-center items-center text-primary-600">
              <LoadingIcon width={40} height={40} />
            </div>
          ) : (
            <ReactTable columnsData={columnData} rowsData={finalPatentList} size="medium" />
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

//
type classificationMode = "Academic" | "Industry";
