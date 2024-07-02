import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "../../../components/icons/common/arrow-left";
import { useAppDispatch } from "../../../hooks/redux";
import { decrementStep } from "../../../stores/upload-quick-prompt";

const BackButtonUI = () => {
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

  const handleBackBtnInQuickPromptsPage = () => {
    dispatch(decrementStep());
    navigate("/interaction-method");
  };

  return (
    <button onClick={handleBackBtnInQuickPromptsPage} className={buttonStyle}>
      <BackButtonUI />
    </button>
  );
}
