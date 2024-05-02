import { useState } from "react";
import classNames from "classnames";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { ColumnDef } from "@tanstack/react-table";
import { InfoIcon } from "../../icons";
import TableSortIcon from "../../icons/table-sort";

/*
 *
 **/
export default function ReactTable(props: IReactTable) {
  const [rowSelection, setRowSelection] = useState({});

  //
  const size = props.size ?? "medium";
  const errorMessage = props.errorMesssage ?? "No data Available";
  const isStripeed = props.striped ?? true;

  //
  const table = useReactTable({
    data: props.rowsData ?? [],
    columns: props.columnsData ?? [],
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    getSortedRowModel: getSortedRowModel(),
    debugTable: process.env.NODE_ENV === "development",
  });

  //
  return (
    <div className="mt-1 w-full overflow-x-auto">
      <table className="w-full rounded-lg overflow-hidden">
        <thead className="bg-primary-900 rounded-t-lg">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="py-1 px-1 text-left text-white font-semibold text-base"
                  {...{
                    style: {
                      minWidth: header.column.columnDef.minSize,
                      maxWidth: header.column.columnDef.maxSize,
                    },
                  }}
                >
                  <div className="flex items-center gap-x-1">
                    {header.isPlaceholder ? null : (
                      <>{flexRender(header.column.columnDef.header, header.getContext())}</>
                    )}
                    {header.column.getCanSort() && (
                      <button
                        type="button"
                        className="ml-"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <TableSortIcon className="text-white" />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {!table.getRowModel().rows.length ? (
            <tr>
              <td
                className={classNames("px-1", {
                  "py-1": size === "small",
                  "py-2": size === "medium",
                  "py-4": size === "large",
                })}
                colSpan={props.columnsData?.length}
              >
                <span className="flex flex-col justify-center items-center mt-4">
                  <InfoIcon width={48} height={48} className="mb-2" />
                  {errorMessage}
                </span>
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={classNames("text-gray-800 hover:bg-gray-200", {
                  "bg-gray-100": isStripeed && index % 2 === 1,
                  "border-t-[1px] border-t-gray-300": !props.noTopBorder,
                })}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={classNames("px-1", {
                      "py-1": size === "small",
                      "py-2": size === "medium",
                      "py-4": size === "large",
                    })}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

//
interface IReactTable {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columnsData?: ColumnDef<any>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowsData?: any;
  size?: "small" | "medium" | "large";
  striped?: boolean;
  noTopBorder?: boolean;
  errorMesssage?: string;
}
