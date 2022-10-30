import classNames from "classnames";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

//
import PageTitle from "../../../components/reusable/page-title";
import ReactTable from "../../../components/reusable/ReactTable";
import Search, { IKeywordOption } from "../../../components/reusable/search";

//
import { setDashboardSearch } from "../../../stores/dashboard";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

//
import { VerticalThreeDots } from "../../../components/icons";
import { getPatents, IPatentItem } from "../../../utils/api/advance-search";

/**
 *
 */
export default function PatentsPage() {
  const dispatch = useAppDispatch();
  const dashboardSearch = useAppSelector((state) => state.dashboard?.search);

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

  const patentsData = (isLoading ? [] : patentsDataRaw?.data?.resultsList ?? [])
    //
    .slice(0, 10);

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
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
        </div>
      )}
    </div>
  );
}

const RowActions = ({ row }: any) => {
  const [show, setShow] = useState(false);
  return (
    <span>
      <VerticalThreeDots
        data-dropdown-toggle="dropdown"
        onClick={() => {
          setShow(!show);
        }}
        className="cursor-pointer"
      />
      <span
        id="dropdown"
        className={classNames(
          show ? "" : "hidden",
          "block border border-primary-900 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
        )}
      >
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefault"
        >
          <li>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Earnings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Sign out
            </a>
          </li>
        </ul>
      </span>
    </span>
  );
};
