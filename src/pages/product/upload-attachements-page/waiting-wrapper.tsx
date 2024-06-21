import React, { useState } from "react";
import Button from "../../../components/reusable/button";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  EUploadAttachmentsPages,
  incrementStep,
  setCurrentPageId,
} from "../../../stores/upload-attachments";
import ToPayementButton, { useHandlePayment } from "./to-payement-button";
import RequirementSummary from "../quick-prompt/requirement-summary";
import Modal from "src/components/reusable/modal";
import { ConfirmationGuyIcon } from "src/components/icons";

export default function WaitingWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  const { requirementPercentage, additionalQuestionIds } = useAppSelector(
    (state) => state.uploadAttachments,
  );

  const { handlePayment, loading } = useHandlePayment();

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleContinueDetailsBtnClick = () => {
    dispatch(setCurrentPageId(EUploadAttachmentsPages.AdditionalQuestions));
    dispatch(incrementStep());
  };

  const handleContinueCreateReport = () => {
    handlePayment();
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
            <Modal open={isOpenDialog} handleOnClose={() => setIsOpenDialog(false)}>
              <ConfirmationDialog
                handleContinueCreateReportCallback={handleContinueCreateReport}
                handleProvideMoreDetailsCallback={handleContinueDetailsBtnClick}
                setIsOpenDialog={setIsOpenDialog}
              />
            </Modal>
            <Button
              type="optional"
              classname="w-full"
              handleClick={handleContinueDetailsBtnClick}
              disabled={loading}
            >
              <p className="text-secondary-800">Continue to provide more details</p>
            </Button>
            <Button
              type="default"
              classname="w-full border border-orange-500"
              handleClick={() => setIsOpenDialog(true)}
              disabled={loading}
            >
              <p className="text-secondary-800">Skip details and continue</p>
            </Button>
          </div>
        )}
      </div>
    </RequirementSummary>
  );
}

const ConfirmationDialog = ({
  handleContinueCreateReportCallback,
  handleProvideMoreDetailsCallback,
  setIsOpenDialog,
}: {
  handleContinueCreateReportCallback: () => void;
  handleProvideMoreDetailsCallback: () => void;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { requirementPercentage } = useAppSelector((state) => state.uploadAttachments);

  const handleContinueCreateReport = () => {
    setIsOpenDialog(false);
    handleContinueCreateReportCallback();
  };

  const handleProvideMoreDetails = () => {
    setIsOpenDialog(false);
    handleProvideMoreDetailsCallback();
  };

  return (
    <div className="bg-white py-8 px-5 flex flex-col justify-center items-center w-[800px] rounded-lg">
      <ConfirmationGuyIcon />
      <h2 className="text-[28px] text-purple-900 font-bold mb-1">You’re doing great!</h2>
      <p className="text-lg">
        Including more details could make your report even more insightful. You’ve provided about{" "}
        {requirementPercentage}% of the relevant information. Aiming for 90% or more will
        significantly enhance your report.
      </p>
      <div className="flex flex-row space-x-[10px] mt-5">
        <Button type="secondary" classname="w-[250px]" handleClick={handleContinueCreateReport}>
          <p className="text-purple-900">Continue to create report</p>
        </Button>
        <Button type="primary" classname="w-[250px]" handleClick={handleProvideMoreDetails}>
          <p>Provide more details</p>
        </Button>
      </div>
    </div>
  );
};
