import React from "react";
import NewComponent from "../../../../components/@report-chat/ip-analysis/new-comp";

export default function AdditionalQuestions() {
  const questionsList = [
    {
      question: "question",
      answer: "answer",
      exampleAnswer: "example answer",
    },
    {},
  ];

  return (
    <div className="w-[900px]">
      <NewComponent
        isLoading={false}
        exampleAnswer="example answer"
        question="question"
        onContinue={() => {
          console.log("continue");
        }}
        answer="answer"
        key={1}
      />
    </div>
  );
}
