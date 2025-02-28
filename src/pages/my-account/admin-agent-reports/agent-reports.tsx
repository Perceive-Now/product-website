import { useEffect, useState } from "react";
import ReactTable from "../../../components/reusable/ReactTable";
import Pagination from "src/components/reusable/pagination";
import { LoadingIcon } from "src/components/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
import TableSearch from "../../../components/reusable/table-search";
import ShareModal from "src/components/reusable/share-modal";

const AgentReports = () => {
  const navigate = useNavigate();
  const { userid } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const [threads, setThreads] = useState<any[]>([]);
  const [loadingThreads, setLoadingThreads] = useState(true);
  const [modal, setModal] = useState(false);
  
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  const fetchThreads = async () => {
    try {
      const response = await fetch(
        `https://templateuserrequirements.azurewebsites.net/threads/${userid}`,
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
    fetchThreads();

    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, []);

  const filteredReports = threads.filter(
    (thread) =>
      thread.agent_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.thread_id?.toString().includes(searchQuery) ||
      thread.date_created?.includes(searchQuery) ||
      thread.date_modified?.includes(searchQuery),
  ).reverse();

  const paginatedReports = filteredReports.slice(
    pagination.pageIndex * pagination.pageSize,
    (pagination.pageIndex + 1) * pagination.pageSize
  );

  const columns = [
    {
      header: "Thread ID",
      accessorKey: "id",
      cell: (item: any) => (
        <p
          onClick={() =>
            navigate(`/agent-reports/${item.row.original.id}/${item.row.original.user_id}`)
          }
        >
          {item.row.original.id}
        </p>
      ),
    },
    {
      header: "Agent Name",
      accessorKey: "agent_name",
      cell: (item: any) => <span>{item.row.original.agent_name}</span>,
    },
    {
      header: "Date Created",
      accessorKey: "created_at",
      cell: (item: any) => (
        <span>{new Date(item.row.original.created_at).toLocaleDateString("en-US")}</span>
      ),
    },
    {
      header: "Date Modified",
      accessorKey: "updated_at",
      cell: (item: any) => (
        <span>
          {new Date(item.row.original.updated_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      ),
    },
    {
      header: "Add Report",
      cell: (item: any) => (
        <div className="flex items-center gap-1">
          <button
            className="bg-primary-900 px-1 rounded-md text-white"
            onClick={() => {
              navigate(
                `/agent-admin/upload-agent-report/${item.row.original.id}/${item.row.original.user_id}`,
              );
            }}
          >
            +
          </button>
        </div>
      ),
    },
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
          Total Threads<span className="ml-3">{filteredReports.length}</span>
        </div>
        <div className="w-[300px]">
          <TableSearch
            searchQuery={searchQuery}
            setSearchQuery={(search: string) => setSearchQuery(search)}
          />
        </div>
      </div>
      {loadingThreads ? (
        <div className="flex justify-center items-center">
          <LoadingIcon fontSize={40} className="animate-spin text-primary-900" />
        </div>
      ) : (
        <>
          <ReactTable columnsData={columns} rowsData={paginatedReports} size="medium" noTopBorder />
          <div className="flex items-center justify-end mb-10">
            <Pagination
              page={pagination.pageIndex + 1}
              total={Math.ceil(filteredReports.length / pagination.pageSize)}
              onChange={(page) => setPagination((prev) => ({ ...prev, pageIndex: page - 1 }))}
            />
          </div>
        </>
      )}
      <ShareModal open={modal} path="" handleClose={() => setModal(false)} />
    </div>
  );
};

export default AgentReports;
