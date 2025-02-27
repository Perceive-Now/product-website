import { useMemo, useState, useEffect, useCallback } from "react";

import ReactTable from "src/components/reusable/ReactTable";
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
import CheckboxInput from "src/components/reusable/check-box/checkbox";
import TableSearch from "src/components/reusable/table-search";
import TableDropdown from "src/components/reusable/table-dropdown";
import Button from "src/components/reusable/button";
import DownloadIcon from "src/components/icons/common/download-icon";
import JSZip from "jszip";
import IconFile from "src/components/icons/side-bar/icon-file";
import { useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "src/components/reusable/pagination";
import { Disclosure } from "@headlessui/react";
import ArrowDown from "src/components/icons/miscs/ArrowDown";
import ArrowUp from "src/components/icons/miscs/ArrowUp";
import DeleteConfirmationModal from "src/components/modal/delete-confirmation";
import { arrayBufferDownload, formatDate, formatReportDate } from "src/utils/helpers";
import { addActivityComment } from "src/stores/vs-product";
import { ACTIVITY_COMMENT } from "src/utils/constants";
import toast from "react-hot-toast";
import ReportConversation from "./ReportConversation";
import { fetchAgentThreadDetails } from "../agent-report.action";
import Loading from "src/components/reusable/loading";
import AgentHead from "src/pages/product/ai-agent/AgentHead";
/**
 *
 */
const MyAgentReportManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = jsCookie.get("user_id");
  const { id } = useParams();
  const { tab } = location.state || 0;
  const urlParams = new URLSearchParams(location.search);
  const project_name = urlParams.get("project");
  const [reports, setreports] = useState<any[]>([]);

  const [totalReports, setTotalReports] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [activityLog, setActivityLog] = useState<{ comment: string; date_and_time: string }[]>([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(tab);
  const selectedRows = Object.keys(rowSelection).filter((rowId) => rowSelection[rowId]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const filteredReports = useMemo(() => {
    return reports.filter((report) =>
      report.filename.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [reports, searchQuery]);

  const fetchReports = async (theadId: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://templateuserrequirements.azurewebsites.net/agents/reportcheck/${userId}/${theadId}`,
      );
      if (response.ok) {
        const data = await response.json();
        setreports(data?.report_info || []);
      }
    } catch {
      console.error("Error fetching uploaded files.");
    } finally {
      setLoading(false);
    }
  };

  const fetchActivityLog = async () => {
    try {
      const response = await fetch(
        `https://templateuserrequirements.azurewebsites.net/comments/?user_id=${userId}&project_id=${id}`,
        {
          method: "GET",
          headers: { Accept: "application/json" },
        },
      );
      if (response.ok) {
        const data = await response.json();
        setActivityLog(data);
      } else {
        setActivityLog([]);
        // setreports([])
        // setTotalReports(0)
      }
    } catch (err) {
      setActivityLog([]);
      console.error(err);
    }
  };

  const fetchHistoryData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://templateuserrequirements.azurewebsites.net/reports/${userId}/${id}`,
        {
          method: "GET",
          headers: { Accept: "application/json" },
        },
      );
      if (response.ok) {
        const data = await response.json();

        const reportRecords = data.reports.flatMap((item: any) =>
          item.report_url
            ? item.report_url.map((urlObj: any) => ({
                ...item,
                report_id: item.report_id,
                report_name: item.report_name,
                report_url: urlObj.url || urlObj,
                report_size: urlObj.size || 0,
                date_modified: urlObj.datetime
                  ? formatReportDate(urlObj.datetime)
                  : item.date_modified,
                report_complete_status: item.report_complete_status,
                filename: urlObj.filename || "-",
              }))
            : item,
        );
        setTotalReports(reportRecords.length || 0);
        setreports(reportRecords);
        console.log("Total reports---------", data.reports[0]);
      } else {
        setreports([]);
        setTotalReports(0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //     fetchHistoryData();
  //     fetchActivityLog();
  //   }, []);

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

  const handleBulkDownload = async () => {
    // const reportName = reports[(selectedRows as any)[0] as number]?.report_name;
    // const obj: Record<string, string> = {};
    // selectedRows.forEach((selectedIndex: any, index) => {
    //   const selectedReport: any = reports[selectedIndex];
    //   if (selectedReport && selectedReport.report_url) {
    //     const file = selectedReport.report_url;
    //     if (file) {
    //       let fileName = file.split("/").pop() || "unknown_file";
    //       // Ensure unique file names
    //       if (obj[fileName]) {
    //         const uniqueSuffix = `_${index}`;
    //         const fileParts = fileName.split(".");
    //         if (fileParts.length > 1) {
    //           const extension = fileParts.pop();
    //           fileName = `${fileParts.join(".")}${uniqueSuffix}.${extension}`;
    //         } else {
    //           fileName += uniqueSuffix;
    //         }
    //       }
    //       obj[fileName] = file;
    //     }
    //   }
    //   return null;
    // });
    // try {
    //   const response = await fetch(
    //     `https://templateuserrequirements.azurewebsites.net/reports/zip/custom`,
    //     {
    //       method: "POST",
    //       headers: { Accept: "application/json", "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         [reportName]: obj,
    //       }),
    //     },
    //   );
    //   toast.success("Downloading Reports");
    //   if (response.ok) {
    //     arrayBufferDownload(response);
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
  };

  // Generate the ZIP file and trigger the download

  const deleteReportHandler = useCallback(async (projectid: number) => {
    try {
      const response = await fetch(
        `https://templateuserrequirements.azurewebsites.net/report/delete?user_id=${userId}&project_id=${id}&report_id=${projectid}`,
        {
          method: "DELETE",
          headers: { Accept: "application/json" },
        },
      );

      if (response.ok) {
        // setreports((prevReports) => prevReports.filter((_, i) => i !== index));
        addActivityComment(userId as string, ACTIVITY_COMMENT.REPORT_DELETE, id as string);
        fetchHistoryData();
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

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
    const handleDelete = () => {
      const { report_id } = row.original;
      setDeleteModal(true);
      setDeleteId(report_id);
    };

    const handleShareReport = () => {
      setShareLink(row.original.report_url);
      setModal(true);
    };

    const handleDownload = () => {
      openFileHandler(row.original.report_url);
    };

    return row.original.report_url ? (
      <Tooltip
        isCustomPanel={true}
        right="0px"
        trigger={<VerticalThreeDots data-dropdown-toggle="dropdown" className="cursor-pointer" />}
        panelClassName="rounded-lg py-2 px-3 text-gray-700 min-w-[200px] right-0"
      >
        <ul id="dropdown">
          {row.original.report_url ? (
            <li className="mb-2 cursor-pointer" onClick={handleDownload}>
              <div className="flex items-center">
                <DownloadIcon className="mr-2" /> Download
              </div>
            </li>
          ) : null}
          {/* <li className={`${row.original.report_url ? "mb-2" : ""} cursor-pointer`} onClick={handleDelete}>
            <div className="flex items-center">
              <TrashIcon className="mr-2" /> Delete Report
            </div>
          </li> */}
          {row.original.report_url ? (
            <li className="cursor-pointer" onClick={handleShareReport}>
              <div className="flex items-center">
                <ShareIcon className="mr-2" /> Share
              </div>
            </li>
          ) : null}
        </ul>
      </Tooltip>
    ) : null;
  };
  const getFileType = (url: any) => {
    const parts = url.split(".");
    return parts.length > 1 ? parts.pop() : ""; // Returns the last part as the file type
  };

  const columnHelper = createColumnHelper<any>();

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      // {
      //   id: "select-col",
      //   header: ({ table }) => {
      //     const selectableRows = table
      //       .getRowModel()
      //       .rows.filter((row) => row.original.report_complete_status);

      //     // Check if all selectable rows are selected
      //     const areAllSelectableRowsSelected =
      //       selectableRows.length > 0 && selectableRows.every((row) => row.getIsSelected());

      //     return (
      //       <div className="pl-1 pt-1">
      //         <CheckboxInput
      //           className="border-white"
      //           checked={areAllSelectableRowsSelected}
      //           // indeterminate={
      //           //   areSomeSelectableRowsSelected && !areAllSelectableRowsSelected
      //           // }
      //           onChange={() => {
      //             const shouldSelectAll = !areAllSelectableRowsSelected;
      //             selectableRows.forEach((row) => {
      //               row.toggleSelected(shouldSelectAll);
      //             });
      //           }}
      //         />
      //       </div>
      //     );
      //   },
      //   cell: ({ row }) => (
      //     <div className="pl-1 pt-1">
      //       <CheckboxInput
      //         className="border-white"
      //         checked={row.getIsSelected()}
      //         disabled={!row.original.report_complete_status}
      //         onChange={row.getToggleSelectedHandler()}
      //       />
      //     </div>
      //   ),
      // },
      {
        header: "Report",
        accessorKey: "filename",
        // minSize: 400,
        cell: (item) => <p className="line-clamp-1">{item.row.original.filename}</p>,
      },
      // {
      //   header: "File Name",
      //   accessorKey: "report_name",
      //   // minSize: 400,
      //   cell: (item) => <p className="line-clamp-1">{item.row.original.filename || "-"}</p>,
      // },
      {
        header: "Type",
        accessorKey: "url",
        // minSize: 200,
        cell: (item) => <p className="line-clamp-1">{getFileType(item.row.original.url)}</p>,
      },
      {
        header: "Date Modified",
        accessorKey: "datetime",
        // minSize: 200,
        cell: (item) => <p className="line-clamp-1">{item.row.original.datetime}</p>,
      },
      {
        header: "Status",
        accessorKey: "status",
        // minSize: 200,
        cell: (item) => <span>Completed</span>,
      },
      {
        header: "Size",
        accessorKey: "size",
        cell: (item) => {
          const reportSizeStr = item.row.original.size;
          const bytes = parseInt(reportSizeStr, 10);
          const mb = bytes / 1024 / 1024;
          return <span>{mb.toFixed(2)} MB</span>;
        },
      },
      {
        header: "Actions",
        // accessorKey: "actions",
        cell: (item: any) => (
          <a href={item.row.original.url} target="_blank" rel="noopener noreferrer">
            Download
          </a>
        ),
      },
    ],
    [],
  );

  const [reportList, setReportList] = useState<{ loading: boolean; reports: any }>({
    loading: true,
    reports: [],
  });

  const { reports: agentReports, loading: agentReportLoading } = reportList;

  useEffect(() => {
    setReportList({
      reports: [],
      loading: true,
    });
    fetchAgentThreadDetails(id || "", userId || "", setReportList);
    fetchReports(id || "");

    console.log("Agent Reportss", agentReports);
  }, []);

  return (
    <div className="space-y-[20px] w-full z-10 pb-[7%]">
      <AgentHead agentName="" />
      <div className="p-1 pl-0">
        <h6 className="text-lg font-semibold ml-0">AI Agent Reports</h6>
        <div className="flex justify-start items-center pt-3 pl-1">
          <Link to="/my-agent-reports">
            <p className="mr-4 text-secondary-800 flex items-center">
              <ArrowLeftIcon className="mr-1" />
              Back
            </p>
          </Link>
        </div>
      </div>
      <Tab.Group defaultIndex={selectedTabIndex} onChange={(index) => setSelectedTabIndex(index)}>
        <div className="flex justify-between">
          <Tab.List className="flex w-[15%] h-[45px]">
            <Tab
              className={({ selected }) =>
                `w-full text-base px-3 rounded-tl-md rounded-bl-md focus:outline-none font-nunito border-l border-r border-t border-b border-appGray-600 ${
                  selected ? "text-white bg-primary-900" : "text-black"
                }`
              }
            >
              Reports
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full text-base px-3 rounded-tr-md rounded-br-md focus:outline-none font-nunito border-r border-t border-b border-appGray-600 whitespace-nowrap ${
                  selected ? "text-white bg-primary-900" : "text-black"
                }`
              }
            >
              Requirements
            </Tab>
          </Tab.List>
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <LoadingIcon fontSize={40} className="animate-spin text-primary-900" />
          </div>
        ) : (
          <Tab.Panels>
            {loading ? (
              <Loading width="100px" height="100px" isLoading={loading} />
            ) : (
              <Tab.Panel>
                <div className="flex items-center gap-1">
                  <p className="font-bold text-base">
                    Total Reports<span className="ml-3">{totalReports}</span>
                  </p>
                </div>
                <div className="flex items-center gap-1 w-full">
                  <div className="w-[300px] mt-2 mb-2">
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
                      {/* <Button
                      type="gray"
                      classname="flex items-center gap-1"
                      handleClick={handleBulkDelete}
                    >
                      <div className="flex items-center gap-2">
                        <TrashIcon />
                        Delete
                      </div>
                    </Button> */}
                    </div>
                  )}
                </div>
                <ReactTable
                  columnsData={columns}
                  rowsData={filteredReports}
                  size="medium"
                  noTopBorder
                  rowSelection={rowSelection}
                  onRowSelectionChange={handleRowSelectionChange}
                />
                <div className=" flex items-center justify-end mt-2.5">
                  <Pagination
                    page={pagination.pageIndex + 1}
                    total={Math.ceil(reports.length / pagination.pageSize)}
                    onChange={(pageNo) => setPagination({ ...pagination, pageIndex: pageNo - 1 })}
                  />
                </div>
              </Tab.Panel>
            )}
            <Tab.Panel>
              <ReportConversation loading={agentReportLoading} reports={agentReports} />
            </Tab.Panel>

            <Tab.Panel>
              <div className="border border-appGray-500 w-[60%] p-2 rounded-lg mt-5">
                {/* {activityLog && activityLog?.length > 0 ? (
                  <>
                    {activityLog?.map((log, idx) => (
                      <div
                        key={idx * 19}
                        className="grid grid-cols-2 text-secondary-800 font-mulish mt-1 last:border-b-0 border-b border-gray-300"
                      >
                        <div className="font-nunito">{formatDate(log.date_and_time)}</div>
                        <div className="font-nunito">{log.comment}</div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="flex justify-center items-center mt-5 font-mulish text-sm">
                    No activity log found
                  </p>
                )} */}
                <p className="flex justify-center items-center mt-5 font-mulish text-sm">
                  No activity logs yet
                </p>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        )}
      </Tab.Group>

      <ShareModal open={modal} path={shareLink} handleClose={() => setModal(false)} />
      <DeleteConfirmationModal
        open={deleteModal}
        handleDelete={deleteReportHandler}
        handleClose={() => setDeleteModal(false)}
        conversation_id={deleteId}
        title="Delete Report?"
        description="Are you sure want to delete report?"
      />
    </div>
  );
};

export default MyAgentReportManagement;
