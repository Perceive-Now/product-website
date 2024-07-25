import { Link } from "react-router-dom";
import ArrowLeftIcon from "../../../components/icons/common/arrow-left";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  decrementStep,
  setCurrentPageId,
  setCurrentQuestionId,
  EUploadAttachmentsPages,
} from "../../../stores/upload-attachments";
import uploadAttachmentsPages from "./upload-attachment-pages-list";
import ToolTip from "src/components/reusable/tool-tip";
import Title from "src/components/reusable/title/title";

const BackButton = ({ currentPageTitle }: { currentPageTitle: string }) => {
  return (
    <div className="flex items-center gap-0.5 text-sm">
      <ToolTip title="Back" placement="top">
        <ArrowLeftIcon className="h-2.5 w-2.5" />
      </ToolTip>
      <Title text={currentPageTitle} className="" />
    </div>
  );
};

const buttonStyle = "flex flex-row gap-x-1 font-bold text-secondary-800 w-fit";

export default function GoBack({ currentPageTitle }: { currentPageTitle: string }) {
  const dispatch = useAppDispatch();

  const { currentPageId, additionalQuestionIds, currentQuestionId } = useAppSelector(
    (state) => state.uploadAttachments,
  );

  if (currentPageId === EUploadAttachmentsPages.UploadAttachments) {
    return (
      <Link to="/interaction-method" className={buttonStyle}>
        <BackButton currentPageTitle={currentPageTitle} />
      </Link>
    );
  }

  if (currentPageId !== EUploadAttachmentsPages.AdditionalQuestions) {
    return (
      <button
        onClick={() => {
          const currentPageIdIndex = uploadAttachmentsPages.findIndex(
            (page) => page.id === currentPageId,
          );
          const previousPageId = uploadAttachmentsPages[currentPageIdIndex - 1].id;
          dispatch(setCurrentPageId(previousPageId));
          dispatch(decrementStep());
        }}
        className={buttonStyle}
      >
        <BackButton currentPageTitle={currentPageTitle} />
      </button>
    );
  }

  const handlBackBtnClickInAdditionalQuestions = () => {
    if (additionalQuestionIds.length === 0) return;

    if (currentQuestionId === additionalQuestionIds[0].question_id) {
      // if it is the first question
      dispatch(setCurrentPageId(EUploadAttachmentsPages.GoToReport));
      dispatch(decrementStep());
      return;
    }

    // find previous question id
    const currentQuestionIdIndex = additionalQuestionIds.findIndex(
      (questionIdObj) => questionIdObj.question_id === currentQuestionId,
    );
    const previousQuestionId = additionalQuestionIds[currentQuestionIdIndex - 1].question_id;

    dispatch(setCurrentQuestionId(previousQuestionId));
    dispatch(decrementStep());
  };

  return (
    <button onClick={handlBackBtnClickInAdditionalQuestions} className={buttonStyle}>
      <BackButton currentPageTitle={currentPageTitle} />
    </button>
  );
}
