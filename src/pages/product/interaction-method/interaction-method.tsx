import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/reusable/button";
import classNames from "classnames";
import {
  DetailedQAAIcon,
  QuickPromptIcon,
  UploadAttachementsIcon,
} from "../../../components/icons";
import BackButton from "../../../components/reusable/back-button";
import { useAppSelector } from "src/hooks/redux";

const validUseCasesForQuickPrompts: string[] = ["1"];

const interactionMethods = [
  {
    lightIcon: <DetailedQAAIcon />,
    darkIcon: <DetailedQAAIcon type="dark" />,
    title: "Detailed Q&A",
    description: "Provide detailed information through our guided Q&A.",
    path: "/q&a",
  },
  {
    lightIcon: <UploadAttachementsIcon />,
    darkIcon: <UploadAttachementsIcon type="dark" />,
    title: "Upload attachments",
    description: "Upload documents to get detailed analyses.",
    path: "/upload-attachments",
  },
  {
    lightIcon: <QuickPromptIcon />,
    darkIcon: <QuickPromptIcon type="dark" />,
    title: "Quick prompt",
    description: "Get fast insights with a quick prompt submission.",
    path: "/quick-prompt",
  },
];

export default function InteractionMethod() {
  const navigate = useNavigate();

  const { useCaseIds } = useAppSelector((state) => state.usecases);

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
      <BackButton path="new-report" />
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-5xl font-extrabold text-secondary-900 mt-5">
          Please select interaction method
        </h1>
        <div className="flex flex-row gap-x-[20px]">
          {interactionMethods
            .filter((method) => {
              return (
                (method.title === "Quick prompt" &&
                  useCaseIds.some((id) => validUseCasesForQuickPrompts.includes(id))) ||
                method.title !== "Quick prompt"
              );
            })
            .map((method) => (
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
          <p className="text-secondary-800">Continue</p>
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
