import { useMemo, useState, useEffect, useCallback } from "react";

import ReactTable from "../../../components/reusable/ReactTable";
import { ColumnDef, PaginationState, createColumnHelper } from "@tanstack/react-table";
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
import Pagination from "src/components/reusable/pagination";
import EditIcon from "src/components/icons/miscs/Edit";
import DeleteConfirmationModal from "src/components/modal/delete-confirmation";
import { formatDate } from "src/utils/helpers";
import ToolTip from "src/components/reusable/tool-tip";
import { addActivityComment } from "src/stores/vs-product";
import { ACTIVITY_COMMENT } from "src/utils/constants";
/**
 *
 */
const MyProjects = () => {
  const navigate = useNavigate();
  const userId = jsCookie.get("user_id");

  const [reports, setreports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [shareLink, setShareLink] = useState("");
  const selectedRows = Object.keys(rowSelection).filter((rowId) => rowSelection[rowId]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const filteredReports =
    reports.length > 0
      ? reports
        .sort((a: any, b: any) => {
          const dateA = +new Date(a.date_modified);
          const dateB = +new Date(b.date_modified);
          return dateB - dateA; // Descending order
        })
        .filter((report: any) =>
          report.project_name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .slice(
          pagination.pageIndex * pagination.pageSize,
          pagination.pageIndex * pagination.pageSize + pagination.pageSize,
        )
      : [];

  const fetchHistoryData = async () => {
    try {
      const response = await fetch(
        `https://templateuserrequirements.azurewebsites.net/projects/${userId}`,
        {
          method: "GET",
          headers: { Accept: "application/json" },
        },
      );

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

  const fetchProjectData = async (id: any) => {
    try {
      const response = await fetch(
        `https://templateuserrequirements.azurewebsites.net/reports/${userId}/${id}`,
        {
          method: "GET",
          headers: { Accept: "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.reports[0];
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const handleRowSelectionChange = (selection: any) => {
    setRowSelection(selection);
  };

  const handleBulkDelete = () => {
    const updatedReports = filteredReports.filter(
      (_, index) => !selectedRows.includes(index.toString()),
    );
    setreports(updatedReports);
    setRowSelection({});
  };

  const handleBulkDownload = () => {
    selectedRows.forEach((selectedIndex: any, index: number) => {
      const selectedReport: any = reports[selectedIndex];

      if (selectedReport && selectedReport.file_data && selectedReport.file_data.file1) {
        const fileUrl = selectedReport.file_data.file1;

        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = fileUrl.split("/").pop();
        console.log("downloading file:", link.download);

        setTimeout(() => {
          link.click();
        }, index * 100);
      }
    });
  };

  const deleteReportHandler = useCallback(async (projectid: number) => {
    try {
      const response = await fetch(
        `https://templateuserrequirements.azurewebsites.net/project/${userId}/${projectid}`,
        {
          method: "DELETE",
          headers: { Accept: "application/json" },
        },
      );

      if (response.ok) {
        addActivityComment(userId as string, ACTIVITY_COMMENT.PROJECT_DELETE, projectid.toString() as string)
        // setreports((prevReports) => prevReports.filter((_, i) => i !== index));
        fetchHistoryData();
      }
    } catch (err) {
      console.error(err);
    }
  },
    [],
  );

  const openFileHandler = (fileUrl: string) => {
    window.open(fileUrl, "_blank");
  };

  const RowActions = ({
    row,
    openFileHandler,
  }: {
    row: any;
    openFileHandler: (fileUrl: string) => void;
  }) => {
    const handleDelete = (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const { project_id } = row.original;
      setDeleteModal(true);
      setDeleteId(project_id);
    };

    const handleShareReport = () => {
      setShareLink(row.original.file_data.file1);
      setModal(true);
    };

    const handleDownload = () => {
      openFileHandler(row.original.file_data.file1);
    };

    return (
      <Tooltip
        right="3px"
        isCustomPanel={true}
        trigger={<VerticalThreeDots data-dropdown-toggle="dropdown" className="cursor-pointer" />}
        panelClassName="rounded-lg py-2 px-3 text-gray-700 min-w-[200px]"
      >
        <ul id="dropdown">
          {/* <li className="mb-2 cursor-pointer" onClick={handleDownload}>
            <div className="flex items-center">
              <DownloadIcon className="mr-2" /> Download
            </div>
          </li> */}
          <li className="cursor-pointer" onClick={handleDelete}>
            <div className="flex items-center">
              <TrashIcon className="mr-2" /> Delete Project
            </div>
          </li>
          {/* <li className="cursor-pointer" onClick={handleShareReport}>
            <div className="flex items-center">
              <ShareIcon className="mr-2" /> Share
            </div>
          </li> */}
        </ul>
      </Tooltip>
    );
  };

  const columnHelper = createColumnHelper<any>();
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "select-col",
        header: ({ table }) => (
          <div className="pl-1 pt-1">
            <CheckboxInput
              className="border-white"
              checked={table.getIsAllRowsSelected()}
              // indeterminate={table.getIsSomeRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()} // or getToggleAllPageRowsSelectedHandler
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="pl-1 pt-1" onClick={(e) => e.stopPropagation()}>
            <CheckboxInput
              className="border-white"
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          </div>
        ),
      },
      {
        header: "Project",
        accessorKey: "report_name",
        minSize: 200,
        cell: (item) => <p className="line-clamp-1">{item.row.original.project_name}</p>,
      },
      {
        header: "Date Modified",
        accessorKey: "date_modified",
        minSize: 200,
        cell: (item) => <span>{formatDate(item.row.original.date_modified)}</span>,
      },
      columnHelper.display({
        id: "actions",
        minSize: 200,
        cell: ({ row }) => (
          <RowActions
            row={row}
            openFileHandler={openFileHandler}
          />
        ),
      }),
      columnHelper.display({
        id: "actions",
        cell: (item) => (
          <ToolTip title="Update Requirements" placement="right">
            <div
              className="inline-flex items-center justify-center gap-2 py-1 px-2 bg-primary-900 text-white rounded-md font-semibold cursor-pointer"
              onClick={async (event) => {
                event.preventDefault();
                event.stopPropagation();
                const project_name = item.row.original.project_name;
                const project_id = item.row.original.project_id;

                const reportData = await fetchProjectData(project_id);
                navigate(`/quick-reports/${project_id}?project=${project_name}`, {
                  state: reportData,
                });
              }}
            >

              <EditIcon />
              {/* Update Requirements */}
            </div>
          </ToolTip>
        ),
      })

    ],
    [],
  );

  const getRowProps = (row: any) => ({
    onClick: () => {
      const project_id = row.original.project_id;
      navigate(`/my-reports/${project_id}?project=${row.original.project_name}`
      );
    },
    style: {
      cursor: "pointer",
    },
  });

  return (
    <div className="space-y-[20px] w-full z-10 pb-[7%]">
      <div className="p-1 pl-0">
        <h6 className="text-lg font-semibold ml-0">Project Hub</h6>
        <div className="flex justify-start items-center pt-3 pl-1">
          <Link to="/">
            <p className="mr-4 text-secondary-800 flex items-center">
              <ArrowLeftIcon className="mr-1" />
              Back
            </p>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-1 justify-end ">
        <p className="font-bold text-base">
          Total Projects<span className="ml-3">{reports.length}</span>
        </p>
        <div className="ml-auto">
          <Link to="/quick-reports">
            <Button type="primary">+ Add Project</Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-1 w-full">
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
        {selectedRows.length > 0 && (
          <div className="ml-auto flex gap-3">
            {/* <Button type="gray" handleClick={onShare}>
              <div className="flex items-center gap-1">
                <ShareIcon />
                Share
              </div>
            </Button> */}
            <Button type="gray" handleClick={handleBulkDownload}>
              <div className="flex items-center gap-1">
                <DownloadIcon />
                Download
              </div>
            </Button>
            <Button type="gray" classname="flex items-center gap-1" handleClick={handleBulkDelete}>
              <div className="flex items-center gap-2">
                <TrashIcon />
                Delete
              </div>
            </Button>
          </div>
        )}
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
            size="medium"
            noTopBorder
            rowSelection={rowSelection}
            onRowSelectionChange={handleRowSelectionChange}
            getRowProps={getRowProps} // Add getRowProps to the Table component
          />
          <div className=" flex items-center justify-end">
            <Pagination
              page={pagination.pageIndex + 1}
              total={Math.ceil(reports.length / pagination.pageSize)}
              onChange={(pageNo) => setPagination({ ...pagination, pageIndex: pageNo - 1 })}
            />
          </div>
        </>
      )}

      <ShareModal open={modal} path={shareLink} handleClose={() => setModal(false)} />
      <DeleteConfirmationModal
        open={deleteModal}
        handleDelete={deleteReportHandler}
        handleClose={() => setDeleteModal(false)}
        conversation_id={deleteId}
        title="Delete Project?"
        description="Are you sure want to delete project?"
      />
    </div>
  );
};

export default MyProjects;
