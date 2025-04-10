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
import { API_PROD_URL } from "src/utils/axios";
/**
 *
 */
const Reports = () => {
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
  const [loading, setLoading] = useState(true);
  const [shareLink, setShareLink] = useState("");
  const [activityLog, setActivityLog] = useState<{ comment: string; date_and_time: string }[]>([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(tab);
  const selectedRows = Object.keys(rowSelection).filter((rowId) => rowSelection[rowId]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const filteredReports =
    reports.length > 0
      ? reports
          .filter((report: any) =>
            report.report_name.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .slice(
            pagination.pageIndex * pagination.pageSize,
            pagination.pageIndex * pagination.pageSize + pagination.pageSize,
          )
      : [];

  const fetchActivityLog = async () => {
    try {
      const response = await fetch(`${API_PROD_URL}/comments/?user_id=${userId}&project_id=${id}`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
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
    try {
      const response = await fetch(`${API_PROD_URL}/reports/${userId}/${id}`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
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

  useEffect(() => {
    fetchHistoryData();
    fetchActivityLog();
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

  // const handleBulkDownload = () => {
  //   selectedRows.forEach((selectedIndex: any, index: number) => {
  //     const selectedReport: any = reports[selectedIndex];

  //     if (selectedReport && selectedReport.file_data && selectedReport.file_data.file1) {
  //       const fileUrl = selectedReport.file_data.file1;

  //       const link = document.createElement("a");
  //       link.href = fileUrl;
  //       link.download = fileUrl.split("/").pop();
  //       console.log("downloading file:", link.download);

  //       setTimeout(() => {
  //         link.click();
  //       }, index * 100);
  //     }
  //   });
  // };

  // const handleBulkDownload = () => {
  //   console.log("ppppppppppppp")
  //   const zip = new JSZip();

  //   selectedRows.forEach((selectedIndex: any, index: number) => {
  //     const selectedReport: any = reports[selectedIndex];

  //     if (selectedReport && selectedReport.report_url) {
  //       const file = selectedReport.report_url;

  //       const fileName = file.name || file.split("/").pop();
  //       zip.file(fileName, file);
  //     }
  //   });

  //   zip.generateAsync({ type: "blob" }).then((content) => {
  //     const link = document.createElement("a");
  //     link.href = URL.createObjectURL(content);
  //     link.download = "reports.zip";
  //     link.click();
  //   });
  // };

  const handleBulkDownload = async () => {
    const reportName = reports[(selectedRows as any)[0] as number]?.report_name;
    const obj: Record<string, string> = {};

    selectedRows.forEach((selectedIndex: any, index) => {
      const selectedReport: any = reports[selectedIndex];
      if (selectedReport && selectedReport.report_url) {
        const file = selectedReport.report_url;
        if (file) {
          let fileName = file.split("/").pop() || "unknown_file";

          // Ensure unique file names
          if (obj[fileName]) {
            const uniqueSuffix = `_${index}`;
            const fileParts = fileName.split(".");
            if (fileParts.length > 1) {
              const extension = fileParts.pop();
              fileName = `${fileParts.join(".")}${uniqueSuffix}.${extension}`;
            } else {
              fileName += uniqueSuffix;
            }
          }

          obj[fileName] = file;
        }
      }
      return null;
    });

    try {
      const response = await fetch(`${API_PROD_URL}/reports/zip/custom`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          [reportName]: obj,
        }),
      });
      toast.success("Downloading Reports");

      if (response.ok) {
        arrayBufferDownload(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Generate the ZIP file and trigger the download

  const deleteReportHandler = useCallback(async (projectid: number) => {
    try {
      const response = await fetch(
        `${API_PROD_URL}/report/delete?user_id=${userId}&project_id=${id}&report_id=${projectid}`,
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

  const columnHelper = createColumnHelper<any>();

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "select-col",
        header: ({ table }) => {
          const selectableRows = table
            .getRowModel()
            .rows.filter((row) => row.original.report_complete_status);

          // Check if all selectable rows are selected
          const areAllSelectableRowsSelected =
            selectableRows.length > 0 && selectableRows.every((row) => row.getIsSelected());

          return (
            <div className="pl-1 pt-1">
              <CheckboxInput
                className="border-white"
                checked={areAllSelectableRowsSelected}
                // indeterminate={
                //   areSomeSelectableRowsSelected && !areAllSelectableRowsSelected
                // }
                onChange={() => {
                  const shouldSelectAll = !areAllSelectableRowsSelected;
                  selectableRows.forEach((row) => {
                    row.toggleSelected(shouldSelectAll);
                  });
                }}
              />
            </div>
          );
        },
        cell: ({ row }) => (
          <div className="pl-1 pt-1">
            <CheckboxInput
              className="border-white"
              checked={row.getIsSelected()}
              disabled={!row.original.report_complete_status}
              onChange={row.getToggleSelectedHandler()}
            />
          </div>
        ),
      },
      {
        header: "Report",
        accessorKey: "report_name",
        // minSize: 400,
        cell: (item) => <p className="line-clamp-1">{item.row.original.report_name}</p>,
      },
      {
        header: "File Name",
        accessorKey: "report_name",
        // minSize: 400,
        cell: (item) => <p className="line-clamp-1">{item.row.original.filename || "-"}</p>,
      },
      {
        header: "Type",
        accessorKey: "type",
        // minSize: 200,
        cell: (item) => <p className="line-clamp-1">{item.row.original.report_type}</p>,
      },
      {
        header: "Date Modified",
        accessorKey: "date_modified",
        // minSize: 200,
        cell: (item) => (
          <p className="line-clamp-1">{formatDate(item.row.original.date_modified)}</p>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        // minSize: 200,
        cell: (item) => (
          <span>{item.row.original.report_complete_status ? "Completed" : "Pending"}</span>
        ),
      },
      {
        header: "Size",
        accessorKey: "size",
        cell: (item) => {
          const reportSizeStr = item.row.original.report_size;
          const bytes = parseInt(reportSizeStr, 10);
          const mb = bytes / 1024 / 1024;
          return <span>{mb.toFixed(2)} MB</span>;
        },
      },
      // {
      //   header: "Permission",
      //   accessorKey: "permission",
      //   // minSize: 200,
      //   cell: (item) => <span>{item.row.original.permission}</span>,
      // },
      // {
      //   header: "Date Modified",
      //   accessorKey: "date_modified",
      //   minSize: 200,
      //   cell: (item) => <span>18 Dec 2024</span>,
      // },
      // {
      //   header: " ",
      //   // accessorKey: "lead_investigator_given",
      //   minSize: 80,
      //   cell: (item) => (
      //     // <button type="button">
      //     //   <EditIcon />
      //     // </button>
      //     <TableDropdown
      //     // menuItems={menuItems}
      //     // width="xs"
      //     // alignment="right"
      //     // conversation_id={item.row.original.id}
      //     />
      //   ),
      // },
      columnHelper.display({
        id: "actions",
        minSize: 100,
        cell: ({ row }) => <RowActions row={row} openFileHandler={openFileHandler} />,
      }),
    ],
    [],
  );

  return (
    <div className="space-y-[20px] w-full z-10 pb-[7%]">
      <div className="p-1 pl-0">
        <h6 className="text-lg font-semibold ml-0">Project Hub &gt; {project_name}</h6>
        <div className="flex justify-start items-center pt-3 pl-1">
          <Link to="/my-projects">
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
                `w-full text-base px-2 focus:outline-none font-nunito border-r border-t border-b border-appGray-600 ${
                  selected ? "text-white bg-primary-900" : "text-black"
                }`
              }
            >
              Requirements
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full text-base px-3 rounded-tr-md rounded-br-md focus:outline-none font-nunito border-r border-t border-b border-appGray-600 whitespace-nowrap ${
                  selected ? "text-white bg-primary-900" : "text-black"
                }`
              }
            >
              Activity log
            </Tab>
          </Tab.List>
          {/* {selectedTabIndex === 1 && (
            <div className="ml-auto">
              <Button
                type="primary"
                handleClick={() => {
                  navigate(`/quick-reports/${id}?project=${project_name}`, { state: reports[0] });
                }}
              >
                <div className="flex items-center gap-1">Add Resources</div>
              </Button>
            </div>
          )} */}
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <LoadingIcon fontSize={40} className="animate-spin text-primary-900" />
          </div>
        ) : (
          <Tab.Panels>
            <Tab.Panel>
              <div className="flex items-center gap-1">
                <p className="font-bold text-base">
                  Total Reports<span className="ml-3">{totalReports}</span>
                </p>
                {/* <div className="ml-auto">
            <Link to={`/quick-reports/${id}`}>
              <Button type="primary">+ Add Resources</Button>
            </Link>
          </div> */}
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
            <Tab.Panel>
              <div className="mt-5 w-full z-10">
                {reports.length > 0 ? (
                  <div className="flex space-x-4">
                    {/* First Part: File Upload and Paste URL */}
                    <div className="w-full space-y-4">
                      <div className="w-full flex gap-15">
                        <label htmlFor="fullName" className="block text-lg font-semibold">
                          Report Name :{" "}
                          <span className="font-normal">{reports[0]?.report_name}</span>
                        </label>
                        <label htmlFor="fullName" className="block text-lg font-semibold">
                          Primary Objective :{" "}
                          <span className="font-normal">{reports[0]?.usecase}</span>
                        </label>
                      </div>

                      <div className="h-screen w-full mb-10">
                        <div className="mx-1 w-full divide-y divide-gray-300 bg-white shadow-lg rounded-lg">
                          {reports.map((report, index) => (
                            <Disclosure as="div" className="p-3" key={index}>
                              {({ open }) => (
                                <>
                                  <Disclosure.Button className="group flex w-full items-center justify-between">
                                    <span className="text-base font-semibold text-black">
                                      {formatDate(report.date_modified)}
                                    </span>
                                    {open ? (
                                      <ArrowUp className="size-2" />
                                    ) : (
                                      <ArrowDown className="size-2" />
                                    )}
                                  </Disclosure.Button>

                                  <Disclosure.Panel className="w-full mt-5 text-sm text-black transition-all duration-300 ease-in-out">
                                    <div className="mb-4">
                                      <p>
                                        <strong>Report Name:</strong> {report.report_name}
                                      </p>
                                      <p>
                                        <strong>Report Type:</strong> {report.report_type}
                                      </p>
                                      <p>
                                        <strong>Report Size:</strong> {report.report_size}
                                      </p>
                                      <p>
                                        <strong>Use Case:</strong> {report.usecase}
                                      </p>
                                      <p>
                                        <strong>Classification:</strong>{" "}
                                        {report?.classification?.screeningType || "N/A"}
                                      </p>
                                    </div>

                                    <div className="mb-4">
                                      <h4 className="font-semibold text-base">Questions:</h4>
                                      <div className="ml-3 mt-1">
                                        {Array.isArray(report?.question) &&
                                        report?.question.length > 0
                                          ? report?.question.map(
                                              (question: string, qIndex: number) => (
                                                <div key={qIndex}>
                                                  {qIndex + 1}. {question}
                                                </div>
                                              ),
                                            )
                                          : "No questions available"}
                                      </div>
                                    </div>

                                    {/* Report Customization */}
                                    <div className="mb-4">
                                      <h4 className="font-semibold text-base">
                                        Report Customization
                                      </h4>
                                      <ul className="list-disc pl-5">
                                        <li>
                                          <strong>Report Tone:</strong>{" "}
                                          {report?.config?.report_tone?.selected?.join(", ") ||
                                            "N/A"}
                                        </li>
                                        <li>
                                          <strong>Citations:</strong>{" "}
                                          {report?.config?.citations?.selected?.join(", ") || "N/A"}
                                        </li>
                                        <li>
                                          <strong>Format:</strong>{" "}
                                          {report?.config?.report_format?.selected?.join(", ") ||
                                            "N/A"}
                                        </li>
                                        <li>
                                          <strong>Audience Focus - Investors:</strong>{" "}
                                          {report?.config?.audience_focus?.investors?.selected?.join(
                                            ", ",
                                          ) || "N/A"}
                                        </li>
                                        <li>
                                          <strong>Audience Focus - Enterprise:</strong>{" "}
                                          {report?.config?.audience_focus?.enterprise?.selected?.join(
                                            ", ",
                                          ) || "N/A"}
                                        </li>
                                        <li>
                                          <strong>Explainability:</strong>{" "}
                                          {report?.config?.explainability?.selected?.join(", ") ||
                                            "N/A"}
                                        </li>
                                      </ul>
                                    </div>

                                    {/* Additional Metadata */}
                                    <div className="mb-4">
                                      <h4 className="font-semibold text-base">
                                        Additional Metadata
                                      </h4>
                                      <ul className="list-disc pl-5">
                                        <li>
                                          <strong>Sector Focus:</strong>{" "}
                                          {report?.additional_metadata?.sectorFocus?.selected?.join(
                                            ", ",
                                          ) || "N/A"}
                                        </li>
                                        <li>
                                          <strong>Company Stage:</strong>{" "}
                                          {report?.additional_metadata?.companyStage?.selected?.join(
                                            ", ",
                                          ) || "N/A"}
                                        </li>
                                        <li>
                                          <strong>Preferred Stage:</strong>{" "}
                                          {report?.additional_metadata?.preferredStage?.selected?.join(
                                            ", ",
                                          ) || "N/A"}
                                        </li>
                                        <li>
                                          <strong>Business Model:</strong>{" "}
                                          {report?.additional_metadata?.businessModel?.selected?.join(
                                            ", ",
                                          ) || "N/A"}
                                        </li>
                                        <li>
                                          <strong>Geographic Focus:</strong>{" "}
                                          {report?.additional_metadata?.geographicFocus?.selected?.join(
                                            ", ",
                                          ) || "N/A"}
                                        </li>
                                        <li>
                                          <strong>Benchmark Comparison:</strong>{" "}
                                          {report?.additional_metadata?.benchmarkComparison?.selected?.join(
                                            ", ",
                                          ) || "N/A"}
                                        </li>
                                      </ul>
                                    </div>

                                    {/* Websites */}
                                    <div className="mb-4">
                                      <h4 className="font-semibold text-base">Added Websites</h4>
                                      {report?.websites?.length > 0 ? (
                                        report?.websites.map((url: string, wIndex: number) => (
                                          <div key={wIndex}>
                                            <a
                                              href={url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-sm text-blue-600 underline"
                                            >
                                              {url}
                                            </a>
                                          </div>
                                        ))
                                      ) : (
                                        <p>No websites added.</p>
                                      )}
                                    </div>

                                    {/* Files */}
                                    <div className="mb-4">
                                      <h4 className="font-semibold text-base">Uploaded Files</h4>
                                      {report?.file_data &&
                                      Object.keys(report.file_data).length > 0 ? (
                                        Object.entries(report.file_data).map(
                                          ([category, files]: any, i) => (
                                            <div key={i} className="mb-2">
                                              <p className="font-medium">{category}</p>
                                              {files.map((url: string, fIndex: number) => (
                                                <div
                                                  key={fIndex}
                                                  className="cursor-pointer"
                                                  onClick={() => openFileHandler(url)}
                                                >
                                                  <IconFile className="h-[60px] w-[60px]" />
                                                  <p className="text-xs">{url}</p>
                                                </div>
                                              ))}
                                            </div>
                                          ),
                                        )
                                      ) : (
                                        <p className="text-sm text-gray-500">No files uploaded.</p>
                                      )}
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-center mt-[10%] font-semibold">
                      <div className="py-2">
                        No requirements have been added yet. Please click below to add the
                        requirements.
                      </div>
                      <Button
                        type="primary"
                        handleClick={() => {
                          navigate(`/quick-reports/${id}?project=${project_name}`, {
                            state: reports[0],
                          });
                        }}
                      >
                        <div className="flex items-center gap-1">Add Requirements</div>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="border border-appGray-500 w-[60%] p-2 rounded-lg mt-5">
                {activityLog && activityLog?.length > 0 ? (
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
                )}
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

export default Reports;
