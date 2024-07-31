import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { useEffect, useState } from "react";
import { ColDef } from "ag-grid-community";
import { CustomCellRendererProps } from "ag-grid-react";
import Tippy from "@tippyjs/react";
import "tippy.js/themes/light.css";
import VerticalEllipsis from "../../../components/icons/common/vertical-ellipsis";
import DropdownDownloadIcon from "./dropdown-download-icon";
import DropdownDeleteIcon from "./dropdown-delete-icon";
import ReportSummaryPopup from "./report-summary-popup";
import DownloadModal from "./download-modal"; // Import the new DownloadModal component
import Modal from "../../../components/reusable/modal";
import AgGrid from "../../../components/reusable/ag-grid/ag-grid";
import Title from "src/components/reusable/title/title";
import {
  getReportsByUserId,
  IReport,
  resetGetReportsByUserIdState,
  setCurrentReport,
  deleteReportById,
  setSearchTerm,
  setDateRange,
  setUseCaseFilter,
} from "../../../stores/genrated-reports";
import jsCookie from "js-cookie";
import toast from "react-hot-toast";
import GoBack from "./go-back-report-listing/go-back-report-listing";
import SearchFilter from "./searchFilter";
import { UseCaseOptions } from "../../../components/@report/use-case/__use-cases";

interface IRow {
  reportId: string;
  reportName: string;
  dateCreated: Date;
  edit: string;
}

const DropDownContent = ({ cellRendereProps }: { cellRendereProps: CustomCellRendererProps }) => {
  const dispatch = useAppDispatch();
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const handleDelete = () => {
    const reportId = cellRendereProps.data.report_id;
    dispatch(deleteReportById({ reportId }))
      .unwrap()
      .then(() => {
        toast.success("Report deleted successfully");
      })
      .catch((error) => {
        toast.error(error.message || "Failed to delete report");
      });
  };

  const handleDownload = () => {
    setSelectedReport(cellRendereProps.data);
    setIsDownloadModalOpen(true);
  };

  return (
    <div className="text-black space-y-1">
      <button onClick={handleDelete} className="flex flex-row gap-x-2 justify-between w-full">
        <p> Delete </p>
        <DropdownDeleteIcon />
      </button>
      <button onClick={handleDownload} className="flex flex-row gap-x-2 justify-between w-full">
        <p> Download </p>
        <DropdownDownloadIcon />
      </button>
      {selectedReport && (
        <DownloadModal
          isOpen={isDownloadModalOpen}
          handleClose={() => setIsDownloadModalOpen(false)}
          reportId={selectedReport.report_id}
          requirementGatheringId={selectedReport.requirement_gathering_id}
          userCaseId={selectedReport.user_case_id}
        />
      )}
    </div>
  );
};

function EditCellRenderer(props: CustomCellRendererProps) {
  return (
    <Tippy
      content={<DropDownContent cellRendereProps={props} />}
      allowHTML={true}
      arrow={false}
      appendTo={document.body}
      interactive={true}
      placement="left-start"
      theme="light"
    >
      <div className="w-fit h-full flex justify-center items-center">
        <VerticalEllipsis className="w-3 h-3" />
      </div>
    </Tippy>
  );
}

const colDefs: ColDef<IReport & { edit: string }>[] = [
  { field: "requirement_gathering_id", hide: true },
  { field: "user_id", hide: true },
  { field: "user_case_id", hide: true },
  {
    field: "title",
    headerCheckboxSelection: true,
    checkboxSelection: true,
    showDisabledCheckboxes: true,
    minWidth: 500,
    flex: 1,
  },
  {
    field: "date_created",
    headerName: "Date Created",
    valueFormatter: ({ value }) => (value ? new Date(value).toLocaleDateString() : ""),
    width: 300,
  },
  { field: "edit", cellRenderer: EditCellRenderer, width: 100 },
];

// Define the type predicate function
function isValidUseCase(option: any): option is { id: number; label: string } {
  return option !== undefined && typeof option.id === "number" && typeof option.label === "string";
}

export default function GeneratedReports() {
  const dispatch = useAppDispatch();
  const { reports, getReportsByUserIdState, filters } = useAppSelector(
    (state) => state.generatedReports,
  );
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<any>(null);

  useEffect(() => {
    if (getReportsByUserIdState.isError) {
      toast.error(getReportsByUserIdState.message);
      dispatch(resetGetReportsByUserIdState());
    }

    if (getReportsByUserIdState.isSuccess) {
      dispatch(resetGetReportsByUserIdState());
    }
  }, [getReportsByUserIdState, dispatch]);

  useEffect(() => {
    dispatch(getReportsByUserId({ userId: jsCookie.get("user_id") ?? "0" }));
  }, [dispatch]);

  const handleRowClick = (event: any) => {
    setIsOpenDialog(true);
    setCurrentEvent(event.data);
    dispatch(setCurrentReport(event.data));
    console.log("event", currentEvent);
  };

  const handleDateRangeChange = (range: { from: Date | null; to: Date | null }) => {
    dispatch(setDateRange(range));
  };

  const handleUseCaseChange = (selectedUseCases: number[]) => {
    dispatch(setUseCaseFilter(selectedUseCases));
  };

  // Extract unique use cases from the reports
  const uniqueUseCases = reports
    .map((report) => Number(report.user_case_id)) // Convert user_case_id to number
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((useCaseId) => {
      const option = UseCaseOptions.find((option) => option.useCaseId === useCaseId); // Use useCaseId here
      return option ? { id: option.useCaseId, label: option.label } : undefined;
    })
    .filter(isValidUseCase); // Use the type predicate here

  const filteredReports = reports
    .filter((report) => {
      const reportDate = new Date(report.date || report.date_created);
      const { from, to } = filters.dateRange;
      if (from && to) {
        return reportDate >= from && reportDate <= to;
      }
      return true;
    })
    .filter((report) => {
      if (filters.useCases.length === 0) {
        return true;
      }
      return filters.useCases.includes(Number(report.user_case_id)); // Convert user_case_id to number
    })
    .filter((report) => report.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((report) => {
      return {
        ...report,
        edit: "Edit",
        date_created: report.date ? new Date(report.date) : report.date_created, // Ensure the date is a Date object
      };
    });

  const isLoading = getReportsByUserIdState.isLoading;

  return (
    <>
      <Modal open={isOpenDialog} handleOnClose={() => setIsOpenDialog(false)}>
        <ReportSummaryPopup
          handleViewFullReportCallback={() => console.log("what")}
          setIsOpenDialog={setIsOpenDialog}
        />
      </Modal>
      <div className="w-full h-[400px] max-h-[450px] ">
        <GoBack />
        <Title text="Reports" className="mt-3 mb-3" />
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onFilterClick={() => {
            /*should put a logic here*/
          }}
          onDateRangeChange={handleDateRangeChange}
          onUseCaseChange={handleUseCaseChange}
          useCases={uniqueUseCases} // Pass the unique use cases here
        />
        <AgGrid<IReport & { edit: string }>
          rowData={filteredReports}
          colDefs={colDefs}
          onRowClicked={handleRowClick}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
