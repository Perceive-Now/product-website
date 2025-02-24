import { useEffect, useState } from "react";
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
import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import jsCookie from "js-cookie";
import { fetchAgentReports } from "./agent-report.action";
import { formatDate } from "src/utils/helpers";

const MyAgentReport = () => {
  const navigate = useNavigate();

  const userId = jsCookie.get("user_id");

  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState(false);
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
      header: "Thread Name",
      accessorKey: "Thread Name",
      minSize: 200,
      cell: (item: any) => (
        <p
          className="line-clamp-1"
          onClick={() => navigate(`/my-agent-reports/${item.row.original.id}`)}
        >
          {`${item.row.original.agent_name?.split(" ").join("")}-${
            item.row.original.thread_name?.split("-")[0]
          }`}
          {item.row.original.id}
        </p>
      ),
    },
    {
      header: "Agent Name",
      accessorKey: "agent_name",
      minSize: 200,
      cell: (item: any) => (
        <p
          className="line-clamp-1"
          onClick={() => navigate(`/my-agent-reports/${item.row.original.id}`)}
        >
          {item.row.original.agent_name}
        </p>
      ),
    },
    {
      header: "Date Modified",
      accessorKey: "created_at",
      minSize: 200,
      cell: (item: any) => <span>{formatDate(item.row.original.created_at)}</span>,
    },
  ];

  const [reportList, setReportList] = useState<{ loading: boolean; reports: any[] }>({
    loading: true,
    reports: [],
  });

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const filteredReports =
    reportList.reports.length > 0
      ? reportList.reports
          .sort((a: any, b: any) => {
            const dateA = +new Date(a.created_at);
            const dateB = +new Date(b.created_at);
            return dateB - dateA; // Descending order
          })
          .filter(
            (report: any) => report.agent_name?.toLowerCase()?.includes(searchQuery.toLowerCase()),
            //  &&
            //   report.is_complete === true,
          )
          .slice(
            pagination.pageIndex * pagination.pageSize,
            pagination.pageIndex * pagination.pageSize + pagination.pageSize,
          )
      : [];

  useEffect(() => {
    setReportList({
      reports: [],
      loading: true,
    });
    fetchAgentReports(userId || "", setReportList);
  }, []);

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
      </div>
      {reportList.loading ? (
        <div className="flex justify-center items-center">
          <LoadingIcon fontSize={40} className="animate-spin text-primary-900" />
        </div>
      ) : (
        <>
          <ReactTable
            columnsData={columns}
            rowsData={filteredReports}
            size="medium"
            rowSelection={rowSelection}
          />
          <div className=" flex items-center justify-end">
            <Pagination
              page={pagination.pageIndex + 1}
              total={Math.ceil(filteredReports.length / pagination.pageSize)}
              onChange={(pageNo) => setPagination({ ...pagination, pageIndex: pageNo - 1 })}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MyAgentReport;
