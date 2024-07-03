import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { type IDraft } from "src/stores/draft";
import { setUploadAttachmentsStateFromDraft } from "src/stores/upload-attachments";
import { setQuickPromtsStateFromDraft } from "src/stores/upload-quick-prompt";
import { setUseCaseStateFromDraft } from "src/stores/use-case";
import { useState } from "react";
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

export default function GeneratedReports() {
  // const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  // const { draftsArray } = useAppSelector((state) => state.draft);

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<any>(null);

  const [rowData, setRowData] = useState<IRow[]>([
    {
      reportId: "1",
      reportName: "Sales Report",
      dateCreated: new Date("2023-06-15"),
      edit: "Edit",
    },
    {
      reportId: "2",
      reportName: "Financial Summary",
      dateCreated: new Date("2023-05-28"),
      edit: "Edit",
    },
    {
      reportId: "3",
      reportName: "Marketing Analysis",
      dateCreated: new Date("2023-06-02"),
      edit: "Edit",
    },
    {
      reportId: "4",
      reportName: "Product Development Update",
      dateCreated: new Date("2023-06-10"),
      edit: "Edit",
    },
    {
      reportId: "5",
      reportName: "Customer Satisfaction Survey",
      dateCreated: new Date("2023-05-20"),
      edit: "Edit",
    },
    {
      reportId: "6",
      reportName: "Quality Assurance Review",
      dateCreated: new Date("2023-06-08"),
      edit: "Edit",
    },
    {
      reportId: "7",
      reportName: "Employee Performance Evaluation",
      dateCreated: new Date("2023-05-25"),
      edit: "Edit",
    },
    {
      reportId: "8",
      reportName: "Supply Chain Analysis",
      dateCreated: new Date("2023-06-05"),
      edit: "Edit",
    },
  ]);

  const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
    { field: "reportId", hide: true },
    {
      field: "reportName",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
      minWidth: 500,
      flex: 1,
    },
    { field: "dateCreated", filter: "agDateColumnFilter" },
    { field: "edit", cellRenderer: EditCellRenderer, width: 100 },
  ]);

  const handleRowClick = (event: any) => {
    setIsOpenDialog(true);
    setCurrentEvent(event);

    // // update slices with the selected draft
    // dispatch(setUseCaseStateFromDraft(draft.other_data.useCasesSliceState));
    // dispatch(setQuickPromtsStateFromDraft(draft.other_data.uploadQuickPromptsSliceState));
    // dispatch(setUploadAttachmentsStateFromDraft(draft.other_data.uploadAttachmentsSliceState));
    // todo add use case information

    // navigate to the relevent page
    // navigate(`/${draft.current_page}`);
  };

  const isLoading = false;

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
        <AgGrid<IRow>
          rowData={rowData}
          colDefs={colDefs}
          onRowClicked={handleRowClick}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
