import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "../../../components/icons/common/arrow-left";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  decrementStep,
  EQuickPromptPages,
  setCurrentPageId,
} from "../../../stores/upload-quick-prompt";

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

  const { currentPageId } = useAppSelector((state) => state.uploadQuickPrompt);

  // return (
  //   <Link to="/interaction-method" className={buttonStyle}>
  //     <BackButton />
  //   </Link>
  // );

  if (currentPageId === EQuickPromptPages.GoToReport) {
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
    navigate("/interaction-method");
  };

  return (
    <button onClick={handleBackBtnInQuickPromptsPage} className={buttonStyle}>
      <BackButton />
    </button>
  );
}
