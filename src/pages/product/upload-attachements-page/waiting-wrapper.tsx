import React from "react";
import Button from "../../../components/reusable/button";
import { useAppDispatch } from "../../../hooks/redux";
import {
  incrementStep,
  setCurrentPageId,
  TUploadAttachmentsPages,
} from "../../../stores/upload-attachments";
import ToPayementButton from "./to-payement-button";
import RequirementSummary from "../quick-prompt/requirement-summary";

export default function WaitingWrapper({
  children,
  nextPageId,
  nextPayement = false,
}: {
  children: React.ReactNode;
  nextPageId: TUploadAttachmentsPages;
  nextPayement?: boolean;
}) {
  const dispatch = useAppDispatch();

  const handleContinueBtnClick = () => {
    dispatch(setCurrentPageId(nextPageId));
    dispatch(incrementStep());
  };

  return (
    <RequirementSummary>
      <div className="w-[300px] shrink-0 space-y-5">
        <>
          {children}
          {nextPayement ? (
            <ToPayementButton />
          ) : (
            <Button type="optional" classname="w-full" handleClick={handleContinueBtnClick}>
              <p className="text-secondary-800">Continue</p>
            </Button>
          )}

          <p className="cursor-pointer underline text-purple-900">
            If more info is required (temp link)
          </p>
        </>
      </div>
    </RequirementSummary>
  );
}
