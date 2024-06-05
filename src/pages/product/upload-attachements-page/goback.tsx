import { Link } from "react-router-dom";
import ArrowLeftIcon from "../../../components/icons/common/arrow-left";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  decrementStep,
  reset,
  setCurrentPageId,
  setCurrentQuestionId,
} from "../../../stores/upload-attachments";

const BackButton = () => {
  return (
    <>
      <ArrowLeftIcon /> Back
    </>
  );
};

const buttonStyle = "flex flex-row gap-x-1 font-bold text-secondary-800 w-fit";

export default function GoBack() {
  const dispatch = useAppDispatch();

  const { currentPageId, additionalQuestionIds, currentQuestionId } = useAppSelector(
    (state) => state.uploadAttachments,
  );

  if (currentPageId === 0) {
    // if in upload section page
    return (
      <Link to="/product" className={buttonStyle}>
        <BackButton />
      </Link>
    );
  }

  if (currentPageId === 2) {
    // if in need additional answers page
    return (
      <button
        onClick={() => {
          dispatch(setCurrentPageId(0));
          dispatch(decrementStep());
        }}
        className={buttonStyle}
      >
        <BackButton />
      </button>
    );
  }

  if (currentPageId === 4) {
    // if in all set page
    return (
      <button
        onClick={() => {
          dispatch(reset());
        }}
        className={buttonStyle}
      >
        <BackButton />
      </button>
    );
  }

  if (currentPageId !== 3) {
    // if not in additional questions page
    return (
      <button
        onClick={() => {
          dispatch(setCurrentPageId(currentPageId - 1));
          dispatch(decrementStep());
        }}
        className={buttonStyle}
      >
        <BackButton />
      </button>
    );
  }

  const handlBackBtnClickInAdditionalQuestions = () => {
    if (additionalQuestionIds.length === 0) return;

    if (currentQuestionId === additionalQuestionIds[0]) {
      // if it is the first question
      dispatch(setCurrentPageId(currentPageId - 1));
      dispatch(decrementStep());
      return;
    }

    dispatch(setCurrentQuestionId(currentQuestionId - 1));
    dispatch(decrementStep());
  };

  return (
    <button onClick={handlBackBtnClickInAdditionalQuestions} className={buttonStyle}>
      <BackButton />
    </button>
  );
}
