import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Title from "src/components/reusable/title/title";
import { ColDef } from "ag-grid-community";
import { CustomCellRendererProps } from "ag-grid-react";
import Tippy from "@tippyjs/react";
import "tippy.js/themes/light.css";
import VerticalEllipsis from "../../../components/icons/common/vertical-ellipsis";
import DropdownDeleteIcon from "../generated-reports/dropdown-delete-icon";
import DropdownContinueIcon from "../generated-reports/dropdown-continue-icon";
import AgGrid from "../../../components/reusable/ag-grid/ag-grid";
import { getDraftsByUserId, resetGetDraftsByUserIdState, IDraft } from "../../../stores/draft";
import {
  setCurrentPageId,
  questionWithUseCases,
  setSkippedQuestions,
  setCurrentQuestionId,
} from "src/stores/Q&A";
import {
  setCurrentPageId as setCurrentPageIdUpload,
  setCurrentQuestionId as setCurrentQuestionIdUpload,
  setAnswers,
  setRequirementPercentage,
  setRequirementSummary,
  setQuestionsList,
  setAddtionalQuestionIds,
} from "src/stores/upload-attachments";
import { setRequirementGatheringId } from "src/stores/use-case";
import jsCookie from "js-cookie";
import toast from "react-hot-toast";
import axiosInstance from "src/utils/axios";
import { AppConfig } from "src/config/app.config";
import { useNavigate } from "react-router-dom";
import GoBack from "../quick-prompt/goback";
import SearchFilter from "./searchFilter";
import { RootState } from "src/store";

const BASE_PN_REPORT_URL = AppConfig.REPORT_API_URL;

interface IRow {
  reportId: string;
  reportName: string;
  dateCreated: Date;
  edit: string;
}

interface IQuestionUsecase {
  questionId: number;
  useCaseId: number;
  question: string;
  usecase: string;
  answer: string;
  exampleAnswer: string;
}

const DropDownContent = ({ cellRendereProps }: { cellRendereProps: CustomCellRendererProps }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const reportId = cellRendereProps.data.reportId;
    const userId = jsCookie.get("user_id");

    try {
      const response = await axiosInstance.delete(
        `${BASE_PN_REPORT_URL}/draft/?requirement_gathering_id=${reportId}&user_id=${userId}`,
      );

      if (response.status === 200) {
        toast.success("Draft deleted successfully");
        // Reload drafts list
        dispatch(getDraftsByUserId({ userId: jsCookie.get("user_id") ?? "0" }));
      } else {
        throw new Error("Failed to delete draft");
      }
    } catch (error) {
      toast.error("Failed to delete draft");
    }
  };

  const handleContinue = async () => {
    const reportId = cellRendereProps.data.reportId;
    const userId = jsCookie.get("user_id");

    try {
      const response = await axiosInstance.get(
        `${BASE_PN_REPORT_URL}/draft-by-ids/?requirement_gathering_id=${reportId}&user_id=${userId}`,
      );

      if (response.status === 200 && response.data.length > 0) {
        const draft = response.data[0];

        // Check if other_data is in the correct format
        if (draft.other_data && draft.other_data.questionsList && draft.other_data.currentPageId) {
          // Update the Q&A slice state with the data from other_data
          dispatch(questionWithUseCases(draft.other_data.questionsList));
          dispatch(setQuestionsList(draft.other_data.questionsList));
          dispatch(setCurrentPageId(draft.other_data.currentPageId));
          dispatch(setCurrentPageIdUpload(draft.other_data.currentPageId));

          // Check and update skipped questions if they exist
          if (draft.other_data.skippedQuestionList) {
            dispatch(setSkippedQuestions(draft.other_data.skippedQuestionList));
          }

          // Find the last answered question
          const lastAnsweredQuestion = draft.other_data.questionsList
            .slice()
            .reverse()
            .find((question: IQuestionUsecase) => question.answer !== "");

          // Set the current question to the last answered question or the first non-skipped question
          const currentQuestionId = lastAnsweredQuestion
            ? lastAnsweredQuestion.questionId
            : draft.other_data.questionsList.find(
                (question: IQuestionUsecase) =>
                  !draft.other_data.skippedQuestionList.some(
                    (skipped: IQuestionUsecase) => skipped.questionId === question.questionId,
                  ),
              )?.questionId;

          if (currentQuestionId) {
            dispatch(setCurrentQuestionId(currentQuestionId));
          }

          // Update the requirementGatheringId in the usecases slice
          dispatch(setRequirementGatheringId(draft.requirement_gathering_id));
          if (draft.other_data.answers) {
            dispatch(setAnswers(draft.other_data.answers));
            dispatch(setCurrentQuestionIdUpload(draft.other_data.currentQuestionId));
          }
          if (draft.other_data.requirementPercentage) {
            dispatch(setRequirementPercentage(draft.other_data.requirementPercentage));
          }
          if (draft.other_data.requirementSummary) {
            dispatch(setRequirementSummary(draft.other_data.requirementSummary));
          }
          if (draft.other_data.additionalQuestionIds) {
            dispatch(setAddtionalQuestionIds(draft.other_data.additionalQuestionIds));
          }

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
        <p> Continue report </p>
        <DropdownContinueIcon />
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
    minWidth: 200,
    flex: 1,
  },
  { field: "dateCreated", width: 300 },
  { field: "edit", cellRenderer: EditCellRenderer, width: 100 },
];

export default function DraftReports() {
  const dispatch = useAppDispatch();
  const {
    draftsArray = [],
    getDraftsByUserIdState,
    filters,
  } = useAppSelector((state) => state.draft);
  const { searchTerm, dateRange } = filters;

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

  const filteredRowData: IRow[] = draftsArray
    .filter((draft: IDraft) => {
      const draftDate = new Date(draft.date);
      if (dateRange.from && dateRange.to) {
        return draftDate >= dateRange.from && draftDate <= dateRange.to;
      }
      return true;
    })
    .filter(
      (draft: IDraft) =>
        draft.requirement_gathering_id.toString().includes(searchTerm) ||
        `Draft Report - ${draft.requirement_gathering_id}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
    )
    .map((draft: IDraft) => {
      return {
        reportId: draft.requirement_gathering_id,
        reportName: `Draft Report - ${draft.requirement_gathering_id}`,
        dateCreated: new Date(draft.date),
        edit: "edit",
      };
    });

  const isLoading = getDraftsByUserIdState.isLoading;

  return (
    <>
      <div className="w-full h-[400px] max-h-[400px] ">
        <GoBack />
        <Title text="Drafts" className="mt-3 mb-3" />
        <SearchFilter />
        <AgGrid<IRow> rowData={filteredRowData} colDefs={colDefs} isLoading={isLoading} />
      </div>
    </>
  );
}
