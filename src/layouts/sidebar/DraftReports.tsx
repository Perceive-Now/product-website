import { PaginationState } from "@tanstack/react-table";
import React, { useEffect, useRef, useState } from "react";
import { fetchAgentReports } from "src/pages/my-account/my-agent-reports/agent-report.action";
import jsCookie from "js-cookie";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Tooltip from "src/components/reusable/popover";
import classNames from "classnames";
import { DustbinIcon, LoadingIcon, ShareIcon, VerticalThreeDots } from "src/components/icons";
import EditIcon from "src/components/icons/miscs/Edit";
import IconFile from "src/components/icons/side-bar/icon-file";
import SvgDocumentIcon from "./_assets/paper-icon";
import { Dialog } from "@headlessui/react";
import Button from "src/components/reusable/button";
import Loading from "src/components/reusable/loading";
import { generateReportName } from "src/utils/helpers";
import { useListing } from "./DraftProvider";
import { API_PROD_URL } from "src/utils/axios";

const reverseAgentMapping: Record<string, string> = {
  "Startup Diligence Agent": "company-diligence-agent",
  "Startup Diligence Agent'": "company-diligence-agent",
  "Fundraising Strategy Agent": "fundraising-strategy-agent",
  "Report on Anything Agent": "report-on-anything-agent",
  "Market Strategy Agent": "market-strategy-agent",
  "Portfolio Support Agent": "portfolio-support-agent",
  "Technology & R&D Agent": "technology-agent",
  "Product & Engineering Agent": "product-engineering-agent",
  "Corporate Venture Capital Agent": "corporate-venture-capital-agent",
  "Finance & Strategy Agent": "finance-strategy-agent",
  "Marketing & Sales Agent": "marketing-sales-agent",
  "Legal & Compliance Agent": "legal-compliance-agent",
  "": "Startup Diligence Agent",
};

interface Props {
  open: boolean;
  setOpen: () => void;
}

