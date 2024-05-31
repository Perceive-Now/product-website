import React, { createContext, useState } from "react";

interface IUploadAttachmentsContext {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;

  additionalQuestionIds: number[];
  setAdditionalQuestionsIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const UploadAttachmentContextInitialState = {
  currentStep: 0,
  setCurrentStep: () => {
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
  const [currentStep, setCurrentStep] = useState(0);
  const [additionalQuestionIds, setAdditionalQuestionsIds] = useState<number[]>([]);

  return (
    <UploadAttachmentsContext.Provider
      value={{ currentStep, additionalQuestionIds, setCurrentStep, setAdditionalQuestionsIds }}
    >
      {children}
    </UploadAttachmentsContext.Provider>
  );
}
