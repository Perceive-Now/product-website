import { useMemo, useState, useEffect } from "react";

import ReactTable from "../../../components/reusable/ReactTable";
import { ColumnDef, createColumnHelper, PaginationState } from "@tanstack/react-table";
import { VerticalThreeDots } from "src/components/icons";
import ShareModal from "src/components/reusable/share-modal";
import Tooltip from "src/components/reusable/popover";
import jsCookie from "js-cookie";
import { LoadingIcon, ShareIcon } from "src/components/icons";
import TrashIcon from "src/components/icons/common/trash";
import Pagination from "src/components/reusable/pagination";

//
import { Link } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
//
import CheckboxInput from "../../../components/reusable/check-box/checkbox";
import TableSearch from "../../../components/reusable/table-search";
import TableDropdown from "../../../components/reusable/table-dropdown";
import Button from "src/components/reusable/button";
import DownloadIcon from "src/components/icons/common/download-icon";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "src/utils/helpers";
import { API_PROD_URL } from "src/utils/axios";
/**
 *
 */
const AdmimProjects = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = jsCookie.get("user_id");
  const [reports, setreports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState(false);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [shareLink, setShareLink] = useState("");
  const selectedRows = Object.keys(rowSelection).filter((rowId) => rowSelection[rowId]);
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  });

  const filteredReports =
    reports.length > 0
      ? reports
          .filter((report: any) =>
            report.project_name.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .slice(
            pagination.pageIndex * pagination.pageSize,
            pagination.pageIndex * pagination.pageSize + pagination.pageSize,
          )
      : [];

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await fetch(`${API_PROD_URL}/projects/${id}`, {
          method: "GET",
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("data=------------", data);
          setreports(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (!isAuthenticated) {
      navigate("/admin");
      return;
    } else {
      fetchHistoryData();
    }
  }, []);

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
      //     <div className="pl-1 pt-1"
      //     onClick={(e) => e.stopPropagation()}
      //     >
      //       <CheckboxInput
      //         className="border-white"
      //         checked={row.getIsSelected()}
      //         onChange={row.getToggleSelectedHandler()}
      //       />
      //     </div>
      //   ),
      // },
      {
        header: "Project",
        accessorKey: "report_name",
        // minSize: 400,
        cell: (item) => <p className="line-clamp-1">{item.row.original.project_name}</p>,
      },
      {
        header: "Date Modified",
        accessorKey: "date_modified",
        // minSize: 200,
        cell: (item) => <span>{formatDate(item.row.original.date_modified)}</span>,
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
      const threadId = row.original.project_id;
      navigate(`/admin-reports/${threadId}?user_id=${id}&project=${row.original.project_name}`);
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
          <Link to="/admin">
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
          <TableSearch
            searchQuery={searchQuery}
            setSearchQuery={(search: string) => {
              setSearchQuery(search);
              setPagination({
                ...pagination,
                pageIndex: 0,
              });
            }}
          />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <LoadingIcon fontSize={40} className="animate-spin text-primary-900" />
        </div>
      ) : (
        <>
          <ReactTable
            columnsData={columns}
            rowsData={filteredReports}
            getRowProps={getRowProps}
            size="medium"
            noTopBorder
          />
          <div className="flex items-center justify-end mb-10">
            <Pagination
              page={pagination.pageIndex + 1}
              total={Math.ceil(reports.length / pagination.pageSize)}
              onChange={(pageNo) => setPagination({ ...pagination, pageIndex: pageNo - 1 })}
            />
          </div>
        </>
      )}

      <ShareModal open={modal} path={shareLink} handleClose={() => setModal(false)} />
    </div>
  );
};

export default AdmimProjects;
