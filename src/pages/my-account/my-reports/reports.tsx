import { useMemo, useState } from "react";

import ReactTable from "../../../components/reusable/ReactTable";
import { ColumnDef } from "@tanstack/react-table";

//
import EditIcon from "../../../components/icons/miscs/Edit";
import { Link } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
//
import CheckboxInput from "../../../components/reusable/check-box/checkbox";
import TableSearch from "../../../components/reusable/table-search";
import TableDropdown from "../../../components/reusable/table-dropdown";
import Button from "src/components/reusable/button";
import TrashIcon from "src/components/icons/common/trash";
import { ShareIcon } from "src/components/icons";
import DownloadIcon from "src/components/icons/common/download-icon";
/**
 *
 */
const Reports = () => {
  const [reports, setreports] = useState([
    {
      id: 1,
      report_name: "xyz",
      type: ".docx",
      size: "2mb",
      permission: "You and 3 others",
      date_modified: "Nov 21, 2024",
    },
    {
      id: 2,
      report_name: "pqr",
      type: ".docx",
      size: "2mb",
      permission: "You and 3 others",
      date_created: "Nov 21, 2024",
    },
    {
      id: 3,
      report_name: "abc",
      type: ".docx",
      size: "2mb",
      permission: "You and 3 others",
      date_modified: "Nov 21, 2024",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = reports.filter((report) =>
    report.report_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  interface IOptions {
    label: string;
    icon: JSX.Element;
    action: () => void;
  }

  const menuItems = [
    {
      label: "Pin",
      icon: <EditIcon className="h-2 w-2" />,
      action: () => console.log("yo"),
    },
    {
      label: "Delete",
      icon: <EditIcon className="h-2 w-2" />,
      action: () => console.log("yo"),
    },
    {
      label: "Share",
      icon: <EditIcon className="h-2 w-2" />,
      action: () => console.log("yo"),
    },
  ];

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      // {
      //   id: "select-col",
      //   // minSize: ,
      //   header: ({ table }) => (
      //     <div className="pl-1 pt-1">
      //       <CheckboxInput
      //         className="border-white"
      //         checked={table.getIsAllRowsSelected()}
      //         // indeterminate={table.getIsSomeRowsSelected()}
      //         onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
      //       />
      //     </div>
      //   ),
      // },
      {
        header: "Report",
        accessorKey: "report_name",
        // minSize: 400,
        cell: (item) => <p className="line-clamp-1">{item.row.original.report_name}</p>,
      },
      {
        header: "Type",
        accessorKey: "type",
        // minSize: 200,
        cell: (item) => <span>{item.row.original.type}</span>,
      },
      {
        header: "Size",
        accessorKey: "size",
        // minSize: 200,
        cell: (item) => <span>{item.row.original.size}</span>,
      },
      {
        header: "Permission",
        accessorKey: "permission",
        // minSize: 200,
        cell: (item) => <span>{item.row.original.permission}</span>,
      },
      {
        header: "Date Modified",
        accessorKey: "date_modified",
        // minSize: 200,
        cell: (item) => <span>{item.row.original.date_modified}</span>,
      },
      {
        header: " ",
        // accessorKey: "lead_investigator_given",
        minSize: 80,
        cell: (item) => (
          // <button type="button">
          //   <EditIcon />
          // </button>
          <TableDropdown
          // menuItems={menuItems}
          // width="xs"
          // alignment="right"
          // conversation_id={item.row.original.id}
          />
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-[20px] h-[calc(100vh-120px)] w-full z-10 p-1">
      <div className="">
        <h6 className="text-lg font-semibold ml-0">Settings &gt; Report management</h6>
        <div className="flex justify-start items-center pt-3">
          <Link to="/profile">
            <p className="mr-4 text-secondary-800 flex items-center">
              <ArrowLeftIcon className="mr-1" />
              Back
            </p>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-1 w-full">
        <p className="font-bold text-base">
          All Reports<span className="ml-3">{reports.length}</span>
        </p>
        {/* <div className="h-2 w-2 rounded-full p-[12px] border-2 border-primary-900 text-secondary-500 flex justify-center items-center font-bold">
            0
          </div> */}
        <div className="ml-auto">
          <Link to="/quick-reports">
            <Button type="primary">+ Quick Report</Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-1 w-full">
        <div className="w-[300px]">
          <TableSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        <div className="ml-auto flex gap-3">
          <Link to="/add-user">
            <Button type="gray">
              <div className="flex items-center gap-1">
                <ShareIcon />
                Share
              </div>
            </Button>
          </Link>
          <Link to="/add-user">
            <Button type="gray">
              <div className="flex items-center gap-1">
                <DownloadIcon />
                Download
              </div>
            </Button>
          </Link>
          <Link to="/add-user">
            <Button type="gray" classname="flex items-center gap-1">
              <div className="flex items-center gap-2">
                <TrashIcon />
                Delete
              </div>
            </Button>
          </Link>
        </div>
      </div>
      {/* <div className="flex items-center justify-end gap-1 mt-2">
        <IconButton color={"primary"} rounded icon={<ShareIcon className="text-white"/>} />
        <IconButton color={"primary"} rounded icon={<TrashIcon className="text-white" />} />
      </div> */}
      <ReactTable columnsData={columns} rowsData={filteredReports} size="medium" noTopBorder />
    </div>
  );
};

export default Reports;
