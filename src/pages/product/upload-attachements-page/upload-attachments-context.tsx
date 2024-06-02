import React, { createContext, useState } from "react";

interface IUploadAttachmentsContext {
  currentPageId: number;
  setCurrentPageId: React.Dispatch<React.SetStateAction<number>>;

  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;

  currentQuestionId: number;
  setCurrentQuestionId: React.Dispatch<React.SetStateAction<number>>;

  additionalQuestionIds: number[];
  setAdditionalQuestionsIds: React.Dispatch<React.SetStateAction<number[]>>;
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
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [additionalQuestionIds, setAdditionalQuestionsIds] = useState<number[]>([]);

  return (
    <UploadAttachmentsContext.Provider
      value={{
        currentPageId,
        additionalQuestionIds,
        currentQuestionId,
        currentStep,
        setCurrentStep,
        setCurrentQuestionId,
        setCurrentPageId,
        setAdditionalQuestionsIds,
      }}
    >
      {children}
    </UploadAttachmentsContext.Provider>
  );
}
