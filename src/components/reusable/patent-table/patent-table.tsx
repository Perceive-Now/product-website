import classNames from "classnames";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

//
import ReactTable from "../ReactTable";

//
import { VerticalThreeDots } from "../../icons";
import { useState } from "react";

/**
 *
 */
export default function PatentTable({ data }: IPatentTableProps) {
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
      accessorFn: (row) => `View abstract`,
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
      <ReactTable columnsData={columns} rowsData={data} />
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

export type PatentType = {
  inventor: string;
  industry: string;
  title: string;
  abstract: string;
  date: string;
};

interface IPatentTableProps {
  data: PatentType[];
}

// interface ILocationState {
//   search?: IKeywordOption[];
// }
