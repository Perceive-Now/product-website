import { useMemo, useState, useEffect } from "react";

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
// import JSZip from "jszip";
import IconFile from "src/components/icons/side-bar/icon-file";
import { useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "src/components/reusable/pagination";
/**
 *
 */
const Reports = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = jsCookie.get("user_id");
  const { id } = useParams();
  const { tab } = location.state || 0 ; 
  const urlParams = new URLSearchParams(location.search);
  const project_name = urlParams.get("project");
  const [reports, setreports] = useState<any[]>([]);
  const [totalReports, setTotalReports] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState(false);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [shareLink, setShareLink] = useState("");
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

  const fetchHistoryData = async () => {
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
        setTotalReports(data.total_reports);
        setreports(data.reports);
        console.log("Total reports---------", data.reports[0]);
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

  // const handleBulkDownload = () => {
  //   const zip = new JSZip();

  //   selectedRows.forEach((selectedIndex: any, index: number) => {
  //     const selectedReport: any = reports[selectedIndex];

  //     if (selectedReport && selectedReport.report_url) {
  //       const file = selectedReport.report_url;

  //       // Get the file name (either from file object or URL)
  //       const fileName = file.name || file.split("/").pop();

  //       // If the file is a Blob (binary data), add it to the zip
  //       if (file instanceof Blob) {
  //         zip.file(fileName, file);
  //       } else if (typeof file === "string") {
  //         // If the file is a URL or path, fetch it and add as a Blob
  //         fetch(file)
  //           .then((response) => response.blob())
  //           .then((blob) => {
  //             zip.file(fileName, blob);
  //           })
  //           .catch((error) => {
  //             console.error("Failed to fetch file:", error);
  //           });
  //       }
  //     }
  //   });

  //   // Generate the ZIP file and trigger the download
  //   zip.generateAsync({ type: "blob" }).then((content) => {
  //     const link = document.createElement("a");
  //     link.href = URL.createObjectURL(content);
  //     link.download = "reports.zip";
  //     link.click();
  //   });
  // };

  const deleteReportHandler = async (projectid: string, index: number) => {
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
        fetchHistoryData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openFileHandler = (fileUrl: string) => {
    window.open(fileUrl, "_blank");
  };

  const RowActions = ({
    row,
    deleteReportHandler,
    openFileHandler,
  }: {
    row: any;
    deleteReportHandler: (reportId: string, index: number) => void;
    openFileHandler: (fileUrl: string) => void;
  }) => {
    const handleDelete = () => {
      const { report_id } = row.original;
      deleteReportHandler(report_id, row.index);
    };

    const handleShareReport = () => {
      setShareLink(row.original.report_url);
      setModal(true);
    };

    const handleDownload = () => {
      openFileHandler(row.original.report_url);
    };

    return (
      <Tooltip
        isCustomPanel={true}
        right="0px"
        trigger={<VerticalThreeDots data-dropdown-toggle="dropdown" className="cursor-pointer" />}
        panelClassName="rounded-lg py-2 px-3 text-gray-700 min-w-[200px] right-0"
      >
        <ul id="dropdown">
          <li className="mb-2 cursor-pointer" onClick={handleDownload}>
            <div className="flex items-center">
              <DownloadIcon className="mr-2" /> Download
            </div>
          </li>
          <li className="mb-2 cursor-pointer" onClick={handleDelete}>
            <div className="flex items-center">
              <TrashIcon className="mr-2" /> Delete Report
            </div>
          </li>
          <li className="cursor-pointer" onClick={handleShareReport}>
            <div className="flex items-center">
              <ShareIcon className="mr-2" /> Share
            </div>
          </li>
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
          <div className="pl-1 pt-1">
            <CheckboxInput
              className="border-white"
              checked={row.getIsSelected()}
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
        header: "Type",
        accessorKey: "type",
        // minSize: 200,
        cell: (item) => <p className="line-clamp-1">{item.row.original.report_type}</p>,
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
          const bytes = parseInt(reportSizeStr.replace(" bytes", ""), 10);
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
        // minSize: 100,
        cell: ({ row }) => (
          <RowActions
            row={row}
            deleteReportHandler={deleteReportHandler}
            openFileHandler={openFileHandler}
          />
        ),
      }),
    ],
    [],
  );

  return (
    <div className="space-y-[20px] w-full z-10">
      <div className="p-1 pl-0">
        <h6 className="text-lg font-semibold ml-0">
        Project Hub (Report Management) &gt; {project_name}
        </h6>
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
                `w-full text-base px-3 rounded-tl-md rounded-bl-md focus:outline-none font-nunito border-l border-t border-b border-appGray-600 ${
                  selected ? "text-white bg-primary-900" : "text-black"
                }`
              }
            >
              Reports
            </Tab>
            <Tab
              //  onClick={() => {
              //   navigate(`/quick-reports/${id}`);
              // }}
              className={({ selected }) =>
                `w-full text-base px-2 rounded-tr-md rounded-br-md focus:outline-none font-nunito border-r border-t border-b border-appGray-600 ${
                  selected ? "text-white bg-primary-900" : "text-black"
                }`
              }
            >
              Requirements
            </Tab>
          </Tab.List>
          {selectedTabIndex === 1 && (
            <div className="ml-auto">
              <Button
                type="primary"
                handleClick={() => {
                  navigate(`/quick-reports/${id}?project=${project_name}`,{state: reports[0]});
                }}
              >
                <div className="flex items-center gap-1">Add Resources</div>
              </Button>
            </div>
          )}
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
                    <Button
                      type="gray"
                      classname="flex items-center gap-1"
                      handleClick={handleBulkDelete}
                    >
                      <div className="flex items-center gap-2">
                        <TrashIcon />
                        Delete
                      </div>
                    </Button>
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
                {reports.length > 0 && (
                  <div className="overflow-y-auto">
                    <div className="">
                      <div className="flex space-x-4">
                        {/* First Part: File Upload and Paste URL */}
                        <div className="w-1/2 space-y-4">
                          <div className="w-full">
                            <label htmlFor="fullName" className="block text-lg font-semibold">
                              Report Name :{" "}
                              <span className="font-normal">{reports[0]?.report_name}</span>
                            </label>
                          </div>

                          <div className="w-full">
                            <label htmlFor="fullName" className="block text-lg  font-semibold">
                              Primary Objective :{" "}
                              <span className="font-normal">{reports[0]?.usecase}</span>
                            </label>
                          </div>

                          <div className="w-full">
                            <label htmlFor="fullName" className="block text-lg font-semibold">
                              Questions:
                            </label>
                            {Array.isArray(reports[0]?.question) &&
                              reports[0]?.question.length > 0 ?
                              reports[0]?.question.map(
                                (question: string, index: number) => `${index+1}. ${question}`,
                              ):('No questions available')}
                          </div>
                          <div className="w-full">
                            <label htmlFor="fullName" className="block text-lg font-semibold">
                              Report Customization:
                            </label>

                            <ul className="list-disc pl-6">
                              <li>
                                <span className="font-semibold text-lg">Report Tone:</span>
                                <span className="font-normal"> {reports[0]?.report_tone}</span>
                              </li>
                              <li>
                                <span className="font-semibold text-lg">No. of charts/Tables:</span>
                                <span className="font-normal"> {reports[0]?.no_of_charts}</span>
                              </li>
                              <li>
                                <span className="font-semibold text-lg">Visual Style:</span>
                                <span className="font-normal"> {reports[0]?.visual_style}</span>
                              </li>
                              <li>
                                <span className="font-semibold text-lg">Citations:</span>
                                <span className="font-normal"> {reports[0]?.citations}</span>
                              </li>
                              <li>
                                <span className="font-semibold text-lg">Format:</span>
                                <span className="font-normal">
                                  {reports[0]?.format && reports[0]?.format.length > 0
                                    ? reports[0]?.format.map((item: any) => item).join(", ")
                                    : "No formats available"}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* Second Part: Added Websites and Urls Listing */}
                        <div className="w-1/2 px-3 flex flex-col">
                          {/* Added Websites */}
                          <div className="h-full pl-[28%]">
                            <div className="border border-appGray-600 rounded-lg h-full flex flex-col p-2">
                              <div className="rounded-lg p-2 flex-1">
                                <h6 className="font-semibold mb-1 text-base font-nunito">
                                  Added Websites
                                </h6>

                                {reports[0]?.websites && reports[0]?.websites.length > 0 ? (
                                  <div className="h-[210px] pn_scroller overflow-y-auto p-1">
                                    {reports[0]?.websites.map((url: any, index: number) => (
                                      <div key={index}>
                                        {index !== 0 && (
                                          <hr className="my-1 border-1 border-appGray-300" />
                                        )}
                                        <div className="flex justify-between items-center">
                                          <a
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-nunito cursor-pointer text-blue-600"
                                          >
                                            {url}
                                          </a>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-xs text-gray-500 font-nunito text-center p-3 mt-3">
                                    No websites added.
                                  </p>
                                )}
                              </div>

                              {/* Added Reports Listing */}
                              <div className="rounded-lg p-2 flex-1">
                                <h6 className="font-semibold mb-1 text-base font-nunito flex items-center">
                                  Uploaded files
                                  {/* <DownloadIcon className="ml-2 cursor-pointer"/> */}
                                </h6>

                                {Object.keys(reports[0]?.file_data).length > 0 ? (
                                  <div className="h-[210px] pn_scroller overflow-y-auto pr-1">
                                    {Object.keys(reports[0]?.file_data).map((key, index) => {
                                      const fileUrl = reports[0]?.file_data[key];
                                      if (!fileUrl) return null;
                                      return (
                                        <div key={index}>
                                          {index !== 0 && (
                                            <hr className="my-1 border-1 border-appGray-300" />
                                          )}
                                          <div
                                            onClick={() => {
                                              openFileHandler(fileUrl);
                                            }}
                                          >
                                            <IconFile className="cursor-pointer" />
                                          </div>
                                          <div className="flex justify-between items-center">
                                            <p className="text-sm font-nunito">{fileUrl}</p>{" "}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <p className="text-xs text-gray-500 text-center p-3 font-nunito mt-3">
                                    No file uploaded
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        )}
      </Tab.Group>

      <ShareModal open={modal} path={shareLink} handleClose={() => setModal(false)} />
    </div>
  );
};

export default Reports;
