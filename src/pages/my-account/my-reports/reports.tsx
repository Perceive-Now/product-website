import { useMemo } from "react";

import ReactTable from "../../../components/reusable/ReactTable";
import { ColumnDef } from "@tanstack/react-table";

//
import EditIcon from "../../../components/icons/miscs/Edit";

//
import CheckboxInput from "../../../components/reusable/check-box/checkbox";
import TableSearch from "../../../components/reusable/table-search";

/**
 *
 */
const Reports = () => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "select-col",
        // minSize: ,
        header: ({ table }) => (
          <div className="pl-1 pt-1">
            <CheckboxInput
              className="border-white"
              checked={table.getIsAllRowsSelected()}
              // indeterminate={table.getIsSomeRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
            />
          </div>
        ),
      },
      {
        header: "Report name",
        accessorKey: "report_name",
        minSize: 400,
        cell: (item) => <p className="line-clamp-1">{item.row.original.project_title}</p>,
      },
      {
        header: "Date created",
        accessorKey: "date_created",
        // minSize: 200,
        cell: (item) => <span>{item.row.original.award_amount}</span>,
      },
      {
        header: "Edit",
        // accessorKey: "lead_investigator_given",
        // minSize: 80,
        cell: () => (
          <button type="button">
            <EditIcon />
          </button>
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-[20px] h-[calc(100vh-120px)] w-full">
      <div className="flex items-center justify-between">
        <h6 className="font-bold text-2xl text-primary-900">My Reports</h6>
        <div className="flex items-center gap-1">
          <p className="text-primary-900 font-bold">Total reports</p>
          <div className="h-2 w-2 rounded-full p-[12px] border-2 border-primary-900 text-secondary-500 flex justify-center items-center font-bold">
            0
          </div>
        </div>
      </div>
      <TableSearch />
      {/* <div className="flex items-center justify-end gap-1 mt-2">
        <IconButton color={"primary"} rounded icon={<ShareIcon className="text-white"/>} />
        <IconButton color={"primary"} rounded icon={<TrashIcon className="text-white" />} />
      </div> */}
      <ReactTable columnsData={columns} rowsData={[]} size="medium" noTopBorder />
    </div>
  );
};

export default Reports;
