import { useMemo, useState, useEffect } from "react";

import ReactTable from "../../../components/reusable/ReactTable";
import { ColumnDef ,createColumnHelper} from "@tanstack/react-table";
import {VerticalThreeDots} from "src/components/icons";
import ShareModal from "src/components/reusable/share-modal";
import Tooltip from "src/components/reusable/popover";
import jsCookie from "js-cookie";

//
import EditIcon from "../../../components/icons/miscs/Edit";
import { Link } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
//
import CheckboxInput from "../../../components/reusable/check-box/checkbox";
import TableSearch from "../../../components/reusable/table-search";
import TableDropdown from "../../../components/reusable/table-dropdown";
import Button from "src/components/reusable/button";
import TrashIcon from "src/components/icons/common/trash";
import { ShareIcon } from "src/components/icons";
import DownloadIcon from "src/components/icons/common/download-icon";
/**
 *
 */
const Reports = () => {
    const userId = jsCookie.get("user_id");
  
  const [reports, setreports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState(false);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const selectedRows = Object.keys(rowSelection).filter((rowId) => rowSelection[rowId]);
  console.log("sledct---------",selectedRows);

const filteredReports = reports.length > 0 
  ? reports.filter((report:any) =>
      report.report_name.toLowerCase().includes(searchQuery.toLowerCase())
    ) 
  : [];


  interface IOptions {
    label: string;
    icon: JSX.Element;
    action: () => void;
  }

  const menuItems = [
    {
      label: "Pin",
      icon: <EditIcon className="h-2 w-2" />,
      action: () => console.log("yo"),
    },
    {
      label: "Delete",
      icon: <EditIcon className="h-2 w-2" />,
      action: () => console.log("yo"),
    },
    {
      label: "Share",
      icon: <EditIcon className="h-2 w-2" />,
      action: () => console.log("yo"),
    },
  ];

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await fetch(`https://templateuserrequirements.azurewebsites.net/history/${userId}`, {
          method: 'GET',
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
console.log("data=------------",data);
        setreports(data.reports);  
      } catch (err) {
        console.error(err); 
      } finally {
        // setLoading(false); 
      }
    };

    fetchHistoryData();
  }, []);  

  const handleRowSelectionChange = (selection:any) => {
    setRowSelection(selection);
  };

  const handleBulkDelete = () => {
    const updatedReports = filteredReports.filter((_, index) => !selectedRows.includes(index.toString()));
    setreports(updatedReports);
    setRowSelection({});
  };


  const onShare = () => {
    setModal(true);
  };

  const handleDownload = () => {
    selectedRows.forEach((selectedIndex:any) => {
      const selectedReport :any= reports[selectedIndex];
      
      if (selectedReport && selectedReport.file_data && selectedReport.file_data.file1) {
        const fileUrl = selectedReport.file_data.file1;
  
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = fileUrl.split('/').pop(); 
        link.click();
      }
    });
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
        cell: ({ row }) => <span>.{row.original.file_data.file1.slice(-3).toLowerCase()}</span>,
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
        cell: () => <RowActions />,
      }),
    ],
    [],
  );

  const RowActions = () => {
    return (
      <Tooltip
        isCustomPanel={true}
        trigger={<VerticalThreeDots data-dropdown-toggle="dropdown" className="cursor-pointer" />}
        panelClassName="rounded-lg py-2 px-3 text-gray-700 min-w-[200px]"
      >
        <ul id="dropdown">
          <li className="mb-2 cursor-pointer">
            <div>View Report</div>
          </li>
          <li className="mb-2 cursor-pointer">
            <div>Downlaod</div>
          </li>
          <li className="cursor-pointer">
            <div>Delete Report</div>
          </li>
        </ul>
      </Tooltip>
    );
  };


  return (
    <div className="space-y-[20px] h-[calc(100vh-120px)] w-full z-10 p-1">
      <div className="">
        <h6 className="text-lg font-semibold ml-0">Settings &gt; Report management</h6>
        <div className="flex justify-start items-center pt-3">
          <Link to="/profile">
            <p className="mr-4 text-secondary-800 flex items-center">
              <ArrowLeftIcon className="mr-1" />
              Back
            </p>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-1 justify-end ">
        <p className="font-bold text-base">
          All Reports<span className="ml-3">{reports.length}</span>
        </p>
        <div className="ml-auto">
          <Link to="/quick-reports">
            <Button type="primary">+ Quick Report</Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-1 w-full">
        <div className="w-[300px]">
          <TableSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        {selectedRows.length > 0 && 
        <div className="ml-auto flex gap-3">
            {/* <Button type="gray" handleClick={onShare}>
              <div className="flex items-center gap-1">
                <ShareIcon />
                Share
              </div>
            </Button> */}
            <Button type="gray" handleClick={handleDownload}>
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
       }
      </div>
      <ReactTable 
      columnsData={columns} 
      rowsData={filteredReports} 
      size="medium" 
      noTopBorder 
      rowSelection={rowSelection}  // Passing rowSelection to ReactTable
      onRowSelectionChange={handleRowSelectionChange} 
     />
    
    <ShareModal open={modal} path={'/report'} handleClose={() => setModal(false)} />
    
    </div>
    
  );
};

export default Reports;
