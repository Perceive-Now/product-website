import React, { useCallback, useState, useRef, useEffect } from "react";
import classNames from "classnames";
import Button from "src/components/reusable/button";

import { IAnswer } from "src/@types/entities/IPLandscape";

import "./madlib.css";
import ErrorBoundary from "src/utils/error-handling";

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

  // const handleContentChange = () => {
  //   if (contentRef.current) {
  //     const updatedText = contentRef.current.innerText;
  //     // setUpdatedAnswer(updatedText)

  //     if (updatedText.trim().length <= 0) {
  //       // setUpdatedAnswer("")
  //       setError("Please provide answer");
  //     } else {
  //       setError(null);
  //     }
  //   }
  // };

  //

  const handleContentChange = useCallback(() => {
    if (contentRef.current) {
      const updatedText = contentRef.current.innerHTML.trim();
      if (updatedText.length <= 0) {
        // setUpdatedAnswer("");
        setHasInput(false);
        setError("Please provide an answer");
      } else {
        setHasInput(true);
        setError(null);
        // setUpdatedAnswer(updatedText);
      }
    }
  }, []);

  //
  const handleContinue = useCallback(
    (type: IType) => {
      const content = contentRef.current?.innerHTML || "";
      if (content.trim().length <= 0) {
        // setUpdatsedAnswer("")
        setError("Please provide an answer");
      }
      let combinedText = content.replace(
        /<input[^>]*placeholder="([^"]*)"[^>]*value="([^"]*)"[^>]*>/g,
        (match, placeholder, value) => {
          // console.log(placeholder, match, value)
          return `[${value || placeholder}]`;
        },
      );

      // Clean up any remaining HTML tags, if needed
      combinedText = combinedText.replace(/<\/?[^>]+>/g, "");

      if (type === "continue") {
        onContinue({ answer: combinedText });

        if (resetForm) {
          setResetForm(false);
          // setResetInputs(true);
        }
      }
    },
    [onContinue, resetForm, setResetForm],
  );

  //
  // const createEditableContentHTM = (text: string) => {
  //   return text.split(/(\[[^\]]+\])/g).map((part, idx) => {
  //     if (part.startsWith("[") && part.endsWith("]")) {
  //       const placeholder = part.substring(1, part.length - 1);
  //       const inputWidth = Math.max(placeholder.length, 20); // Adjusted minimum width
  //       return (
  //         <input
  //           key={idx}
  //           className="focus:outline-none bg-transparent inline overflow-x-auto text-secondary-800 shrink-0 border-appGray-400 placeholder:text-gray-500/60 border-b max-w-[600px] 2xl:max-w-[920px] placeholder"
  //           placeholder={placeholder}
  //           style={{ minWidth: `${inputWidth}px`, whiteSpace: "normal", wordBreak: "break-all" }}
  //           value={resetInputs ? "" : userInputs[placeholder] || ""}
  //           onChange={(e) => handleInputChange(placeholder, e.target.value)}
  //         />
  //       );

  //       // `<input
  //       //   class="focus:outline-none bg-transparent inline overflow-x-auto text-secondary-800 shrink-0 border-appGray-400 placeholder:text-gray-500/60 border-b max-w-[600px] 2xl:max-w-[920px] placeholder"
  //       //   placeholder="${placeholder}"
  //       //   style="min-width: ${inputWidth}px; white-space: normal; word-break: break-all;"
  //       //   value="${resetInputs ? "" : userInputs[placeholder] || ""}"
  //       //   onInput="handleInputChange('${placeholder}', this.value)"
  //       //   />`;

  //       //  onChange="${(e: { target: { value: string; }; }) => { return handleInputChange(placeholder, e.target.value) }}"

  //       // <InputField
  //       //   key={idx}
  //       //   style={`min-width: ${inputWidth}px; white-space: normal; word-break: break-all;`}
  //       //   placeholder={placeholder}
  //       //   value={resetInputs ? "" : userInputs[placeholder] || ""}
  //       //   onChange={(e: { target: { value: string; }; }) => handleInputChange(placeholder, e.target.value)}
  //       // />
  //     } else {
  //       return part.replace(/\n/g, "<br />");
  //     }
  //   }).join("");

  // };

  const createEditableContentHTML = (text: string) => {
    const content = text ? text : "  ";
    return content?.split(/(\[[^\]]+\])/g).map((part, index) => {
      if (part?.startsWith("[") && part.endsWith("]")) {
        const placeholder = part?.substring(1, part?.length - 1);
        const inputWidth = Math.max(placeholder?.length);

        return (
          <input
            key={`input-${index}-${placeholder}`}
            className="focus:outline-none bg-transparent inline overflow-x-auto text-secondary-800 shrink-0 border-appGray-400 placeholder:text-gray-500/60 border-b max-w-[600px] 2xl:max-w-[920px]"
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
            {textParts?.map((text, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <br />}
                <span className="inline" dangerouslySetInnerHTML={{ __html: text }} />
              </React.Fragment>
            ))}
          </span>
        );
      }
    });
  };

  useEffect(() => {
    // Scroll to the bottom whenever the component updates
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="flex flex-col w-full justify-between">
        <div className="relative h-auto">
          {error && <div className="text-red-500 text-xs mt-1 mb-0.5">{error}</div>}
          {answer.length <= 0 && !hasInput && (
            <div className="absolute top-4.5 z-10 px-2.5  text-sm text-appGray-400">
              Please provide your answer here.
            </div>
          )}
          <ErrorBoundary fallback={<div>Something went wrong. Please try again later.</div>}>
            <div
              contentEditable
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
            <Button htmlType={"button"} type="secondary" rounded={"medium"} handleClick={onSkip}>
              Skip for now
            </Button>
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
