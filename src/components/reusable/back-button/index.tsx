import ArrowLeftIcon from "../../../components/icons/common/arrow-left";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const buttonStyle = "flex flex-row gap-x-1 font-bold text-secondary-800 w-fit";

interface Props {
  path?: string;
}

const BackButton = ({ path }: Props) => {
  const navigate = useNavigate();

  const onBack = useCallback(() => {
    if (path) navigate(`/${path}`);
    else navigate(-1);
  }, [navigate, path]);

  return (
    <button onClick={onBack} className={buttonStyle}>
      <ArrowLeftIcon /> Back
    </button>
  );
};

export default BackButton;
