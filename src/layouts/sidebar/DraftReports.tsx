import { PaginationState } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { fetchAgentReports } from "src/pages/my-account/my-agent-reports/agent-report.action";
import jsCookie from "js-cookie";
import { Link, useSearchParams } from "react-router-dom";
import Tooltip from "src/components/reusable/popover";
import classNames from "classnames";
import { DustbinIcon, ShareIcon, VerticalThreeDots } from "src/components/icons";
import EditIcon from "src/components/icons/miscs/Edit";
import IconFile from "src/components/icons/side-bar/icon-file";
import SvgDocumentIcon from "./_assets/paper-icon";

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

  const [searchParams] = useSearchParams();

  const threadId = searchParams.get("threadId");

  const userId = jsCookie.get("user_id");
  const [reportList, setReportList] = useState<{ loading: boolean; reports: any[] }>({
    loading: true,
    reports: [],
  });

  const filteredReports =
    reportList.reports.length > 0
      ? reportList.reports
          .sort((a: any, b: any) => {
            const dateA = +new Date(a.created_at);
            const dateB = +new Date(b.created_at);
            return dateB - dateA; // Descending order
          })
          .filter((report: any) => report.is_complete === false)
      : [];

  useEffect(() => {
    setReportList({
      ...reportList,
      loading: true,
    });
    fetchAgentReports(userId || "", setReportList);
  }, [threadId]);

  const handleRenameReport = async (reportId: string) => {
    const reportName = prompt("Enter new report name");

    // validate report name
    if (!reportName) {
      alert("Report name cannot be empty");
      return;
    }

    if (reportName?.length > 50) {
      alert("Report name cannot be more than 50 characters");
      return;
    }

    if (reportName) {
      const res = await fetch(
        `https://templateuserrequirements.azurewebsites.net/agents/rename_thread/${userId}/${threadId}?thread_name=${reportName}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      if (res.status === 200) {
        alert("Report renamed successfully");

        setReportList({
          ...reportList,
          reports: reportList.reports.map((report) =>
            report.id === reportId ? { ...report, thread_name: reportName } : report,
          ),
        });
      }
    }
  };

  const handleDeleteReport = async (reportId: string) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmDelete = confirm("Are you sure you want to delete this report?");
    if (confirmDelete) {
      // await deleteReport(reportId);
      const data = {
        user_id: userId,
        thread_id: reportId.toString(),
      };

      const res = await fetch(`https://templateuserrequirements.azurewebsites.net/threads/delete`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        alert("Report deleted successfully");

        setReportList({
          ...reportList,
          reports: reportList.reports.filter((report) => report.id !== reportId),
        });
      }
    }
  };

  return (
    <div className="min-h-screen">
      <div
        onClick={setOpen}
        className={classNames(
          "py-1 px-1 rounded flex items-center gap-1 text-sm text-secondary-800",
        )}
      >
        <div
          style={{
            filter: "grayscale(1)",
          }}
        >
          <SvgDocumentIcon />
        </div>
        {open && <span className=" text-secondary-800 text-base">{"Report Draft"}</span>}
      </div>
      {open ? (
        <div className="max-h-[300px] overflow-y-auto pn_scroller">
          {filteredReports?.map((report, index) => (
            <div
              className={`transition-all flex items-center gap-1 w-full ${
                open
                  ? "min-w-[200px] hover:bg-[#FFE2B0] transition-all ease-in-out duration-100 rounded-[8px]"
                  : ""
              } justify-between group`}
              key={report.thread_name}
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
                {/* <div
                key={index}
                style={{
                  filter: "grayscale(1)",
                }}
              >
                <IconFile />
              </div> */}
                {open && (
                  <span className=" text-secondary-800 text-base">
                    {`$${report.thread_name?.split("-")[0]}`}
                  </span>
                )}
              </Link>

              {/* Three dots - Show on hover */}
              <div className={`relative hidden ${open ? "group-hover:block" : ""}`}>
                <Tooltip
                  isCustomPanel={true}
                  right="0px"
                  trigger={
                    <VerticalThreeDots data-dropdown-toggle="dropdown" className="cursor-pointer" />
                  }
                  panelClassName={`rounded-lg pt-2 px-2 text-gray-700  left-50 z-[1] !fixed z-[9999]`}
                >
                  <ul id="dropdown">
                    <li
                      className="mb-2 cursor-pointer"
                      onClick={() => {
                        undefined;
                      }}
                    >
                      <div className="flex items-center gap-x-1">
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
                        onClick={() => handleRenameReport(report.id)}
                      >
                        <EditIcon /> Rename
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
                        onClick={() => handleDeleteReport(report.id)}
                      >
                        <DustbinIcon /> Delete
                      </div>
                    </li>
                  </ul>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default DraftReports;
