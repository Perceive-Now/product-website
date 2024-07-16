import React from "react";
import { useAppSelector } from "src/hooks/redux";

const QAComponent = () => {
  const { questionsList, currentPageId } = useAppSelector((state) => state.QA);

  return (
    <div>
      {questionsList.length > 0 ? (
        questionsList.map((question, index) => (
          <div key={index}>
            <h3>{question.question}</h3>
            <p>{question.answer}</p>
          </div>
        ))
      ) : (
        <p>No questions available</p>
      )}
    </div>
  );
};

export default QAComponent;
