import React, { useCallback, useState } from "react";
import classNames from "classnames";
import { NewQAList } from "src/pages/product/report-q&a/_new-question";
import Button from "src/components/reusable/button";
import { IAnswer } from "src/@types/entities/IPLandscape";

interface UserInputs {
  [key: string]: string;
}

interface Props {
  hasSkippedQuestion?: boolean;
  showSkip: boolean;
  onSkip: () => void;
  questionId: number;
  onContinue: ({ answer }: IAnswer) => void;
  isLoading: boolean;
}

/**
 *
 */
const DiagnosticPlatform = ({
  hasSkippedQuestion,
  showSkip,
  onSkip,
  questionId,
  onContinue,
  isLoading,
}: Props) => {
  const [userInputs, setUserInputs] = useState<UserInputs>({});
  const [resetInputs, setResetInputs] = useState(false);

  const QA = NewQAList.filter((q) => q.questionId === questionId);

  const handleInputChange = (placeholder: string, value: string) => {
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [placeholder]: value,
    }));
  };

  const handleContinue = useCallback(() => {
    let combinedText = "";
    QA.forEach((section) => {
      combinedText += section.answer.replace(/\[(.*?)\]/g, (match, placeholder) => {
        return userInputs[placeholder] || placeholder;
      });
    });
    setResetInputs(true); // Trigger re-render to reset input fields
    onContinue({ answer: combinedText });
    setUserInputs({});

    setResetInputs(false);
  }, [QA, onContinue, userInputs]);

  return (
    <div>
      {QA.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className="space-y-[6px] font-semibold text-secondary-800 text-sm mt-2.5 border p-1 rounded-md bg-appGray-100 min-h-[160px]"
        >
          {section.answer.split(/(\[[^\]]+\])/g).map((part, index) => {
            if (part.startsWith("[") && part.endsWith("]")) {
              const placeholder = part.substring(1, part.length - 1);
              const inputWidth = Math.max(placeholder.length * 8, 60); // Minimum width of 32px

              return (
                <input
                  className={classNames(
                    "focus:outline-none bg-transparent inline overflow-x-auto text-gray-500 shrink-0 placeholder:text-gray-500 border-b border-secondary-800",
                  )}
                  key={index}
                  placeholder={placeholder}
                  style={{ width: inputWidth }}
                  value={resetInputs ? "" : userInputs[placeholder] || ""}
                  onChange={(e) => handleInputChange(placeholder, e.target.value)}
                />
              );
            } else {
              // Handle line breaks
              const textParts = part.split("\n");
              return (
                <React.Fragment key={index}>
                  {textParts.map((text, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <br />}
                      <span className="inline" dangerouslySetInnerHTML={{ __html: text }} />
                    </React.Fragment>
                  ))}
                </React.Fragment>
              );
            }
          })}
        </div>
      ))}
      {hasSkippedQuestion ? (
        <div>Answer all the skipped questions to continue.</div>
      ) : (
        <div className="mt-4 pb-4 flex gap-2 items-center">
          {showSkip && (
            <Button htmlType={"button"} type="secondary" rounded={"medium"} handleClick={onSkip}>
              Skip for now
            </Button>
          )}
          <Button loading={isLoading} handleClick={handleContinue} rounded={"medium"}>
            Save & Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default DiagnosticPlatform;
