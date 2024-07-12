import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { useEffect } from "react";
import { ColDef } from "ag-grid-community";
import { CustomCellRendererProps } from "ag-grid-react";
import Tippy from "@tippyjs/react";
import "tippy.js/themes/light.css";
import VerticalEllipsis from "../../../components/icons/common/vertical-ellipsis";
import DropdownDeleteIcon from "../generated-reports/dropdown-delete-icon";
import DropdownShareIcon from "../generated-reports/dropdown-share-icon";
import AgGrid from "../../../components/reusable/ag-grid/ag-grid";
import { getDraftsByUserId, resetGetDraftsByUserIdState, IDraft } from "../../../stores/draft";
import jsCookie from "js-cookie";
import toast from "react-hot-toast";

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

  const handleContinue = () => {
    console.log("share", cellRendereProps.data.reportId);
  };

  return (
    <div className="text-black space-y-1">
      <button onClick={handleDelete} className="flex flex-row gap-x-2 justify-between w-full">
        <p> Delete </p>
        <DropdownDeleteIcon />
      </button>
      <button onClick={handleContinue} className="flex flex-row gap-x-2 justify-between w-full">
        <p> Share </p>
        <DropdownShareIcon />
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

const colDefs: ColDef<IRow>[] = [
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
];

export default function DraftReports() {
  const dispatch = useAppDispatch();
  const { draftsArray = [], getDraftsByUserIdState } = useAppSelector((state) => state.draft); // Default value for draftsArray

  useEffect(() => {
    if (getDraftsByUserIdState.isError) {
      toast.error(getDraftsByUserIdState.message);
      dispatch(resetGetDraftsByUserIdState());
    }

    if (getDraftsByUserIdState.isSuccess) {
      dispatch(resetGetDraftsByUserIdState());
    }
  }, [getDraftsByUserIdState, dispatch]);

  useEffect(() => {
    dispatch(getDraftsByUserId({ userId: jsCookie.get("user_id") ?? "0" }));
  }, [dispatch]);

  useEffect(() => {
    console.log("Drafts Array:", draftsArray); // Log draftsArray to verify data
  }, [draftsArray]);

  const rowData: IRow[] = draftsArray.map((draft: IDraft) => {
    return {
      reportId: draft.requirement_gathering_id,
      reportName: `Draft Report - ${draft.requirement_gathering_id}`,
      dateCreated: new Date(),
      edit: "edit",
    };
  });

  const isLoading = getDraftsByUserIdState.isLoading;

  return (
    <div className="w-full h-[400px] max-h-[450px]">
      <AgGrid<IRow> rowData={rowData} colDefs={colDefs} isLoading={isLoading} />
    </div>
  );
}
