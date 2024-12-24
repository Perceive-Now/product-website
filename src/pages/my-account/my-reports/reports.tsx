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
import { Tab } from '@headlessui/react';
/**
 *
 */
const Reports = () => {
  const userId = jsCookie.get("user_id");
  const { id } = useParams();
  const [reports, setreports] = useState([]);
  const [resources, setResources] = useState([]);
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

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await fetch(
          `https://templateuserrequirements.azurewebsites.net/history/${userId}`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
          },
        );

        if (response.ok) {
          const data = await response.json();
          const matchedResources = data.reports
          .filter((report:any) => report.thread_id === id)
          .map((report:any) => {
            return Object.entries(report.file_data).map(([key, fileUrl]) => ({
              thread_id: report.thread_id,
              report_name: report.report_name,
              file: fileUrl,
            }));
          })
          .flat(); 
        const matchedReports = data.reports
        .filter((report:any) => report.thread_id === id);

        setResources(matchedResources);
        setreports(matchedReports);
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
  
  
  const deleteReportHandler = (index: any) => {
    setreports((prevReports) => prevReports.filter((_, i) => i !== index));
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
    deleteReportHandler: (reportId: string) => void;
    openFileHandler: (fileUrl: string) => void;
  }) => {
    const handleDelete = () => {
      deleteReportHandler(row.index);
    };

    const handleShareReport = () => {
      setShareLink(row.original.file);
      setModal(true);
    };

    const handleDownload = () => {
      openFileHandler(row.original.file);
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
        // cell: ({ row }) => <span>.{row.original.file.slice(-3).toLowerCase()}</span>,
        cell: ({ row }) => <span>.pdf</span>,

      },
      // {
      //   header: "Size",
      //   accessorKey: "size",
      //   // minSize: 200,
      //   cell: (item) => <span>{item.row.original.size}</span>,
      // },
      // {
      //   header: "Permission",
      //   accessorKey: "permission",
      //   // minSize: 200,
      //   cell: (item) => <span>{item.row.original.permission}</span>,
      // },
      {
        header: "Date Modified",
        accessorKey: "date_modified",
        // minSize: 200,
        cell: (item) => <span>18 Dec 2024</span>,
      },
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

  const ResourcesColumns = useMemo<ColumnDef<any>[]>(
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
        cell: (item) => <p className="line-clamp-1">{item.row.original.report_completed_url}</p>,
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

  return (
    <div className="space-y-[20px] h-[calc(100vh-120px)] w-full z-10">
      <div className="p-1 pl-0">
        <h6 className="text-lg font-semibold ml-0">Project management &gt; Project Name</h6>
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
                selected
                  ? 'text-white bg-primary-900'
                  : 'text-black'
              }`
            }
          >
            Reports
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full text-base px-2 rounded-tr-md rounded-br-md focus:outline-none font-nunito border-r border-t border-b border-appGray-600 ${
                selected
                ? 'text-white bg-primary-900'
                : 'text-black'
              }`
            }
          >
            Requirements
          </Tab>
        </Tab.List>
      <div className="flex items-center gap-1 justify-end ">
        <p className="font-bold text-base">
          Total Reports<span className="ml-3">{reports.length}</span>
        </p>
        <div className="ml-auto">
          <Link to={`/quick-reports/${id}`}>
            <Button type="primary">+ Add Resources</Button>
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
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <LoadingIcon fontSize={40} className="animate-spin text-primary-900" />
        </div>
      ) : (
        <Tab.Panels>
          <Tab.Panel>
        <ReactTable
          columnsData={ResourcesColumns}
          rowsData={filteredReports}
          size="medium"
          noTopBorder
          rowSelection={rowSelection} 
          onRowSelectionChange={handleRowSelectionChange}
        />
        </Tab.Panel>
        <Tab.Panel>
        <ReactTable
          columnsData={columns}
          rowsData={resources}
          size="medium"
          noTopBorder
          rowSelection={rowSelection} 
          onRowSelectionChange={handleRowSelectionChange}
        />        </Tab.Panel>
        </Tab.Panels>
      )}
        </Tab.Group>

      <ShareModal open={modal} path={shareLink} handleClose={() => setModal(false)} />
    </div>
  );
};

export default Reports;
