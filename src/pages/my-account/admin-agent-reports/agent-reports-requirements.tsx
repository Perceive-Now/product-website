import { useEffect, useState } from "react";
import ReactTable from "../../../components/reusable/ReactTable";
import { Tab } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
import TableSearch from "../../../components/reusable/table-search";
import { LoadingIcon } from "src/components/icons";
import ShareModal from "src/components/reusable/share-modal";
import { Disclosure } from "@headlessui/react";
import AddIcon from "src/components/icons/common/add-icon";
import IconFile from "src/components/icons/side-bar/icon-file";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [reports] = useState<Report[]>([
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

  const filteredReports = reports; // Placeholder for filtered reports

  const columns = [
    {
      header: "Report",
      accessorKey: "report_name",
      cell: (item: any) => <p className="line-clamp-1">{item.row.original.report_name}</p>,
    },
    {
      header: "Type",
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
      accessorKey: "status",
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
  ];

  // Fetch threads when the "Requirements" tab is selected
  const fetchThreads = async () => {
    setLoadingThreads(true);
    try {
      const response = await fetch(
        "https://templateuserrequirements.azurewebsites.net/threads/153",
        {
          method: "GET",
          headers: { Accept: "application/json" },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setThreads(data);
      } else {
        console.error("Failed to fetch threads");
        setThreads([]);
      }
    } catch (err) {
      console.error("Error fetching threads:", err);
      setThreads([]);
    } finally {
      setLoadingThreads(false);
    }
  };

  useEffect(() => {
    if (selectedTabIndex === 1) {
      // Requirements tab
      fetchThreads();
    }
  }, [selectedTabIndex]);

  return (
    <div className="space-y-[20px] w-full z-10">
      <div className="p-1 pl-0">
        <h6 className="text-lg font-semibold ml-0">
          Settings &gt; Admin Agent Report management &gt; Project Name
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
              {loadingThreads ? (
                <div className="flex justify-center items-center">
                  <LoadingIcon fontSize={40} className="animate-spin text-primary-900" />
                </div>
              ) : (
                <div className="mt-5 mb-5 w-full z-10">
                  {threads.length > 0 ? (
                    threads.map((thread, index) => (
                      <Disclosure as="div" key={index}>
                        {({ open }) => (
                          <div className="bg-white shadow p-3 border-b">
                            <Disclosure.Button className="group flex w-full items-center justify-between">
                              <span className="text-base font-semibold text-black">
                                {thread.thread_name}
                              </span>
                              {open ? <AddIcon /> : <AddIcon />}
                            </Disclosure.Button>
                            <Disclosure.Panel className="w-full mt-5 text-sm text-black transition-all duration-300 ease-in-out">
                              <div className="flex flex-col gap-2">
                                <p>Use Case: {thread.use_case}</p>
                                <p>Industry: {thread.industry}</p>
                                <p>Agent Name: {thread.agent_name}</p>
                                <p>Created At: {new Date(thread.created_at).toLocaleString()}</p>
                                <p>Updated At: {new Date(thread.updated_at).toLocaleString()}</p>
                              </div>
                            </Disclosure.Panel>
                          </div>
                        )}
                      </Disclosure>
                    ))
                  ) : (
                    <p>No requirements found.</p>
                  )}
                </div>
              )}
            </Tab.Panel>
          </Tab.Panels>
        )}
      </Tab.Group>

      <ShareModal open={modal} path={shareLink} handleClose={() => setModal(false)} />
    </div>
  );
};

export default AgentRequirements;
