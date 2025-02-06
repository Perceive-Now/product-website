import { useState } from "react";
import ReactTable from "../../../components/reusable/ReactTable";
import Pagination from "src/components/reusable/pagination";
import { LoadingIcon } from "src/components/icons";
import { Link, useNavigate } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
import TableSearch from "../../../components/reusable/table-search";
import ShareModal from "src/components/reusable/share-modal";

const AgentReports = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [reports] = useState([
    {
      project_name: "Thread 1",
      date_modified: "2021-10-10",
    },
    {
      project_name: "Thread 2",
      date_modified: "2021-10-10",
    },
    {
      project_name: "Thread 3",
      date_modified: "2021-10-10",
    },
    {
      project_name: "Thread 4",
      date_modified: "2021-10-10",
    },
    {
      project_name: "Thread 5",
      date_modified: "2021-10-10",
    },
    {
      project_name: "Thread 6",
      date_modified: "2021-10-10",
    },
    {
      project_name: "Thread 7",
      date_modified: "2021-10-10",
    },
    {
      project_name: "Thread 8",
      date_modified: "2021-10-10",
    },
  ]); // Placeholder for reports
  const [loading] = useState(false); // Placeholder for loading
  const [modal, setModal] = useState(false);
  const [pagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  const filteredReports = reports; // Placeholder for filtered reports

  const columns = [
    {
      header: "Thread",
      accessorKey: "report_name",
      cell: (item: any) => (
        <p className="line-clamp-1" onClick={() => navigate("/agent-reports/1")}>
          {item.row.original.project_name}
        </p>
      ),
    },
    {
      header: "Date Modified",
      accessorKey: "date_modified",
      cell: (item: any) => <span>{item.row.original.date_modified}</span>, // Placeholder for date format
    },
    {
      header: "Add Report",
      // accessorKey: "actions",
      cell: (item: any) => (
        <div className="flex items-center gap-1">
          <button
            className="bg-primary-900 px-1 rounded-md text-white"
            onClick={() => {
              navigate("/upload-agent-report")
            }}
          >
            +
          </button>
        </div>
      ),
    }
  ];

  return (
    <div className="space-y-[20px] h-[calc(100vh-120px)] w-full z-10">
      <div className="p-1 pl-0">
        <h6 className="text-lg font-semibold ml-0">Settings &gt; Admin Agent Report management</h6>
        <div className="flex justify-start items-center pt-3 pl-1">
          <Link to="/agent-admin">
            <p className="mr-4 text-secondary-800 flex items-center">
              <ArrowLeftIcon className="mr-1" />
              Back
            </p>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-1 justify-between ">
        <div className="font-bold text-base">
          Total Projects<span className="ml-3">{reports.length}</span>
        </div>
        <div className="w-[300px]">
          <TableSearch
            searchQuery={searchQuery}
            setSearchQuery={(search: string) => setSearchQuery(search)}
          />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <LoadingIcon fontSize={40} className="animate-spin text-primary-900" />
        </div>
      ) : (
        <>
          <ReactTable columnsData={columns} rowsData={filteredReports} size="medium" noTopBorder />
          <div className="flex items-center justify-end mb-10">
            <Pagination
              page={pagination.pageIndex + 1}
              total={Math.ceil(reports.length / pagination.pageSize)}
              onChange={() => {
                console.log("Pagination clicked");
              }}
            />
          </div>
        </>
      )}
      <ShareModal open={modal} path="" handleClose={() => setModal(false)} />
    </div>
  );
};

export default AgentReports;
