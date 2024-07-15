import React, { useCallback, useRef, useState } from "react";
import classNames from "classnames";

//
import { NewQAList } from "src/pages/product/report-q&a/_new-question";
import Button from "src/components/reusable/button";

//
import { IAnswer } from "src/@types/entities/IPLandscape";
// import EditIcon from "src/components/icons/miscs/Edit";
// import ToolTip from "src/components/reusable/tool-tip";
// import BreakableInput from "./breafable-input";

interface UserInputs {
  [key: string]: string;
}

type IType = "continue" | "edit";

interface Props {
  hasSkippedQuestion?: boolean;
  showSkip: boolean;
  onSkip: () => void;
  // questionId: number;
  onContinue: ({ answer }: IAnswer) => void;
  isLoading: boolean;
  answer: string;
  setHasContent: any;
  // React.Dispatch<React.SetStateAction<string>>;
}

/**
 *
 */
const DiagnosticPlatform = ({
  hasSkippedQuestion,
  showSkip,
  onSkip,
  onContinue,
  isLoading,
  answer,
  setHasContent,
}: Props) => {
  const [userInputs, setUserInputs] = useState<UserInputs>({});
  const [updatedAnswer, setUpdatedAnswer] = useState("");

  const [resetInputs, setResetInputs] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // const QA = NewQAList.filter((q) => q.questionId === questionId);

  // Input Validation
  // const validateInputs = (inputs: UserInputs) => {
  //   for (const section of QA) {
  //     const placeholders = section.answer.match(/\[(.*?)\]/g);
  //     if (placeholders) {
  //       for (const placeholder of placeholders) {
  //         const key = placeholder.substring(1, placeholder.length - 1);
  //         if (!inputs[key]) {
  //           return "Please fill in all the answers.";
  //         }
  //       }
  //     }
  //   }
  //   return null;
  // };

  const handleInputChange = (placeholder: string, value: string) => {
    const updatedInputs = { ...userInputs, [placeholder]: value };
    setUserInputs(updatedInputs);

    // Validate inputs on each change
    // const errorMessage = validateInputs(updatedInputs);
    // setError(errorMessage);
  };

  const handleContentChange = () => {
    if (contentRef.current) {
      const updatedText = contentRef.current.innerText;
      setUpdatedAnswer(updatedText);
      console.log(updatedText.length);

      if (updatedText.length - 1 <= 0) {
        setHasContent(false);
        setError("Please provide answer");
      } else {
        setError(null);
      }
    }
  };

  // OnContinue
  const handleContinue = useCallback(
    (type: IType) => {
      // let hasError = false;

      // QA.forEach((section) => {
      //   const placeholders = section.answer.match(/\[(.*?)\]/g);
      //   if (placeholders) {
      //     placeholders.forEach((placeholder) => {
      //       const key = placeholder.substring(1, placeholder.length - 1);
      //       if (!userInputs[key]) {
      //         hasError = true;
      //       }
      //     });
      //   }
      // });

      // if (hasError) {
      //   setError("Please fill in all the answers.");
      //   return;
      // }

      // setError(null);

      let combinedText = "";
      combinedText += answer?.replace(/\[(.*?)\]/g, (match, placeholder) => {
        return userInputs[placeholder] !== undefined ? `[${userInputs[placeholder]}]` : match;
      });

      const finalText = updatedAnswer + combinedText;

      if (type === "continue") {
        onContinue({ answer: finalText });
        if (isLoading) {
          setResetInputs(true);
          setUserInputs({});
        }
        setResetInputs(false);
      }

      // if (type === 'edit') {
      //   onEdit(combinedText);
      // }
    },
    [answer, isLoading, onContinue, updatedAnswer, userInputs],
  );

  return (
    <>
      <div className="flex flex-col w-full justify-between ">
        <div className="h-[px]">
          {error && <div className="text-red-500 text-xs mt-1 mb-0.5">{error}</div>}
          <div
            contentEditable
            ref={contentRef}
            onInput={handleContentChange}
            placeholder="Please provide your answer here."
            className={classNames(
              error ? "border-red-500" : "border-appGray-400 mt-2.5",
              "space-y-[px] font-semibold text-secondary-800 text-sm border py-1 px-2 rounded-md bg-appGray-100 min-h-[180px] relative focus:outline-none",
            )}
          >
            {answer?.split(/(\[[^\]]+\])/g).map((part, index) => {
              if (part.startsWith("[") && part.endsWith("]")) {
                const placeholder = part.substring(1, part.length - 1);
                const inputWidth = Math.max(placeholder.length);

                return (
                  <input
                    className={classNames(
                      // error ? "border-red-500" : "border-appGray-400 ",
                      "focus:outline-none bg-transparent inline overflow-x-auto text-secondary-800 shrink-0 border-appGray-400 placeholder:text-gray-500/60 border-b max-w-[600px] 2xl:max-w-[920px]",
                    )}
                    key={index}
                    placeholder={placeholder}
                    style={{ minWidth: inputWidth, whiteSpace: "normal", wordBreak: "break-all" }}
                    value={resetInputs ? "" : userInputs[placeholder] || ""}
                    onChange={(e) => handleInputChange(placeholder, e.target.value)}
                  />
                );
              } else {
                // Handle line breaks
                const textParts = part.split("\n");
                return (
                  <span key={index} contentEditable>
                    {textParts.map((text, idx) => (
                      <span key={idx}>
                        {idx > 0 && <br />}
                        <span className="inline" dangerouslySetInnerHTML={{ __html: text }} />
                      </span>
                    ))}
                  </span>
                );
              }
            })}
          </div>
          {/* ))} */}
        </div>
      </div>
      <div className="bottom-0 left-0 right-0 absolute w-full bg-white pb-2 pt-2 mt-1 border-t">
        <div className=" flex gap-2 items-center">
          {hasSkippedQuestion ? (
            <div></div>
          ) : (
            <>
              {showSkip && (
                <Button
                  htmlType={"button"}
                  type="secondary"
                  rounded={"medium"}
                  handleClick={onSkip}
                >
                  Skip for now
                </Button>
              )}
            </>
          )}

          <Button
            loading={isLoading}
            handleClick={() => handleContinue("continue")}
            rounded={"medium"}
          >
            Save & Continue
          </Button>
        </div>
      </div>
    </>
  );
};

export default DiagnosticPlatform;

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
