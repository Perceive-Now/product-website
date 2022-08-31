/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import classNames from "classnames";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

//
import Search from "../../../components/reusable/search";
import PageTitle from "../../../components/reusable/page-title";
import ReactTable from "../../../components/reusable/ReactTable";

//
import { VerticalThreeDots } from "../../../components/icons";

//
import { IKeywordOption } from "../../../components/reusable/search/search";

/**
 *
 */
export default function PatentsPage() {
  const [searchKeywords, setSearchKeywords] = useState<IKeywordOption[]>();

  const handleSearch = (value: IKeywordOption[]) => {
    setSearchKeywords(value);
  };

  const columnHelper = createColumnHelper<PatentType>();

  const columns: ColumnDef<PatentType>[] = [
    {
      header: "Inventor",
      accessorKey: "inventor",
    },
    {
      header: "Industry",
      accessorKey: "industry",
    },
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Abstract",
      id: "abstract",
      accessorFn: (row) => `sdushil`,
    },
    {
      header: "Date (Y/M/D)",
      accessorKey: "date",
    },
    columnHelper.display({
      id: "actions",
      cell: (props) => <RowActions row={props.row} />,
    }),
  ];

  return (
    <div>
      <div className="w-1/2">
        <Search onSubmit={handleSearch} />
      </div>
      {searchKeywords && searchKeywords.length > 0 && (
        <div className="my-3">
          <p className="text-sm">
            <span className="text-gray-700">Showing active patents for:</span>“
            {searchKeywords.map((keyword, index) => {
              let comma = "";
              if (searchKeywords.length - 1 > index) {
                comma = ", ";
              }
              return `${keyword.value}${comma}`;
            })}
            ”{" "}
          </p>

          <div className="my-3">
            <PageTitle title="Patents" learnMore="Learn more" />
          </div>

          <div>{/* <ReactTable columnsData={columns} /> */}</div>
        </div>
      )}
    </div>
  );
}

export type PatentType = {
  inventor: string;
  industry: string;
  title: string;
  abstract: string;
  date: string;
};

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
