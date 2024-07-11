/* eslint-disable react/prop-types */
import React, { useState } from "react";
import classNames from "classnames";
import { QAMAdlib } from "src/pages/product/report-q&a/_new-question";
import Button from "src/components/reusable/button";

interface ContentItem {
  contentType: string;
  keyword: string;
  placeholder: string;
  content?: string; // Assuming content can be a string if contentType is 'text'
}

interface Props {
  hasSkippedQuestion?: boolean;
  showSkip: boolean;
  onSkip: () => void;
}

const MadlibAnswer = ({ hasSkippedQuestion, showSkip, onSkip }: Props) => {
  const [combinedText, setCombinedText] = useState("");
  // const [inputErrors, setInputErrors] = useState<{ [key: string]: string }>({});

  const handleContinue = () => {
    let textContent = "";

    QAMAdlib[0]?.contentList?.forEach((content) => {
      if (content.contentType === "text") {
        // Append text content from paragraphs
        textContent += content.content;
      } else if (content?.contentType === "prompt" && content?.keyword) {
        // Append input value to text content
        const inputValue =
          (document.getElementById(content.keyword) as HTMLInputElement)?.value || "";
        textContent += ` ${inputValue}`;
      }
    });

    // Set the combined text
    setCombinedText(() => {
      const updatedText = textContent.trim();
      return updatedText;
    });

    // Do something with combinedText, like sending it to a backend or storing in state
  };

  return (
    <div>
      <div className="items-center font-semibold text-secondary-800 text-sm mt-2.5 border p-1 rounded-md bg-appGray-100 min-h-[160px]">
        {QAMAdlib[0]?.contentList?.map((content, index) => {
          if (content.contentType === "text") {
            // Split the content by <br> to create an array
            const textWithBreaks = content?.content?.split(/<br\s*\/?>/gi).map((text, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {text}
              </React.Fragment>
            ));
            return (
              <p className="inline mx-[3px]" key={index}>
                {textWithBreaks}
              </p>
            );
          } else if (content?.contentType === "prompt" && content?.keyword) {
            return (
              <input
                className={classNames(
                  "focus:outline-none bg-transparent min-w-[160px] inline overflow-x-auto text-gray-500 shrink-0 placeholder:text-gray-500 border-b border-secondary-800",
                )}
                key={index}
                id={content.keyword} // Set id for input element
                width={content.placeholder.length}
                placeholder={content.placeholder}
              />
            );
          }
          return null;
        })}
      </div>

      {/* {inputErrors[content.keyword] && (
        <p className="text-xs text-danger-500">{inputErrors[content.keyword]}</p>
      )} */}

      {hasSkippedQuestion ? (
        <div>Answer all the skipped questions to continue.</div>
      ) : (
        <div className="mt-4 pb-4 flex gap-2 items-center">
          {showSkip && (
            <Button htmlType={"button"} type="secondary" rounded={"medium"} handleClick={onSkip}>
              Skip for now
            </Button>
          )}
          <Button handleClick={handleContinue} rounded={"medium"}>
            Save & Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default MadlibAnswer;
