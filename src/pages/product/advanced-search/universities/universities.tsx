import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import RelatedKeyword from "../../../../components/@product/relatedKeyword";

//
import PageTitle from "../../../../components/reusable/page-title";
import Pagination from "../../../../components/reusable/pagination";
import Search, { IKeywordOption } from "../../../../components/reusable/search";

//
import { getRelatedKeywords } from "../../../../utils/api/dashboard";

//
import { setDashboardSearch } from "../../../../stores/dashboard";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import Tooltip from "../../../../components/reusable/tooltip";
import { VerticalThreeDots } from "../../../../components/icons";
import ReactTable from "../../../../components/reusable/ReactTable";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import {
  getUniversities,
  IUniversityItem,
} from "../../../../utils/api/advance-search";

/**
 *
 */
export default function UniversitiesPage() {
  const dispatch = useAppDispatch();
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search);

  //
  const [currentPage, setCurrentPage] = useState<number>(1);

  const joinedKeywords = searchedKeywords
    ?.map((kwd) => `"${kwd.value}"`)
    .join(", ");

  const keywords = searchedKeywords?.map((kwd) => kwd.value) ?? [];

  const { data, isLoading } = useQuery(
    ["advanced-search-universities", ...keywords],
    async () => {
      return await getUniversities(keywords);
    },
    { enabled: !!searchedKeywords?.length }
  );

  const universitiesData = isLoading ? [] : data ?? [];
  // const universitiesData = response.data.resultsList;

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };

  //
  const { data: relatedKeywords } = useQuery(
    ["dashboard-most-related-keywords", ...keywords],
    async () => {
      return await getRelatedKeywords(keywords);
    },
    { enabled: !!keywords.length }
  );

  //
  const gotoPage = (page: number) => {
    setCurrentPage(page);
  };

  const columnHelper = createColumnHelper<IUniversityItem>();

  const columns: ColumnDef<IUniversityItem>[] = [
    {
      header: "University",
      accessorKey: "university",
      accessorFn: (row) => row.university ?? "-",
      size: 200,
    },
    {
      header: "Location",
      accessorKey: "location",
      size: 200,
    },
    {
      header: "Experts",
      accessorKey: "experts",
      size: 100,
    },
    {
      header: "Title",
      accessorKey: "title",
      size: 300,
    },
    {
      header: "Patents",
      id: "patents",
    },
    {
      header: "Fundings",
      accessorKey: "fundings",
    },
    columnHelper.display({
      id: "actions",
      cell: (props) => <RowActions row={props.row} />,
    }),
  ];

  return (
    <div>
      <div className="w-1/2">
        <Search initialValue={searchedKeywords} onSubmit={handleSearch} />
      </div>

      {searchedKeywords && searchedKeywords.length > 0 && (
        <div className="my-3">
          <p className="text-sm">
            <span className="text-gray-700">
              Showing top universities trends for:
            </span>
            <span className="font-semibold ml-1">{joinedKeywords}</span>
          </p>

          <div className="my-3">
            <PageTitle
              title="Most recent publications by academic experts"
              subTitle="The top universities are located in Australia, Great Britain, Swizerland, and the United States. The top 3 leading universities are University College London, University of Southern California and Harvard Medical School."
              learnMore="Learn more"
            />
          </div>

          <div>
            <ReactTable columnsData={columns} rowsData={universitiesData} />
          </div>

          <div className="flex justify-center mt-7">
            <Pagination
              currentPage={currentPage}
              totalCount={111}
              gotoPage={gotoPage}
            />
          </div>

          <div className="mt-5">
            <div className="uppercase font-semibold text-primary-900 text-sm mb-2">
              Related keywords
            </div>

            <div className="flex flex-wrap gap-x-2 gap-y-1 items-start">
              {relatedKeywords?.slice(0, 15)?.map((keyword) => (
                <RelatedKeyword keyword={keyword} key={keyword} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

//
const RowActions = ({ row }: any) => {
  return (
    <Tooltip
      isCustomPanel={true}
      trigger={
        <VerticalThreeDots
          data-dropdown-toggle="dropdown"
          className="cursor-pointer"
        />
      }
      panelClassName="rounded-lg py-2 px-3 text-gray-700 min-w-[200px]"
    >
      <ul id="dropdown">
        <li className="mb-2 cursor-pointer">
          <div>Bookmark</div>
        </li>
        <li className="mb-2 cursor-pointer">
          <div>Generate Citation</div>
        </li>
        <li className="cursor-pointer">
          <div>Share</div>
        </li>
      </ul>
    </Tooltip>
  );
};
