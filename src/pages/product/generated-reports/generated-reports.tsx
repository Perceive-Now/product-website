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
import DropdownShareIcon from "./dropdown-share-icon";
import ReportSummaryPopup from "./report-summary-popup";
import Modal from "../../../components/reusable/modal";
import AgGrid from "../../../components/reusable/ag-grid/ag-grid";
import Title from "src/components/reusable/title/title";
import {
  getReportsByUserId,
  IReport,
  resetGetReportsByUserIdState,
} from "../../../stores/genrated-reports";
import jsCookie from "js-cookie";
import toast from "react-hot-toast";
import GoBack from "./go-back-report-listing/go-back-report-listing";
import SearchFilter from "./searchFilter";

interface IRow {
  reportId: string;
  reportName: string;
  dateCreated: Date;
  edit: string;
}

const DropDownContent = ({ cellRendereProps }: { cellRendereProps: CustomCellRendererProps }) => {
  const handleDelete = () => {
    console.log("delete", cellRendereProps.data.reportId);
  };

  const handleShare = () => {
    console.log("share", cellRendereProps.data.reportId);
  };

  const handleDownload = () => {
    console.log("download", cellRendereProps.data.reportId);
  };

  return (
    <div className="text-black space-y-1">
      <button onClick={handleDelete} className="flex flex-row gap-x-2 justify-between w-full">
        <p> Delete </p>
        <DropdownDeleteIcon />
      </button>
      <button onClick={handleShare} className="flex flex-row gap-x-2 justify-between w-full">
        <p> Share </p>
        <DropdownShareIcon />
      </button>
      <button onClick={handleDownload} className="flex flex-row gap-x-2 justify-between w-full">
        <p> Download </p>
        <DropdownDownloadIcon />
      </button>
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
  { field: "date_created", width: 300 },
  { field: "edit", cellRenderer: EditCellRenderer, width: 100 },
];

export default function GeneratedReports() {
  const dispatch = useAppDispatch();
  const { reports, getReportsByUserIdState } = useAppSelector((state) => state.generatedReports);
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
  }, []);

  const handleRowClick = (event: any) => {
    setIsOpenDialog(true);
    setCurrentEvent(event.data);
  };

  const transformedReports = reports
    .filter((report) => report.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((report) => {
      return {
        ...report,
        edit: "Edit",
      };
    });

  const isLoading = getReportsByUserIdState.isLoading;

  return (
    <>
      <Modal open={isOpenDialog} handleOnClose={() => setIsOpenDialog(false)}>
        <ReportSummaryPopup
          handleViewFullReportCallback={() => console.log("what")}
          setIsOpenDialog={setIsOpenDialog}
          event={currentEvent}
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
        />
        <AgGrid<IReport & { edit: string }>
          rowData={transformedReports}
          colDefs={colDefs}
          onRowClicked={handleRowClick}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
