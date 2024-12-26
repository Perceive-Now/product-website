import { useMemo, useState, useEffect } from "react";

import ReactTable from "../../../components/reusable/ReactTable";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
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
import { useNavigate } from "react-router-dom";
/**
 *
 */
const MyProjects = () => {
  const navigate = useNavigate();
  const userId = jsCookie.get("user_id");

  const [reports, setreports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState(false);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [shareLink, setShareLink] = useState("");
  const selectedRows = Object.keys(rowSelection).filter((rowId) => rowSelection[rowId]);
  console.log("sledct---------", selectedRows);

  const filteredReports =
    reports.length > 0
      ? reports.filter((report: any) =>
          report.project_name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [];

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await fetch(
          `https://templateuserrequirements.azurewebsites.net/projects/${userId}`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
          },
        );

        if (response.ok) {
          const data = await response.json();
          console.log("data=------------", data);
          setreports(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

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

  const deleteReportHandler = async (projectid: string, index: number) => {
    try {
      const response = await fetch(
        `https://templateuserrequirements.azurewebsites.net/project/${userId}/${projectid}/`,
        {
          method: "DELETE",
          headers: { Accept: "application/json" },
        },
      );
  
      if (response.ok) {
        setreports((prevReports) => prevReports.filter((_, i) => i !== index));
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
    deleteReportHandler: (reportId: string ,index: number) => void;
    openFileHandler: (fileUrl: string) => void;
  }) => {
   

    const handleDelete = (event: React.MouseEvent) => {
      event.preventDefault(); 
      event.stopPropagation(); 

      const { project_id } = row.original;
      deleteReportHandler(project_id,row.index); 
    };

    const handleShareReport = () => {
      setShareLink(row.original.file_data.file1);
      setModal(true);
    };

    const handleDownload = () => {
      openFileHandler(row.original.file_data.file1);
    };

    return (
      <Tooltip
        isCustomPanel={true}
        trigger={<VerticalThreeDots data-dropdown-toggle="dropdown" className="cursor-pointer" />}
        panelClassName="rounded-lg py-2 px-3 text-gray-700 min-w-[200px]"
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
          <div className="pl-1 pt-1"
          onClick={(e) => e.stopPropagation()} 
          >
            <CheckboxInput
              className="border-white"
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          </div>
        ),
      },
      {
        header: "Project",
        accessorKey: "report_name",
        // minSize: 400,
        cell: (item) => <p className="line-clamp-1">{item.row.original.project_name}</p>,
      },
      {
        header: "Date Modified",
        accessorKey: "date_modified",
        // minSize: 200,
        cell: (item) => <span>18 Dec 2024</span>,
      },
      columnHelper.display({
        id: "actions",
        minSize: 100,
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

  const getRowProps = (row: any) => ({
    onClick: () => {
      const project_id = row.original.project_id;
      navigate(`/my-reports/${project_id}`);
    },
    style: {
      cursor: "pointer",
    },
  });


  return (
    <div className="space-y-[20px]  w-full z-10">
      <div className="p-1 pl-0">
        <h6 className="text-lg font-semibold ml-0">Report management</h6>
        <div className="flex justify-start items-center pt-3 pl-1">
          <Link to="/">
            <p className="mr-4 text-secondary-800 flex items-center">
              <ArrowLeftIcon className="mr-1" />
              Back
            </p>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-1 justify-end ">
        <p className="font-bold text-base">
          Total Projects<span className="ml-3">{reports.length}</span>
        </p>
        <div className="ml-auto">
          <Link to="/quick-reports">
            <Button type="primary">+ Add Project</Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-1 w-full">
        <div className="w-[300px]">
          <TableSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
            <Button type="gray" classname="flex items-center gap-1" handleClick={handleBulkDelete}>
              <div className="flex items-center gap-2">
                <TrashIcon />
                Delete
              </div>
            </Button>
          </div>
        )}
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <LoadingIcon fontSize={40} className="animate-spin text-primary-900" />
        </div>
      ) : (
        <ReactTable
          columnsData={columns}
          rowsData={filteredReports}
          size="medium"
          noTopBorder
          rowSelection={rowSelection} 
          onRowSelectionChange={handleRowSelectionChange}
          getRowProps={getRowProps} // Add getRowProps to the Table component
        />
      )}

      <ShareModal open={modal} path={shareLink} handleClose={() => setModal(false)} />
    </div>
  );
};

export default MyProjects;
