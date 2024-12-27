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
// import JSZip from "jszip";
import { useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
/**
 *
 */
const Reports = () => {
  const navigate = useNavigate();
  const userId = jsCookie.get("user_id");
  const { id } = useParams();
  const [reports, setreports] = useState([]);
  const [totalReports, setTotalReports] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState(false);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [shareLink, setShareLink] = useState("");
  const selectedRows = Object.keys(rowSelection).filter((rowId) => rowSelection[rowId]);

  const filteredReports =
    reports.length > 0
      ? reports.filter((report: any) =>
          report.report_name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [];

      const fetchHistoryData = async () => {
        try {
          const response = await fetch(
            `https://templateuserrequirements.azurewebsites.net/reports/${userId}/${id}`,
            {
              method: "GET",
              headers: { Accept: "application/json" },
            },
          );
  
          if (response.ok) {
            const data = await response.json();
            setTotalReports(data.total_reports);
            setreports(data.reports);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

  useEffect(() => {
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

  // const handleBulkDownload = () => {
  //   const zip = new JSZip();

  //   selectedRows.forEach((selectedIndex: any, index: number) => {
  //     const selectedReport: any = reports[selectedIndex];

  //     if (selectedReport && selectedReport.file_data && selectedReport.file_data.file1) {
  //       const file = selectedReport.file_data.file1;

  //       const fileName = file.name || file.split("/").pop();
  //       zip.file(fileName, file);
  //     }
  //   });

  //   zip.generateAsync({ type: "blob" }).then((content) => {
  //     const link = document.createElement("a");
  //     link.href = URL.createObjectURL(content);
  //     link.download = "reports.zip";
  //     link.click();
  //   });
  // };


  const deleteReportHandler = async (projectid: string, index: number) => {
    try {
      const response = await fetch(
        `https://templateuserrequirements.azurewebsites.net/report/delete?user_id=${userId}&project_id=${id}&report_id=${projectid}`,
        {
          method: "DELETE",
          headers: { Accept: "application/json" },
        },
      );
  
      if (response.ok) {
        // setreports((prevReports) => prevReports.filter((_, i) => i !== index));
        fetchHistoryData();
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
    deleteReportHandler: (reportId: string,index: number) => void;
    openFileHandler: (fileUrl: string) => void;
  }) => {
    const handleDelete = () => {
      const { report_id } = row.original;
      deleteReportHandler(report_id,row.index);
    };

    const handleShareReport = () => {
      setShareLink(row.original.report_url);
      setModal(true);
    };

    const handleDownload = () => {
      openFileHandler(row.original.report_url);
    };

    return (
      <Tooltip
        isCustomPanel={true}
        right="100px"
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
          <div className="pl-1 pt-1">
            <CheckboxInput
              className="border-white"
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          </div>
        ),
      },
      {
        header: "Report",
        accessorKey: "report_name",
        // minSize: 400,
        cell: (item) => <p className="line-clamp-1">{item.row.original.report_name}</p>,
      },
      {
        header: "Type",
        accessorKey: "type",
        // minSize: 200,
        cell: (item) => <p className="line-clamp-1">{item.row.original.report_type}</p>,
      },
      {
        header: "Status",
        accessorKey: "status",
        // minSize: 200,
        cell: (item) => <span>{item.row.original.report_complete_status ? 'Completed' : 'Pending'}</span>,
      },
      {
        header: "Size",
        accessorKey: "size",
        cell: (item) => {
          const reportSizeStr = item.row.original.report_size;
          const bytes = parseInt(reportSizeStr.replace(' bytes', ''), 10); 
          const mb = bytes / 1024 / 1024; 
          return <span>{mb.toFixed(2)} MB</span>;
        },
      },
      // {
      //   header: "Permission",
      //   accessorKey: "permission",
      //   // minSize: 200,
      //   cell: (item) => <span>{item.row.original.permission}</span>,
      // },
      // {
      //   header: "Date Modified",
      //   accessorKey: "date_modified",
      //   minSize: 200,
      //   cell: (item) => <span>18 Dec 2024</span>,
      // },
      // {
      //   header: " ",
      //   // accessorKey: "lead_investigator_given",
      //   minSize: 80,
      //   cell: (item) => (
      //     // <button type="button">
      //     //   <EditIcon />
      //     // </button>
      //     <TableDropdown
      //     // menuItems={menuItems}
      //     // width="xs"
      //     // alignment="right"
      //     // conversation_id={item.row.original.id}
      //     />
      //   ),
      // },
      columnHelper.display({
        id: "actions",
        // minSize: 100,
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

  return (
    <div className="space-y-[20px] w-full z-10">
      <div className="p-1 pl-0">
        <h6 className="text-lg font-semibold ml-0">Report management 
          {/* &gt; Project Name */}
          </h6>
        <div className="flex justify-start items-center pt-3 pl-1">
          <Link to="/my-projects">
            <p className="mr-4 text-secondary-800 flex items-center">
              <ArrowLeftIcon className="mr-1" />
              Back
            </p>
          </Link>
        </div>
      </div>
      <Tab.Group>
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
           onClick={() => {
            navigate(`/quick-reports/${id}`);
          }}
            className={({ selected }) =>
              `w-full text-base px-2 rounded-tr-md rounded-br-md focus:outline-none font-nunito border-r border-t border-b border-appGray-600 ${
                selected ? "text-white bg-primary-900" : "text-black"
              }`
            }
          >
            Requirements
          </Tab>
        </Tab.List>
        <div className="flex items-center gap-1">
          <p className="font-bold text-base">
            Total Reports<span className="ml-3">{totalReports}</span>
          </p>
          {/* <div className="ml-auto">
            <Link to={`/quick-reports/${id}`}>
              <Button type="primary">+ Add Resources</Button>
            </Link>
          </div> */}
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
              <Button
                type="gray"
                classname="flex items-center gap-1"
                handleClick={handleBulkDelete}
              >
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
          <Tab.Panels>
            <Tab.Panel>
              <ReactTable
                columnsData={columns}
                rowsData={filteredReports}
                size="medium"
                noTopBorder
                rowSelection={rowSelection}
                onRowSelectionChange={handleRowSelectionChange}
              />
            </Tab.Panel>
          </Tab.Panels>
        )}
      </Tab.Group>

      <ShareModal open={modal} path={shareLink} handleClose={() => setModal(false)} />
    </div>
  );
};

export default Reports;
