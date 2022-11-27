import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

//
import { VerticalThreeDots } from "../../../../components/icons";
import RelatedKeyword from "../../../../components/@product/relatedKeyword";

//
import Tooltip from "../../../../components/reusable/tooltip";
import PageTitle from "../../../../components/reusable/page-title";
import ReactTable from "../../../../components/reusable/ReactTable";
import Search, { IKeywordOption } from "../../../../components/reusable/search";

//
import { setDashboardSearch } from "../../../../stores/dashboard";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

//
import { getPatents, IPatentItem } from "../../../../utils/api/advance-search";
import { getRelatedKeywords } from "../../../../utils/api/dashboard";
import Pagination from "../../../../components/reusable/pagination";

/**
 *
 */
export default function PatentsPage() {
  const dispatch = useAppDispatch();
  const dashboardSearch = useAppSelector((state) => state.dashboard?.search);

  //
  const [currentPage, setCurrentPage] = useState<number>(1);

  //
  const [searchKeywords, setSearchKeywords] = useState<IKeywordOption[]>();

  const joinedKeywords = searchKeywords
    ?.map((kwd) => `"${kwd.value}"`)
    .join(", ");

  const keywords = searchKeywords?.map((kwd) => kwd.value) ?? [];

  const { data: patentsDataRaw, isLoading } = useQuery(
    ["advanced-search-patents", ...keywords],
    async () => {
      return await getPatents(keywords);
    },
    { enabled: !!searchKeywords?.length }
  );

  const patentsData = isLoading ? [] : patentsDataRaw?.data?.resultsList ?? [];

  //
  const { data: relatedKeywords } = useQuery(
    ["dashboard-most-related-keywords", ...keywords],
    async () => {
      return await getRelatedKeywords(keywords);
    },
    { enabled: !!keywords.length }
  );

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };

  //
  const gotoPage = (page: number) => {
    setCurrentPage(page);
  };

  //
  useEffect(() => {
    setSearchKeywords(dashboardSearch);
  }, [dashboardSearch]);

  const columnHelper = createColumnHelper<IPatentItem>();

  const columns: ColumnDef<IPatentItem>[] = [
    {
      header: "Inventor",
      accessorKey: "inventorName",
      accessorFn: (row) => row.inventorName ?? "-",
      minSize: 100,
    },
    {
      header: "Company/University",
      accessorKey: "organizationName",
    },
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Abstract",
      id: "abstract",
      accessorFn: (row) => `View Abstract`,
      minSize: 150,
    },
    {
      header: "Date (Y/M/D)",
      accessorKey: "date",
      minSize: 150,
    },
    columnHelper.display({
      id: "actions",
      cell: (props) => <RowActions row={props.row} />,
    }),
  ];

  return (
    <div>
      <div className="w-1/2">
        <Search initialValue={searchKeywords} onSubmit={handleSearch} />
      </div>

      {searchKeywords && searchKeywords.length > 0 && (
        <div className="my-3">
          <p className="text-sm">
            <span className="text-gray-700">Showing active patents for:</span>
            <span className="font-semibold ml-1">{joinedKeywords}</span>
          </p>

          <div className="my-3">
            <PageTitle title="Patents" learnMore="Learn more" />
          </div>

          <div>
            <ReactTable columnsData={columns} rowsData={patentsData} />
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
