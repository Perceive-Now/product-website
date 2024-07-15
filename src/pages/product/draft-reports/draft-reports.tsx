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
import { setCurrentPageId, questionWithUseCases, QAPages } from "src/stores/Q&A";
import jsCookie from "js-cookie";
import toast from "react-hot-toast";
import axiosInstance from "src/utils/axios";
import { AppConfig } from "src/config/app.config";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const BASE_PN_REPORT_URL = AppConfig.REPORT_API_URL;

interface IRow {
  reportId: string;
  reportName: string;
  dateCreated: Date;
  edit: string;
}

const DropDownContent = ({ cellRendereProps }: { cellRendereProps: CustomCellRendererProps }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleDelete = () => {
    console.log("delete", cellRendereProps.data.reportId);
  };

  const handleContinue = async () => {
    const reportId = cellRendereProps.data.reportId;
    const userId = jsCookie.get("user_id");

    try {
      console.log(`Fetching draft for reportId: ${reportId}, userId: ${userId}`);

      const response = await axiosInstance.get(
        `${BASE_PN_REPORT_URL}/draft-by-ids/?requirement_gathering_id=${reportId}&user_id=${userId}`,
      );

      console.log("API response:", response);

      if (response.status === 200 && response.data.length > 0) {
        const draft = response.data[0]; // Assuming response.data is an array and we need the first item
        console.log("Draft data:", draft);

        // Log the other_data to understand its structure
        console.log("other_data:", draft.other_data);

        // Check if other_data is in the correct format
        if (draft.other_data && draft.other_data.questionsList && draft.other_data.currentPageId) {
          // Update the Q&A slice state with the data from other_data
          dispatch(questionWithUseCases(draft.other_data.questionsList));
          dispatch(setCurrentPageId(draft.other_data.currentPageId));

          // Navigate to the current_page from the draft
          navigate(draft.current_page);

          toast.success("Draft loaded successfully");
        } else {
          throw new Error("Invalid draft data");
        }
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Failed to load draft:", error);
      toast.error("Failed to load draft");
    }
  };

  return (
    <div className="text-black space-y-1">
      <button onClick={handleDelete} className="flex flex-row gap-x-2 justify-between w-full">
        <p> Delete </p>
        <DropdownDeleteIcon />
      </button>
      <button onClick={handleContinue} className="flex flex-row gap-x-2 justify-between w-full">
        <p> Continue </p>
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
