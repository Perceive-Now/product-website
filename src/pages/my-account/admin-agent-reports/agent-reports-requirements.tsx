import { useEffect, useState } from "react";
import ReactTable from "../../../components/reusable/ReactTable";
import { Tab } from "@headlessui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
import TableSearch from "../../../components/reusable/table-search";
import { LoadingIcon } from "src/components/icons";
import ShareModal from "src/components/reusable/share-modal";
import { Disclosure } from "@headlessui/react";
import AddIcon from "src/components/icons/common/add-icon";
import IconFile from "src/components/icons/side-bar/icon-file";
import ReportConversation from "../my-agent-reports/my-reports/ReportConversation";

interface Report {
  report_name: string;
  report_type: string;
  date_modified: string;
  report_complete_status: boolean;
  report_size: string;
  question: string[];
  file_data: Record<string, string>;
  usecase: string;
}

interface Thread {
  thread_name: string;
  user_id: string;
  use_case: string;
  industry: string;
  agent_name: string;
  is_complete: boolean;
  id: number;
  created_at: string;
  updated_at: string;
}

const AgentRequirements = () => {
  const navigate = useNavigate();
  const { threadid, userid } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [reports, setReports] = useState<Report[]>([
    // Sample report data
    {
      report_name: "Report 1",
      report_type: "Type 1",
      date_modified: "2021-10-10",
      report_complete_status: true,
      report_size: "1024 bytes",
      question: ["Question 1", "Question 2"],
      file_data: {
        file1: "file1.pdf",
        file2: "file2.pdf",
      },
      usecase: "Primary Objective 1",
    },
    // ... other reports
  ]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [shareLink] = useState(""); // Placeholder for share link
  const [selectedTabIndex, setSelectedTabIndex] = useState(0); // Default tab index
  const [threads, setThreads] = useState<Thread[]>([]); // State for fetched threads
  const [loadingThreads, setLoadingThreads] = useState(false); // Loading state for threads

  const [reportConversation, setReportConversation] = useState<any>({}); // Placeholder for report conversation
  const [reportConversationLoading, setReportConversationLoading] = useState(false); // Placeholder for report conversation loading

  const filteredReports = reports.filter(
    (report) =>
      report.report_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.report_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.date_modified.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (report.report_complete_status ? "Completed" : "Pending")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      report.report_size.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const columns = [
    {
      header: "Report Name",
      accessorKey: "report_name",
      cell: (item: any) => <p className="line-clamp-1">{item.row.original.report_name}</p>,
    },
    {
      header: "File Type",
      accessorKey: "report_type",
      cell: (item: any) => <p className="line-clamp-1">{item.row.original.report_type}</p>,
    },
    {
      header: "Date Modified",
      accessorKey: "date_modified",
      cell: (item: any) => <p className="line-clamp-1">{item.row.original.date_modified}</p>,
    },
    {
      header: "Status",
      accessorKey: "report_complete_status",
      cell: (item: any) => (
        <span>{item.row.original.report_complete_status ? "Completed" : "Pending"}</span>
      ),
    },
    {
      header: "Size",
      accessorKey: "report_size",
      cell: (item: any) => {
        const bytes = parseInt(item.row.original.report_size.replace(" bytes", ""), 10);
        const mb = bytes / 1024 / 1024;
        return <span>{mb.toFixed(2)} MB</span>;
      },
    },
    {
      header: "Download",
      // accessorKey: "file_data",
      cell: (item: any) => (
        <a
          href={item.row.original.file_data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Download
        </a>
      ),
    },
  ];

  // Fetch threads when the "Requirements" tab is selected
  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://templateuserrequirements.azurewebsites.net/agents/reportcheck/${userid}/${threadid}`,
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Reports fetched:", data);

        if (data.report_completed && Array.isArray(data.report_info)) {
          setReports(
            data.report_info.map((report: any) => ({
              report_name: report.filename, // Use filename for report name
              report_type: report.filename.split(".").pop(), // Extract file type
              date_modified: report.datetime, // Assign datetime
              report_complete_status: data.report_completed,
              report_size: `${report.size} bytes`, // Keep size in bytes
              question: [],
              file_data: { url: report.url }, // Store file URL
              usecase: "N/A", // Placeholder
            })),
          );
        } else {
          setReports([]); // No reports available
        }
      } else {
        console.error("Failed to fetch reports");
      }
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchConversation = async (threadId: string, userId: string) => {
    setReportConversationLoading(true);
    try {
      const res = await fetch(
        `https://templateuserrequirements.azurewebsites.net/threads/${threadId}/${userId}`,
      );
      const data = await res.json();
      setReportConversation(data);
    } catch (err) {
      console.error("Error fetching conversation:", err);
    } finally {
      setReportConversationLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTabIndex === 0) {
      fetchReports();
    }
    if (selectedTabIndex === 1) {
      fetchConversation(threadid as string, userid as string);
    }
  }, [selectedTabIndex, threadid, userid]);

  return (
    <div className="space-y-[20px] w-full z-10">
      <div className="p-1 pl-0">
        <h6 className="text-lg font-semibold ml-0">
          Settings &gt; Admin Agent Report management &gt; {threadid}
        </h6>
        <div className="flex justify-start items-center pt-3 pl-1">
          <p className="mr-4 text-secondary-800 flex items-center" onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="mr-1" />
            Back
          </p>
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
              className={({ selected }) =>
                `w-full text-base px-2 rounded-tr-md rounded-br-md focus:outline-none font-nunito border-r border-t border-b border-appGray-600 ${
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
            <Tab.Panel>
              <div className="flex items-center gap-1 ">
                <p className="font-bold text-base">
                  Total Reports<span className="ml-3">{reports.length}</span>
                </p>
              </div>
              <div className="flex items-center gap-1 w-full">
                <div className="w-[300px] my-2">
                  <TableSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </div>
              </div>
              <ReactTable
                columnsData={columns}
                rowsData={filteredReports}
                size="medium"
                noTopBorder
              />
            </Tab.Panel>
            <Tab.Panel>
              <div className="mt-5 mb-5 w-full z-10">
                <ReportConversation
                  loading={reportConversationLoading}
                  reports={reportConversation}
                />
              </div>
            </Tab.Panel>
          </Tab.Panels>
        )}
      </Tab.Group>

      <ShareModal open={modal} path={shareLink} handleClose={() => setModal(false)} />
    </div>
  );
};

export default AgentRequirements;