const DraftReports = (props: Props) => {
  const { open, setOpen } = props;

  const [openMenu, setOpenMenu] = useState(false);
  const [openMenuId, setOpenMenuId] = useState("");

  const { records, setRecords } = useListing();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [selectedThread, setSelectedThread] = useState({
    threadId: "",
    type: "",
    open: false,
  });

  const [submittingAction, setSubmittingAction] = useState(false);

  const closeThread = () => {
    setSelectedThread({
      threadId: "",
      type: "",
      open: false,
    });
  };

  const threadId = searchParams.get("threadId");

  const userId = jsCookie.get("user_id");
  // const [reportList, setReportList] = useState<{ loading: boolean; reports: any[] }>({
  //   loading: true,
  //   reports: [],
  // });

  // const filteredReports =
  //   reportList.reports.length > 0
  //     ? reportList.reports
  //         .sort((a: any, b: any) => {
  //           const dateA = +new Date(a.created_at);
  //           const dateB = +new Date(b.created_at);
  //           return dateB - dateA; // Descending order
  //         })
  //         .filter((report: any) => report.is_complete === false)
  //     : [];

  // useEffect(() => {
  //   setReportList({
  //     ...reportList,
  //     loading: true,
  //   });
  //   fetchAgentReports(userId || "", setReportList);
  // }, [threadId]);

  const [reportName, setReportName] = useState("");
  const [reportNameError, setReportNameError] = useState("");

  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      const currentMenu = menuRefs.current[openMenuId];
      if (currentMenu && !currentMenu.contains(event.target)) {
        setOpenMenu(false);
        setOpenMenuId("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  const handleRenameReport = async () => {
    if (reportNameError) {
      return;
    }
    if (reportName?.length > 50) {
      alert("Report name cannot be more than 50 characters");
      return;
    }

    if (reportName) {
      const res = await fetch(
        `${API_PROD_URL}/agents/rename_thread/${userId}/${selectedThread.threadId}?thread_name=${reportName}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      if (res.status === 200) {
        setRecords({
          loading: false,
          reports: records?.map((report: any) =>
            report.id === selectedThread.threadId ? { ...report, thread_name: reportName } : report,
          ),
        });
        closeThread();
        setReportName("");
        setSubmittingAction(false);
      } else {
        setSubmittingAction(false);
      }
    }
  };

  const handleDeleteReport = async () => {
    setSubmittingAction(true);
    // eslint-disable-next-line no-restricted-globals
    // await deleteReport(reportId);
    const data = {
      user_id: userId,
      thread_id: selectedThread.threadId.toString(),
    };

    const res = await fetch(`${API_PROD_URL}/threads/delete`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      setSubmittingAction(false);
      if (threadId?.toString() === selectedThread.threadId?.toString()) {
        navigate("/");
      }
      setRecords({
        loading: false,
        reports: records?.filter((report: any) => report.id !== selectedThread.threadId),
      });
      closeThread();
    } else {
      setSubmittingAction(false);
    }
  };

  console.log("recordsrecordsrecords", records);

  return (
    <>
      <div className="flex-1 flex flex-col min-h-0">
        <div
          onClick={setOpen}
          className={classNames(
            "py-1 px-1 rounded flex items-center gap-1 text-sm text-secondary-800 flex-0 sidebar-scope my-1",
          )}
        >
          <div
            style={{
              filter: "grayscale(1)",
            }}
          >
            <SvgDocumentIcon />
          </div>
          {open && <span className=" text-secondary-800 text-base">{"Scope of Work Draft"}</span>}
        </div>
        {open ? (
          <div
            className=" overflow-y-auto pn_scroller flex-1 min-h-0"
            onScroll={(e) => {
              if (openMenu) {
                setOpenMenu(false);
                setOpenMenuId("");
              }
            }}
          >
            {records?.map((report: any) => (
              <div
                className={`transition-all flex items-center gap-1 w-full ${
                  open
                    ? "min-w-[200px] hover:bg-[#FFE2B0] transition-all ease-in-out duration-100 rounded-[8px]"
                    : ""
                } justify-between group`}
                key={report.id}
              >
                <Link
                  onClick={setOpen}
                  to={`/ai-agent?agent=${
                    reverseAgentMapping[report.agent_name] || "company-diligence-agent"
                  }&threadId=${report.id}`}
                  key={report.key}
                  className={classNames(
                    "py-1 px-1 rounded text-sm text-secondary-800 flex items-center gap-1",
                  )}
                >
                  {open && (
                    <span className=" text-secondary-800 text-base">
                      {report.thread_name?.split("_")[0]?.length > 15
                        ? `${report.thread_name?.split("_")[0]?.substring(0, 15)}...`
                        : report.thread_name?.split("_")[0]}
                    </span>
                  )}
                </Link>

                {/* Three dots - Show on hover */}
                <div
                  className={`hidden ${
                    openMenu && open && openMenuId === report.id ? "!block" : ""
                  } ${open ? "group-hover:block" : ""}`}
                  ref={(el) => (menuRefs.current[report.id] = el)}
                >
                  <VerticalThreeDots
                    data-dropdown-toggle="dropdown"
                    className="cursor-pointer"
                    onClick={(event) => {
                      const rect = (event.target as HTMLElement).getBoundingClientRect();
                      setMenuPosition({
                        top: rect.bottom + window.scrollY,
                        left: rect.left + window.scrollX,
                      });
                      setOpenMenu(true);
                      setOpenMenuId(report.id);
                    }}
                  />

                  {openMenu && openMenuId === report.id && menuPosition ? (
                    <div
                      className="absolute p-2 mt-2 w-[150px] bg-white rounded-lg shadow-lg border z-[1]"
                      style={{
                        top: menuPosition.top,
                        left: menuPosition.left,
                      }}
                    >
                      <ul id="dropdown">
                        <li
                          className="mb-2 cursor-pointer"
                          onClick={() => {
                            undefined;
                          }}
                        >
                          <div
                            className="flex items-center gap-x-1"
                            onClick={() => {
                              navigate(
                                `/ai-agent?agent=${
                                  reverseAgentMapping[report.agent_name] ||
                                  "company-diligence-agent"
                                }&threadId=${report.id}`,
                              );
                            }}
                          >
                            <ShareIcon />
                            Continue
                          </div>
                        </li>
                        <li
                          className="mb-2 cursor-pointer"
                          onClick={() => {
                            undefined;
                          }}
                        >
                          <div
                            className="flex items-center gap-x-1"
                            onClick={() => {
                              setSelectedThread({
                                open: true,
                                threadId: report.id,
                                type: "rename",
                              });
                            }}
                          >
                            <EditIcon /> Rename
                          </div>
                        </li>
                        <li
                          className=" cursor-pointer"
                          onClick={() => {
                            undefined;
                          }}
                        >
                          <div
                            className="flex items-center gap-x-1"
                            onClick={() => {
                              setSelectedThread({
                                open: true,
                                threadId: report.id,
                                type: "delete",
                              });
                            }}
                          >
                            <DustbinIcon /> Delete
                          </div>
                        </li>
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <Dialog open={selectedThread.open} onClose={closeThread} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative bg-white w-full max-w-[400px] min-w-[400px] p-5 rounded-xl shadow-[7px_9px_14px_0] shadow-[#000]/[0.25]">
            {selectedThread.type === "delete" ? (
              <>
                <p className="text-lg font-bold mb-4">{"Delete Report?"}</p>
                <p>Are you sure you want to delete this report?</p>
                <div className="flex gap-2 mt-4">
                  <Button type="gray" handleClick={closeThread} disabled={submittingAction}>
                    Go Back
                  </Button>
                  <Button
                    type="primary"
                    handleClick={handleDeleteReport}
                    disabled={submittingAction}
                  >
                    {submittingAction ? (
                      <LoadingIcon className="text-white animate-spin text-black" />
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </div>
              </>
            ) : selectedThread.type === "rename" ? (
              <>
                <p className="text-lg font-bold mb-4">{"Rename Report"}</p>
                <input
                  type="text"
                  placeholder={`Thread name`}
                  value={reportName}
                  onChange={(e) => {
                    setReportName(e.target.value);
                    if (e.target.value.length > 50) {
                      setReportNameError("Report name cannot be more than 50 characters");
                    } else {
                      setReportNameError("");
                    }
                  }}
                  // className="border border-gray-300 p-1 rounded-xs flex-auto placeholder:text-appGray-600 focus:outline-none focus:outline-none focus:ring-2 text-sm w-full"
                  className="mt-1 block w-full px-2 py-[13px] border-gray-300 border-[1px]  focus:outline-none focus:ring-2"
                />
                {reportNameError && (
                  <div className="text-xs text-danger-500">{reportNameError}</div>
                )}
                <div className="flex gap-2 mt-4">
                  <Button type="gray" handleClick={closeThread} disabled={submittingAction}>
                    Go Back
                  </Button>
                  <Button
                    type="primary"
                    handleClick={handleRenameReport}
                    disabled={submittingAction || !reportName.trim()}
                  >
                    {submittingAction ? (
                      <LoadingIcon className="text-white animate-spin text-black" />
                    ) : (
                      "Update"
                    )}
                  </Button>
                </div>
              </>
            ) : null}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default DraftReports;
