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
                open ? "min-w-[200px]" : ""
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
                  panelClassName={`rounded-lg py-2 px-3 text-gray-700  left-50 z-[1] !fixed z-[9999]`}
                >
                  <ul id="dropdown">
                    <li
                      className="mb-2 cursor-pointer"
                      onClick={() => {
                        undefined;
                      }}
                    >
                      <div className="flex items-center">
                        <ShareIcon className="mr-2" /> Continue
                      </div>
                    </li>
                    <li
                      className="mb-2 cursor-pointer"
                      onClick={() => {
                        undefined;
                      }}
                    >
                      <div className="flex items-center">
                        <EditIcon className="mr-2" /> Rename
                      </div>
                    </li>
                    <li
                      className="mb-2 cursor-pointer"
                      onClick={() => {
                        undefined;
                      }}
                    >
                      <div className="flex items-center">
                        <DustbinIcon className="mr-2" /> Delete
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
