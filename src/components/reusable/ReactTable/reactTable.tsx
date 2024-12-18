import { useState, useEffect } from "react";
import classNames from "classnames";
import { useReactTable, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table";
import { InfoIcon } from "../../icons";
import TableSortIcon from "../../icons/table-sort";
import type { ColumnDef } from "@tanstack/react-table";

export default function ReactTable(props: IReactTable) {
  const { rowSelection, onRowSelectionChange, size = "medium", errorMessage = "No data Available", striped = true, columnsData, rowsData, noTopBorder } = props;

  const table = useReactTable({
    data: rowsData ?? [],
    columns: columnsData ?? [],
    state: { rowSelection },
    onRowSelectionChange: onRowSelectionChange, 
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    getSortedRowModel: getSortedRowModel(),
    debugTable: process.env.NODE_ENV === "development",
  });

  return (
    <div className="mt-1 w-full overflow-x-auto">
      <table className="w-full rounded-lg overflow-hidden">
        <thead className="bg-appGray-100 rounded-t-lg">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="py-1 px-1 text-left text-secondary-800 font-semibold text-base"
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
                        className="ml-1"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <TableSortIcon className="text-secondary-800" />
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
                colSpan={columnsData?.length}
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
                  "bg-gray-100": striped && index % 2 === 1,
                  "border-t-[1px] border-t-gray-300": !noTopBorder,
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

interface IReactTable {
  columnsData?: ColumnDef<any>[];
  rowsData?: any;
  size?: "small" | "medium" | "large";
  striped?: boolean;
  noTopBorder?: boolean;
  errorMessage?: string;
  rowSelection?: any;
  onRowSelectionChange?: (selection: any) => void;  
}
