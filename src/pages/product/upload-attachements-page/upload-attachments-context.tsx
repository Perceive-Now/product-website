import React, { createContext, useEffect, useState } from "react";
import { IAnswerObj } from "./use-additional-questions-service";

interface IUploadAttachmentsContext {
  currentPageId: number;
  setCurrentPageId: React.Dispatch<React.SetStateAction<number>>;

  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;

  currentQuestionId: number;
  setCurrentQuestionId: React.Dispatch<React.SetStateAction<number>>;

  additionalQuestionIds: number[];
  setAdditionalQuestionsIds: React.Dispatch<React.SetStateAction<number[]>>;

  answers: IAnswerObj[];
  setAnswers: React.Dispatch<React.SetStateAction<IAnswerObj[]>>;
}

const UploadAttachmentContextInitialState = {
  currentPageId: 0,
  setCurrentPageId: () => {
    // do something
  },

  currentStep: 0,
  setCurrentStep: () => {
    // do something
  },

  currentQuestionId: 0,
  setCurrentQuestionId: () => {
    // do something
  },

  additionalQuestionIds: [],
  setAdditionalQuestionsIds: () => {
    // do something
  },

  answers: [],
  setAnswers: () => {
    // do something
  },
};

export const UploadAttachmentsContext = createContext<IUploadAttachmentsContext>(
  UploadAttachmentContextInitialState,
);

export default function UploadAttachmentsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentPageId, setCurrentPageId] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<IAnswerObj[]>([]);
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [additionalQuestionIds, setAdditionalQuestionsIds] = useState<number[]>([]);

  useEffect(() => {
    setCurrentQuestionId(Number(additionalQuestionIds[0]) ?? 0);
  }, [additionalQuestionIds, setCurrentQuestionId]);

  return (
    <UploadAttachmentsContext.Provider
      value={{
        currentPageId,
        setCurrentPageId,
        additionalQuestionIds,
        setAdditionalQuestionsIds,
        currentQuestionId,
        setCurrentQuestionId,
        currentStep,
        setCurrentStep,
        answers,
        setAnswers,
      }}
    >
      {children}
    </UploadAttachmentsContext.Provider>
  );
}
