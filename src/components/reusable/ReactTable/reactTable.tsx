import { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";

//
import { PatentType } from "../../../pages/product/patents/patents";

/*
 *
 **/
export default function ReactTable(props: IReactTable) {
  const { columnsData, rowsData } = props;

  const size = props.size ?? "large";

  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState(rowsData ?? []);

  useEffect(() => {
    setData(rowsData);
  }, [rowsData]);

  const defaultColumns = useMemo<ColumnDef<PatentType>[]>(
    () => [
      {
        header: "Inventor",
        accessorKey: "inventor",
      },
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
        accessorKey: "abstract",
      },
      {
        header: "Date (Y/M/D)",
        accessorKey: "date",
      },
    ],
    []
  );

  const columns = columnsData || defaultColumns;

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: process.env.NODE_ENV === "development",
  });

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
                  className="pb-2 text-left text-primary-900 font-semibold"
                >
                  {header.isPlaceholder ? null : (
                    <>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-t-[1px] border-t-gray-200 text-gray-800"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={classNames({
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
  columnsData?: any;
  rowsData?: any;
  size?: "small" | "medium" | "large";
}
