import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "../../../components/icons/common/arrow-left";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  decrementStep,
  setCurrentPageId,
  setCurrentParagraphId,
} from "../../../stores/upload-quick-prompt";
import { quickPromptContent } from "./quick-prompt-content";
import toast from "react-hot-toast";
import { EQuickPromptPages } from "./quick-prompt-pages-list";

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
  const navigate = useNavigate();

  const { currentPageId, currentParagraphId } = useAppSelector((state) => state.uploadQuickPrompt);

  // return (
  //   <Link to="/interaction-method" className={buttonStyle}>
  //     <BackButton />
  //   </Link>
  // );

  if (currentPageId === EQuickPromptPages.AllSet) {
    // if in all set page
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

  const handleBackBtnInQuickPromptsPage = () => {
    const indexOfCurrentParagraphId = quickPromptContent.findIndex(
      (content) => content.id === currentParagraphId,
    );

    if (indexOfCurrentParagraphId < 0) {
      toast.error("Something went wrong");
    } // error

    if (indexOfCurrentParagraphId === 0) {
      navigate("/interaction-method");
      return;
    }

    const previousParagraphId = quickPromptContent[indexOfCurrentParagraphId - 1].id;

    dispatch(setCurrentParagraphId(previousParagraphId));
    dispatch(decrementStep());
  };

  return (
    <button onClick={handleBackBtnInQuickPromptsPage} className={buttonStyle}>
      <BackButton />
    </button>
  );
}
