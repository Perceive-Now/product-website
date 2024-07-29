import React, { useCallback, useState, useRef, useEffect } from "react";
import classNames from "classnames";

//
import Button from "src/components/reusable/button";

//
import { IAnswer } from "src/@types/entities/IPLandscape";

//
import ErrorBoundary from "src/utils/error-handling";

//
import "./madlib.css";
interface UserInputs {
  [key: string]: string;
}

type IType = "continue" | "edit";

interface Props {
  hasSkippedQuestion?: boolean;
  showSkip: boolean;
  onSkip: () => void;
  onContinue: ({ answer }: IAnswer) => void;
  isLoading: boolean;
  answer: string;
  setUpdatedAnswer: (answer: string) => void;
  setResetForm: (reset: boolean) => void;
  resetForm: boolean;
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
  setUpdatedAnswer,
  resetForm,
  setResetForm,
}: Props) => {
  const [hasInput, setHasInput] = useState(false);
  const [userInputs, setUserInputs] = useState<UserInputs>({});

  const [resetInputs, setResetInputs] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resetInputs) {
      setUserInputs({});
      setResetInputs(false);
    }
  }, [resetInputs]);

  //
  const handleInputChange = (placeholder: string, value: string) => {
    const updatedInputs = { ...userInputs, [placeholder]: value };
    setUserInputs(updatedInputs);

    // Validate inputs on each change
    // const errorMessage = validateInputs(updatedInputs);
    // setError(errorMessage);
  };

  //

  const handleContentChange = useCallback(() => {
    if (contentRef.current) {
      const updatedText = contentRef.current.innerHTML.trim();
      if (updatedText.length <= 0) {
        setHasInput(false);
        setError("Please provide an answer");
        if (answer.length <= 1) {
          setUpdatedAnswer("");
        }
      } else {
        setHasInput(true);
        setError(null);
      }
    }
  }, [answer, setUpdatedAnswer]);

  //
  const handleContinue = useCallback(
    (type: IType) => {
      if (contentRef.current) {
        const content = contentRef.current?.innerHTML.trim();
        if (content.length <= 0) {
          setError("Please provide an answer");
        }
        let combinedText = content.replace(
          /<input[^>]*placeholder="([^"]*)"[^>]*value="([^"]*)"[^>]*>/g,
          (match, placeholder, value) => {
            return `[${value || placeholder}]`;
          },
        );

        // Clean up any remaining HTML tags, if needed
        combinedText = combinedText.replace(/<\/?[^>]+>/g, "");

        if (type === "continue") {
          if (error === null) {
            onContinue({ answer: combinedText });
            if (isLoading) {
              setResetInputs(true);
            }
          }
        }
      }
    },
    [error, isLoading, onContinue],
  );

  const createEditableContentHTML = (text: string) => {
    const content = text ? text : " ";
    return content?.split(/(\[[^\]]+\])/g).map((part, index) => {
      if (part?.startsWith("[") && part.endsWith("]")) {
        const placeholder = part?.substring(1, part?.length - 1);
        const inputWidth = Math.max(placeholder?.length);

        return (
          <input
            key={`${placeholder}-${index}`}
            className="focus:outline-none bg-transparent inline overflow-x-auto text-secondary-800 shrink-0 border-appGray-400 placeholder:text-gray-500/60 border-b max-w-[700px] 2xl:max-w-[920px]"
            placeholder={placeholder}
            style={{ minWidth: inputWidth, whiteSpace: "normal", wordBreak: "break-all" }}
            value={resetInputs ? "" : userInputs[placeholder] || ""}
            onChange={(e) => handleInputChange(placeholder, e.target.value)}
          />
        );
      } else {
        const textParts = part?.split("\n");
        return (
          <span key={index}>
            {(textParts || [])?.map((text, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <br />}
                <span className="inline" dangerouslySetInnerHTML={{ __html: text || "" }} />
              </React.Fragment>
            ))}
          </span>
        );
      }
    });
  };

  useEffect(() => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="flex flex-col w-full justify-between">
        <div className="relative h-auto">
          <ErrorBoundary fallback={<div>Something went wrong. Please try again later.</div>}>
            {error && <div className="text-red-500 text-xs mt-1 mb-0.5">{error}</div>}
            {answer.length <= 0 && !hasInput && (
              <div className="absolute top-4.5 z-10 px-2.5  text-sm text-appGray-400">
                Please provide your answer here.
              </div>
            )}
            <div
              // contentEditable
              suppressContentEditableWarning
              ref={contentRef}
              onInput={handleContentChange}
              placeholder="Please provide your answer here."
              className={classNames(
                error ? "border-red-500" : "border-appGray-400 mt-2.5",
                "space-y-[2px] font-semibold text-secondary-800 text-sm border py-1 px-2 rounded-md bg-appGray-100 min-h-[180px] relative focus:outline-none content-editable",
              )}
            >
              {createEditableContentHTML(answer)}
            </div>
          </ErrorBoundary>
        </div>
      </div>
      <div className="bottom-0 left-0 right-0 absolute w-full bg-white pb-2 pt-2 mt-1 border-t">
        {hasSkippedQuestion ? <div>Please answer all the skipped questions.</div> : <></>}
        <div className="flex gap-2 items-center">
          {showSkip && !hasSkippedQuestion && (
            <Button
              htmlType={"button"}
              type="secondary"
              rounded={"medium"}
              handleClick={onSkip}
              disabled={isLoading}
            >
              Skip for now
            </Button>
          )}
          <Button
            loading={isLoading}
            handleClick={() => handleContinue("continue")}
            rounded={"medium"}
            disabled={error !== null || !answer || isLoading}
          >
            Save & Continue
          </Button>
        </div>
      </div>
    </>
  );
};

export default DiagnosticPlatform;
