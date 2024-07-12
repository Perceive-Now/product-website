import React, { useCallback, useState } from "react";
import classNames from "classnames";

//
import { NewQAList } from "src/pages/product/report-q&a/_new-question";
import Button from "src/components/reusable/button";

//
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
  const [error, setError] = useState<string | null>(null); // State for error message

  const QA = NewQAList.filter((q) => q.questionId === questionId);

  const validateInputs = (inputs: UserInputs) => {
    for (const section of QA) {
      const placeholders = section.answer.match(/\[(.*?)\]/g);
      if (placeholders) {
        for (const placeholder of placeholders) {
          const key = placeholder.substring(1, placeholder.length - 1);
          if (!inputs[key]) {
            return "Please fill in all the answers.";
          }
        }
      }
    }
    return null;
  };

  const handleInputChange = (placeholder: string, value: string) => {
    const updatedInputs = { ...userInputs, [placeholder]: value };
    setUserInputs(updatedInputs);

    // Validate inputs on each change
    const errorMessage = validateInputs(updatedInputs);
    setError(errorMessage);
  };

  // const handleInputChange = (placeholder: string, value: string) => {
  //   setUserInputs((prevInputs) => ({
  //     ...prevInputs,
  //     [placeholder]: value,
  //   }));
  //   // Clear error message if the input is filled
  //   if (value.trim() !== '') {
  //     setError(null);
  //   }
  // };

  const handleContinue = useCallback(() => {
    let hasError = false;

    QA.forEach((section) => {
      const placeholders = section.answer.match(/\[(.*?)\]/g);
      if (placeholders) {
        placeholders.forEach((placeholder) => {
          const key = placeholder.substring(1, placeholder.length - 1);
          if (!userInputs[key]) {
            hasError = true;
          }
        });
      }
    });

    if (hasError) {
      setError("Please fill in all the answers.");
      return;
    }

    setError(null);

    let combinedText = "";
    QA.forEach((section) => {
      combinedText += section.answer.replace(/\[(.*?)\]/g, (match, placeholder) => {
        return `[${userInputs[placeholder]}]`;
        // || `[${placeholder}]`;
      });
    });

    onContinue({ answer: combinedText });

    // if (!isLoading) {
    //   setResetInputs(true);
    //   setUserInputs({});
    // }
    // setResetInputs(false);
  }, [QA, onContinue, userInputs]);

  return (
    <>
      <div className="flex flex-col w-full justify-between ">
        <div className="h-[px]">
          {QA.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="space-y-[6px] font-semibold text-secondary-800 text-sm mt-2.5 border py-1 px-2 rounded-md bg-appGray-100 min-h-[180px]"
            >
              {section.answer.split(/(\[[^\]]+\])/g).map((part, index) => {
                if (part.startsWith("[") && part.endsWith("]")) {
                  const placeholder = part.substring(1, part.length - 1);
                  const inputWidth = Math.max(placeholder.length * 7.5, 60); // Minimum width of 32px

                  return (
                    <input
                      className={classNames(
                        "focus:outline-none bg-transparent inline overflow-x-auto text-gray-500 shrink-0 placeholder:text-gray-500 border-b border-secondary-800 max-w-[780px]",
                      )}
                      key={index}
                      placeholder={placeholder}
                      style={{ minWidth: inputWidth }}
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
          {error && <div className="text-danger-500 text-xs pt-1">{error}</div>}
        </div>
      </div>
      <div className="bottom-0 left-0 right-0 absolute w-full bg-white pb-2">
        {hasSkippedQuestion ? (
          <div>Answer all the skipped questions to continue.</div>
        ) : (
          <div className="pt-2 mt-1 border-t flex gap-2 items-center">
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
    </>
  );
};

export default DiagnosticPlatform;
