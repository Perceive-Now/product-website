import { useContext } from "react";
import { Link } from "react-router-dom";
import ArrowLeftIcon from "../../../components/icons/common/arrow-left";
import { UploadAttachmentsContext } from "./upload-attachments-context";

const BackButton = () => {
  return (
    <>
      <ArrowLeftIcon /> Back
    </>
  );
};

const buttonStyle = "flex flex-row gap-x-1 font-bold text-secondary-800 w-fit";

export default function GoBack() {
  const {
    currentPageId,
    setCurrentPageId,
    setCurrentStep,
    currentQuestionId,
    setCurrentQuestionId,
    additionalQuestionIds,
  } = useContext(UploadAttachmentsContext);

  if (currentPageId === 0) {
    // if in upload section page
    return (
      <Link to="/product" className={buttonStyle}>
        <BackButton />
      </Link>
    );
  }

  if (currentPageId !== 3) {
    // if not in additional questions page
    return (
      <button
        onClick={() => {
          setCurrentPageId(currentPageId - 1);
          setCurrentStep((prev) => prev - 1);
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
      setCurrentPageId(currentPageId - 1);
      setCurrentStep((prev) => prev - 1);
      return;
    }

    setCurrentQuestionId((prev) => prev - 1);
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <button onClick={handlBackBtnClickInAdditionalQuestions} className={buttonStyle}>
      <BackButton />
    </button>
  );
}
