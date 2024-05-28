import React from "react";
import ArrowLeftIcon from "../../../../components/icons/common/arrow-left";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../../components/reusable/button";
import DetailedQAAIcon from "./detailed-qaa";
import classNames from "classnames";
import UploadAttachementsIcon from "./upload-attachements";

const interactionMethods = [
  {
    lightIcon: <DetailedQAAIcon />,
    darkIcon: <DetailedQAAIcon type="dark" />,
    title: "Detailed Q&A",
    description: "Provide detailed information through our guided Q&A.",
    path: "/product/interaction-method/q-and-a",
  },
  {
    lightIcon: <UploadAttachementsIcon />,
    darkIcon: <UploadAttachementsIcon type="dark" />,
    title: "Upload attachments",
    description: "Upload documents to get detailed analyses.",
    path: "/upload-attachments",
  },
  {
    lightIcon: <DetailedQAAIcon />,
    darkIcon: <DetailedQAAIcon type="dark" />,
    title: "Quick prompt",
    description: "Get fast insights with a quick prompt submission.",
    path: "/product/interaction-method/quick-prompt",
  },
];

export default function InteractionMethod() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = React.useState<string>("");

  const handleSelectMethod = (method: string) => {
    setSelectedMethod(method);
  };

  const handleContinueBtnClick = () => {
    if (!selectedMethod) return;
    const path = interactionMethods.find((method) => method.title === selectedMethod)?.path || "";
    navigate(path);
  };

  return (
    <div>
      <Link
        to="/product"
        className="flex flex-row gap-x-1 font-bold text-secondary-800 w-fit bg-red-400"
      >
        <ArrowLeftIcon /> Back
      </Link>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-5xl font-extrabold text-primary-800 mt-5">
          Please select interaction method
        </h1>
        <div className="flex flex-row gap-x-[20px]">
          {interactionMethods.map((method) => (
            <InteractionMethodCard
              key={method.title}
              lightIcon={method.lightIcon}
              darkIcon={method.darkIcon}
              title={method.title}
              description={method.description}
              selectedMethod={selectedMethod}
              onClickHandler={handleSelectMethod}
            />
          ))}
        </div>
        <Button type="optional" handleClick={handleContinueBtnClick}>
          <p className="text-secondary-800 bg-red-400">Continue</p>
        </Button>
      </div>
    </div>
  );
}

interface IInteractionMethodCardProps {
  lightIcon: React.ReactElement;
  darkIcon: React.ReactElement;
  title: string;
  description: string;
  selectedMethod: string;
  onClickHandler: (method: string) => void;
}

const InteractionMethodCard = ({
  lightIcon,
  darkIcon,
  title,
  description,
  selectedMethod,
  onClickHandler,
}: IInteractionMethodCardProps) => {
  return (
    <div
      onClick={() => onClickHandler(title)}
      className={classNames(
        "w-[220px] h-[200px] flex flex-col justify-between py-[20px] items-center text-center cursor-pointer border-primary-900 border-[1px] rounded-lg",
        {
          "bg-primary-900": selectedMethod === title,
        },
      )}
    >
      {selectedMethod === title ? darkIcon : lightIcon}

      <div className="space-y-[10px]">
        <p
          className={classNames(
            {
              "text-white": selectedMethod === title,
              "text-primary-900": selectedMethod !== title,
            },
            "line-clamp-1 font-semibold text-base uppercase",
          )}
        >
          {title}
        </p>
        <p
          className={classNames(
            {
              "text-white": selectedMethod === title,
              "text-primary-900": selectedMethod !== title,
            },
            "line-clamp-2 font-semibold text-sm",
          )}
        >
          {description}
        </p>
      </div>
    </div>
  );
};
