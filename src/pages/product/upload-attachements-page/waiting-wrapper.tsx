import React from "react";
import Button from "../../../components/reusable/button";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  EUploadAttachmentsPages,
  incrementStep,
  setCurrentPageId,
} from "../../../stores/upload-attachments";
import ToPayementButton from "./to-payement-button";
import RequirementSummary from "../quick-prompt/requirement-summary";

export default function WaitingWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  const { requirementPercentage, additionalQuestionIds } = useAppSelector(
    (state) => state.uploadAttachments,
  );

  const handleContinueDetailsBtnClick = () => {
    dispatch(setCurrentPageId(EUploadAttachmentsPages.AdditionalQuestions));
    dispatch(incrementStep());
  };

  const handleContinueSkipBtnClick = () => {
    // TODO show modal
    dispatch(incrementStep());
  };

  const nextPayement = requirementPercentage >= 95 || additionalQuestionIds.length === 0;

  return (
    <RequirementSummary>
      <div className="w-[400px] shrink-0">
        {children}
        <div className="mt-5"></div>
        {nextPayement && <ToPayementButton />}
        {!nextPayement && (
          <div className="space-y-[20px] ">
            <Button type="optional" classname="w-full" handleClick={handleContinueDetailsBtnClick}>
              <p className="text-secondary-800">Continue to provide more details</p>
            </Button>
            <Button
              type="default"
              classname="w-full border border-orange-500"
              handleClick={handleContinueSkipBtnClick}
            >
              <p className="text-secondary-800">Skip details and continue</p>
            </Button>
          </div>
        )}
      </div>
    </RequirementSummary>
  );
}
