import { useState } from "react";
import ReactTable from "../../../components/reusable/ReactTable";
import { Tab } from "@headlessui/react";
import { Link } from "react-router-dom";
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

const AgentRequirements = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const reports: Report[] = [
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
    {
      report_name: "Report 2",
      report_type: "Type 2",
      date_modified: "2021-10-10",
      report_complete_status: false,
      report_size: "1024 bytes",
      question: ["Question 1", "Question 2"],
      file_data: {
        file1: "file1.pdf",
        file2: "file2.pdf",
      },
      usecase: "Primary Objective 2",
    },
    {
      report_name: "Report 3",
      report_type: "Type 3",
      date_modified: "2021-10-10",
      report_complete_status: true,
      report_size: "1024 bytes",
      question: ["Question 1", "Question 2"],
      file_data: {
        file1: "file1.pdf",
        file2: "file2.pdf",
      },
      usecase: "Primary Objective 3",
    },
    {
      report_name: "Report 4",
      report_type: "Type 4",
      date_modified: "2021-10-10",
      report_complete_status: false,
      report_size: "1024 bytes",
      question: ["Question 1", "Question 2"],
      file_data: {
        file1: "file1.pdf",
        file2: "file2.pdf",
      },
      usecase: "Primary Objective 4",
    },
    {
      report_name: "Report 5",
      report_type: "Type 5",
      date_modified: "2021-10-10",
      report_complete_status: true,
      report_size: "1024 bytes",
      question: ["Question 1", "Question 2"],
      file_data: {
        file1: "file1.pdf",
        file2: "file2.pdf",
      },
      usecase: "Primary Objective 5",
    },
  ];
  const [loading] = useState(false); // Placeholder for loading
  const [modal, setModal] = useState(false);
  const [shareLink] = useState(""); // Placeholder for share link
  const [selectedTabIndex, setSelectedTabIndex] = useState(0); // Default tab index

  const filteredReports = reports; // Placeholder for filtered reports

  const columns = [
    {
      header: "Report",
      accessorKey: "report_name",
      cell: (item: any) => <p className="line-clamp-1">{item.row.original.report_name}</p>,
    },
    {
      header: "Type",
      accessorKey: "type",
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
      accessorKey: "size",
      cell: (item: any) => {
        const bytes = parseInt(item.row.original.report_size.replace(" bytes", ""), 10);
        const mb = bytes / 1024 / 1024;
        return <span>{mb.toFixed(2)} MB</span>;
      },
    },
  ];

  return (
    <div className="space-y-[20px] w-full z-10">
      <div className="p-1 pl-0">
        <h6 className="text-lg font-semibold ml-0">
          Settings &gt; Admin Agent Report management &gt; Project Name
        </h6>
        <div className="flex justify-start items-center pt-3 pl-1">
          <Link to={`/agent-admin-reports/1`}>
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
              <div className="mt-5 w-full z-10">
                {reports.length > 0 && (
                  <div className="flex space-x-4">
                    <div className="w-full space-y-4">
                      <div className="w-full flex gap-15">
                        <label className="block text-lg font-semibold">
                          Report Name :{" "}
                          <span className="font-normal">{reports[0]?.report_name}</span>
                        </label>
                        <label className="block text-lg font-semibold">
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
                                      {report.date_modified}
                                    </span>
                                    {open ? <AddIcon /> : <AddIcon />}
                                  </Disclosure.Button>
                                  <Disclosure.Panel className="w-full mt-5 text-sm text-black transition-all duration-300 ease-in-out">
                                    {/* <div className="w-full mt-4">
                                      <label className="block text-base font-semibold">
                                        Questions:
                                      </label>
                                      <div className="ml-3 mt-1">
                                        {Array.isArray(report?.question) &&
                                        report?.question.length > 0
                                          ? report?.question.map((question, index) => (
                                              <div key={index}>
                                                {index + 1}. {question}
                                              </div>
                                            ))
                                          : "No questions available"}
                                      </div>
                                    </div>
                                    <div className="mt-2">
                                      <h6 className="font-semibold mb-1 text-base font-nunito flex items-center">
                                        Uploaded files
                                      </h6>
                                      {Object.keys(report?.file_data).length > 0 ? (
                                        <div className="pr-1">
                                          {Object.keys(report?.file_data).map((key, index) => {
                                            const fileUrl = report?.file_data[key];
                                            if (!fileUrl) return null;
                                            return (
                                              <div key={index}>
                                                <div>
                                                  <IconFile className="cursor-pointer h-[60px] w-[60px]" />
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
                                    </div> */}
                                    <div>
                                      <div className="w-full mt-4 underline text-lg">
                                        Conversation ID: {new Date().getTime()}
                                      </div>

                                      {/* use case, industry, agent name */}
                                      <div className="w-full mt-4">
                                        <ul>
                                          <li>Use Case: Health Care and Insurance</li>
                                          <li>Industry: HealthCare</li>
                                          <li>Agent Name: Startup dilligence</li>
                                        </ul>
                                      </div>

                                      {/* data sources  */}
                                      <div className="w-full mt-4">
                                        <label
                                          htmlFor="fullName"
                                          className="block text-base font-semibold"
                                        >
                                          Data Sources:
                                        </label>
                                        <div className="ml-3 mt-1">
                                          {["source1", "source2", "source3"].map(
                                            (source, index) => (
                                              <div key={index}>{source}</div>
                                            ),
                                          )}
                                        </div>
                                      </div>

                                      {/* report template  */}
                                      <div className="w-full mt-4">
                                        <label
                                          htmlFor="fullName"
                                          className="block text-base font-semibold"
                                        >
                                          Report Template:
                                        </label>
                                        <div className="ml-3 mt-1">
                                          {["Intro", "Body", "Conclusion"].map(
                                            (template, index) => (
                                              <div key={index}>{template}</div>
                                            ),
                                          )}
                                        </div>
                                      </div>
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

export default AgentRequirements;
