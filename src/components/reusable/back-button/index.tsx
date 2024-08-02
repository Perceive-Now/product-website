import ArrowLeftIcon from "../../../components/icons/common/arrow-left";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ToolTip from "../tool-tip";

interface Props {
  path?: string;
}

const BackButton = ({ path }: Props) => {
  const navigate = useNavigate();

  const onBack = useCallback(() => {
    if (path !== undefined) {
      navigate(`/${path}`);
    } else {
      navigate(-1);
    }
  }, [navigate, path]);

  return (
    <button onClick={onBack} className="flex items-center gap-0.5 text-sm font-bold">
      <ToolTip title="Back" placement="top">
        <ArrowLeftIcon className="h-2.5 w-2.5" />
      </ToolTip>
      Back
    </button>
  );
};

export default BackButton;
