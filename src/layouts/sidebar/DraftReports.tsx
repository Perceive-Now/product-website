import { PaginationState } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { fetchAgentReports } from "src/pages/my-account/my-agent-reports/agent-report.action";
import jsCookie from "js-cookie";
import { Link } from "react-router-dom";
import Tooltip from "src/components/reusable/popover";
import classNames from "classnames";
import { DustbinIcon, ShareIcon, VerticalThreeDots } from "src/components/icons";
import EditIcon from "src/components/icons/miscs/Edit";

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

const DraftReports = () => {
  const userId = jsCookie.get("user_id");
  const [reportList, setReportList] = useState<{ loading: boolean; reports: any[] }>({
    loading: true,
    reports: [],
  });

  useEffect(() => {
    setReportList({
      reports: [],
      loading: true,
    });
    fetchAgentReports(userId || "", setReportList);
  }, []);
  return (
    <div>
      <p>Report Draft</p>
      <div>
        {reportList.reports?.map((report, index) => (
          <div className="flex items-center gap-1 w-100" key={report.thread_name}>
            <Link
              to={`/ai-agent?agent=${
                reverseAgentMapping[report.agent_name] || "company-diligence-agent"
              }&threadId=${report.id}`}
              key={report.key}
              className={classNames("py-1 px-1 rounded text-sm text-secondary-800")}
            >
              <div
                key={index}
                style={{
                  filter: "grayscale(1)",
                }}
              >
                {`$${report.thread_name?.split("-")[0]}`}
              </div>
            </Link>
            <Tooltip
              isCustomPanel={true}
              right="0px"
              trigger={
                <VerticalThreeDots data-dropdown-toggle="dropdown" className="cursor-pointer" />
              }
              panelClassName="rounded-lg py-2 px-3 text-gray-700 min-w-[200px] left-0"
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
                {/* <li className={`${row.original.report_url ? "mb-2" : ""} cursor-pointer`} onClick={handleDelete}>
                      <div className="flex items-center">
                        <TrashIcon className="mr-2" /> Delete Report
                      </div>
                    </li> */}
              </ul>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraftReports;
