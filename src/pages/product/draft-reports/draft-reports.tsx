import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { type IDraft } from "src/stores/draft";
import { setUploadAttachmentsStateFromDraft } from "src/stores/upload-attachments";
import { setQuickPromtsStateFromDraft } from "src/stores/upload-quick-prompt";
import { setUseCaseStateFromDraft } from "src/stores/use-case";
import AgGrid from "./ag-grid";
import { useState } from "react";
import { ColDef } from "ag-grid-community";
import { CustomCellRendererProps } from "ag-grid-react";
import Tippy from "@tippyjs/react";
import "tippy.js/themes/light.css";

interface IRow {
  reportId: string;
  reportName: string;
  dateCreated: Date;
  edit: string;
}

const dropDownContent = (
  <div className="text-black">
    <div>Create New Row</div>
    <div>Edit Row</div>
    <div>Delete Row</div>
  </div>
);

function EditCellRenderer(props: CustomCellRendererProps) {
  return (
    <Tippy
      content={dropDownContent}
      allowHTML={true}
      arrow={false}
      appendTo={document.body}
      interactive={true}
      placement="left-start"
      theme="light"
    >
      <button className="btn btn-primary">Action</button>
    </Tippy>
  );
}

export default function DraftReports() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { draftsArray } = useAppSelector((state) => state.draft);

  // Row Data: The data to be displayed.
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

  // Column Definitions: Defines & controls grid columns.
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
    { field: "dateCreated" },
    { field: "edit", cellRenderer: EditCellRenderer, cellStyle: { overflow: "visible" } },
  ]);

  const handleDraftItemClick = (draft: IDraft) => {
    // update slices with the selected draft
    dispatch(setUseCaseStateFromDraft(draft.other_data.useCasesSliceState));
    dispatch(setQuickPromtsStateFromDraft(draft.other_data.uploadQuickPromptsSliceState));
    dispatch(setUploadAttachmentsStateFromDraft(draft.other_data.uploadAttachmentsSliceState));
    // todo add use case information

    // navigate to the relevent page
    navigate(`/${draft.current_page}`);
  };

  return (
    <div className="w-full h-[400px] max-h-[450px] ">
      <AgGrid<IRow> rowData={rowData} colDefs={colDefs} />
    </div>
  );
  //
  // if (draftsArray.length === 0) {
  //   return <div>No drafts available</div>;
  // }
  //
  // return (
  //   <ul>
  //     {draftsArray.map((draft) => {
  //       return (
  //         <li key={draft.requirement_gathering_id} onClick={() => handleDraftItemClick(draft)}>
  //           {draft.requirement_gathering_id}
  //         </li>
  //       );
  //     })}
  //   </ul>
  // );
}
