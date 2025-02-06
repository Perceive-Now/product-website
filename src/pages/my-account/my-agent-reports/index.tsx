import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactTable from "../../../components/reusable/ReactTable";
import TableSearch from "../../../components/reusable/table-search";
import Button from "src/components/reusable/button";
import Pagination from "src/components/reusable/pagination";
import Tooltip from "src/components/reusable/popover";
import { VerticalThreeDots, LoadingIcon, ShareIcon } from "src/components/icons";
import TrashIcon from "src/components/icons/common/trash";
import DownloadIcon from "src/components/icons/common/download-icon";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
import EditIcon from "src/components/icons/miscs/Edit";
import ShareModal from "src/components/reusable/share-modal";
import DeleteConfirmationModal from "src/components/modal/delete-confirmation";
import ToolTip from "src/components/reusable/tool-tip";
import { createColumnHelper } from "@tanstack/react-table";

const MyAgentReport = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [rowSelection, setRowSelection] = useState({});
  const [shareLink, setShareLink] = useState("");
  const [reports, setReports] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      report_name: `Report ${i + 1}`,
      date_modified: "2021-08-12",
    })),
  );
  const selectedRows = Object.keys(rowSelection);

  const columnHelper = createColumnHelper();
  const columns = [
    {
      header: "Reports",
      accessorKey: "report_name",
      minSize: 200,
      cell: (item: any) => (
        <p className="line-clamp-1" onClick={() => navigate("/my-agent-reports/1")}>
          {item.row.original.report_name}
        </p>
      ),
    },
    {
      header: "Date Modified",
      accessorKey: "date_modified",
      minSize: 200,
      cell: (item: any) => <span>{item.row.original.date_modified}</span>,
    },
    columnHelper.display({
      id: "actions",
      minSize: 200,
      cell: ({ row }) => (
        <Tooltip
          right="3px"
          isCustomPanel={true}
          trigger={<VerticalThreeDots className="cursor-pointer" />}
          panelClassName="rounded-lg py-2 px-3 text-gray-700 min-w-[200px]"
        >
          <ul id="dropdown">
            <li className="mb-2 cursor-pointer">
              <div className="flex items-center">
                <DownloadIcon className="mr-2" /> Download
              </div>
            </li>
            <li className="cursor-pointer">
              <div className="flex items-center">
                <TrashIcon className="mr-2" /> Delete Project
              </div>
            </li>
          </ul>
        </Tooltip>
      ),
    }),
  ];

  return (
    <div className="space-y-[20px] w-full z-10 pb-[7%]">
      <div className="p-1 pl-0">
        <h6 className="text-lg font-semibold ml-0">AI Agent Reports</h6>
        <div className="flex justify-start items-center pt-3 pl-1">
          <Link to="/">
            <p className="mr-4 text-secondary-800 flex items-center">
              <ArrowLeftIcon className="mr-1" /> Back
            </p>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-1 w-full">
        <div className="w-[300px]">
          <TableSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        {selectedRows.length > 0 && (
          <div className="ml-auto flex gap-3">
            <Button type="gray">
              <div className="flex items-center gap-1">
                <DownloadIcon /> Download
              </div>
            </Button>
            <Button>
              <div className="flex items-center gap-2">
                <TrashIcon />
              </div>
            </Button>
          </div>
        )}
      </div>
      <ReactTable
        columnsData={columns}
        rowsData={reports}
        size="medium"
        rowSelection={rowSelection}
      />
      <Pagination page={1} total={1} />
      <ShareModal open={modal} path={shareLink} handleClose={() => setModal(false)} />
      {/* <DeleteConfirmationModal open={deleteModal} handleClose={() => setDeleteModal(false)} /> */}
    </div>
  );
};

export default MyAgentReport;
