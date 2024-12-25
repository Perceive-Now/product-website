import { useMemo, useState, useEffect } from "react";

import ReactTable from "../../../components/reusable/ReactTable";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { VerticalThreeDots } from "src/components/icons";
import ShareModal from "src/components/reusable/share-modal";
import Tooltip from "src/components/reusable/popover";
import jsCookie from "js-cookie";
import { LoadingIcon, ShareIcon } from "src/components/icons";
import TrashIcon from "src/components/icons/common/trash";

//
import { Link } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
//
import CheckboxInput from "../../../components/reusable/check-box/checkbox";
import TableSearch from "../../../components/reusable/table-search";
import TableDropdown from "../../../components/reusable/table-dropdown";
import Button from "src/components/reusable/button";
import DownloadIcon from "src/components/icons/common/download-icon";
import { useNavigate } from "react-router-dom";
/**
 *
 */
const AdmimProjects = () => {
  const navigate = useNavigate();
  const userId = jsCookie.get("user_id");

  const [reports, setreports] = useState([{id:1,project_name:"xyz",user_name:"Robin",status:"pending",assignee:"John"},{id:2,project_name:"xyz",user_name:"Robin",status:"pending",assignee:"John"},{id:3,project_name:"xyz",user_name:"Robin",status:"pending",assignee:"John"}]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState(false);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const selectedRows = Object.keys(rowSelection).filter((rowId) => rowSelection[rowId]);
  console.log("sledct---------", selectedRows);

  const filteredReports =
    reports.length > 0
      ? reports.filter((report: any) =>
          report.user_name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [];

 
  const columnHelper = createColumnHelper<any>();
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      // {
      //   id: "select-col",
      //   header: ({ table }) => (
      //     <div className="pl-1 pt-1">
      //       <CheckboxInput
      //         className="border-white"
      //         checked={table.getIsAllRowsSelected()}
      //         // indeterminate={table.getIsSomeRowsSelected()}
      //         onChange={table.getToggleAllRowsSelectedHandler()} // or getToggleAllPageRowsSelectedHandler
      //       />
      //     </div>
      //   ),
      //   cell: ({ row }) => (
      //     <div className="pl-1 pt-1">
      //       <CheckboxInput
      //         className="border-white"
      //         checked={row.getIsSelected()}
      //         onChange={row.getToggleSelectedHandler()}
      //       />
      //     </div>
      //   ),
      // },
      {
        header: "S no.",
        accessorKey: "id",
        // minSize: 400,
        cell: (item) => <p className="line-clamp-1">{item.row.original.id}</p>,
      },
      {
        header: "Project Name",
        accessorKey: "project_name",
        // minSize: 400,
        cell: (item) => <p className="line-clamp-1">{item.row.original.project_name}</p>,
      },
      {
        header: "Uploaded By",
        accessorKey: "user_name",
        // minSize: 400,
        cell: (item) => <p className="line-clamp-1">{item.row.original.user_name}</p>,
      },
      {
        header: "Upload Time",
        accessorKey: "upload _time",
        // minSize: 200,
        cell: (item) => <span>18 Dec 2024</span>,
      },
      {
        header: "Return Time",
        accessorKey: "return _time",
        // minSize: 200,
        cell: (item) => <span>18 Dec 2024</span>,
      },
      {
        header: "Status",
        accessorKey: "status",
        // minSize: 400,
        cell: (item) => <p className="line-clamp-1">{item.row.original.status}</p>,
      },
      {
        header: "Assignee",
        accessorKey: "assignee",
        // minSize: 400,
        cell: (item) => <p className="line-clamp-1">{item.row.original.assignee}</p>,
      },
      // columnHelper.display({
      //   id: "actions",
      //   minSize: 100,
      //   cell: ({ row }) => (
      //     <RowActions
      //       row={row}
      //       deleteReportHandler={deleteReportHandler}
      //       openFileHandler={openFileHandler}
      //     />
      //   ),
      // }),
    ],
    [],
  );

  const getRowProps = (row: any) => ({
    onClick: () => {
      const threadId = row.original.id;
      navigate(`/admin-reports/${threadId}`);
    },
    style: {
      cursor: "pointer",
    },
  });

  return (
    <div className="space-y-[20px] h-[calc(100vh-120px)] w-full z-10">
      <div className="p-1 pl-0">
        <h6 className="text-lg font-semibold ml-0">Settings &gt; Admin Report management</h6>
        <div className="flex justify-start items-center pt-3 pl-1">
          <Link to="/">
            <p className="mr-4 text-secondary-800 flex items-center">
              <ArrowLeftIcon className="mr-1" />
              Back
            </p>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-1 justify-between ">
        <div className="font-bold text-base">
          Total Projects<span className="ml-3">{reports.length}</span>
        </div>
        <div className="w-[300px]">
          <TableSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      </div>
      {loading ? (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <LoadingIcon fontSize={40} className="animate-spin text-primary-900" />
        </div>
      ) : (
        <ReactTable
          columnsData={columns}
          rowsData={filteredReports}
          getRowProps={getRowProps} 
          size="medium"
          noTopBorder
        />
      )}

      <ShareModal open={modal} path={shareLink} handleClose={() => setModal(false)} />
    </div>
  );
};

export default AdmimProjects;
