import { useState } from "react";
import classNames from "classnames";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { ColumnDef } from "@tanstack/react-table";

/*
 *
 **/
export default function ReactTable(props: IReactTable) {
  const [rowSelection, setRowSelection] = useState({});

  //
  const size = props.size ?? "large";

  //
  const table = useReactTable({
    data: props.rowsData ?? [],
    columns: props.columnsData ?? [],
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    debugTable: process.env.NODE_ENV === "development",
  });

  //
  return (
    <div className="mt-1 w-full">
      <table className="w-full">
        <thead className="border-b-[2px] border-gray-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="pb-2 px-[4px] text-left text-primary-900 font-semibold text-base"
                  {...{
                    style: {
                      minWidth: header.column.columnDef.minSize,
                    },
                  }}
                >
                  <>
                    {header.isPlaceholder ? null : (
                      <>{flexRender(header.column.columnDef.header, header.getContext())}</>
                    )}
                  </>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t-[1px] px-[4px] border-t-gray-200 text-gray-800">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={classNames("pr-2", {
                    "py-1": size === "small",
                    "py-2": size === "medium",
                    "py-4": size === "large",
                  })}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
interface IReactTable {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columnsData?: ColumnDef<any>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowsData?: any;
  size?: "small" | "medium" | "large";
}
