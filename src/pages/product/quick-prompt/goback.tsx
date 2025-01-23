import { useNavigate } from "react-router-dom";

//
import ArrowLeftIcon from "../../../components/icons/common/arrow-left";

//
import { useAppDispatch } from "../../../hooks/redux";
import { decrementStep } from "../../../stores/upload-quick-prompt";

import Title from "src/components/reusable/title/title";
import ToolTip from "src/components/reusable/tool-tip";

interface Props {
  currentPageTitle: string;
}

const BackButtonUI = ({ currentPageTitle }: { currentPageTitle: string }) => {
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

export default function GoBack({ currentPageTitle }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleBackBtnInQuickPromptsPage = () => {
    dispatch(decrementStep());
    navigate("/interaction-method");
  };

  return (
    <button onClick={handleBackBtnInQuickPromptsPage} className={buttonStyle}>
      <BackButtonUI currentPageTitle={currentPageTitle} />
    </button>
  );
}
