import { useEffect } from "react";
import {
  EUploadAttachmentsPages,
  incrementStep,
  setCurrentPageId,
  setIsUploadAttachmentsError,
  setIsUploadAttachmentsSuccess,
  uploadAttachments,
} from "../../../stores/upload-attachments";
import jsCookie from "js-cookie";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import toast from "react-hot-toast";

export default function WebsiteLinks() {
  const dispatch = useAppDispatch();

  const {
    isUploading: isUploadingUploadAttachments,
    additionalQuestionIds,
    isUploadAttachmentsError,
    isUploadAttachmentsSuccess,
    message,
    filesToUpload,
  } = useAppSelector((state) => state.uploadAttachments);

  const {
    isUploading: isUploadingUseCases,
    useCaseIds,
    requirementGatheringId,
  } = useAppSelector((state) => state.usecases);

  useEffect(() => {
    if (isUploadAttachmentsError) {
      toast.error(message);
      dispatch(setIsUploadAttachmentsError(false));
      return;
    }

    if (isUploadAttachmentsSuccess) {
      if (additionalQuestionIds.length === 0) {
        // if there are no need to get additional questions
        dispatch(setCurrentPageId(EUploadAttachmentsPages.GoToReport));
        dispatch(incrementStep());
        dispatch(setIsUploadAttachmentsSuccess(false));
        return;
      }

      if (additionalQuestionIds.length > 0) {
        // if there is a need to get additional questions
        dispatch(setCurrentPageId(EUploadAttachmentsPages.NeedAdditionalAnswers));
        dispatch(incrementStep());
        dispatch(setIsUploadAttachmentsSuccess(false));
        return;
      }

      return;
    }
  }, [
    isUploadAttachmentsError,
    isUploadAttachmentsSuccess,
    message,
    additionalQuestionIds,
    dispatch,
  ]);

  const handleContinueBtnClick = async () => {
    dispatch(
      uploadAttachments({
        userId: jsCookie.get("user_id") ?? "",
        requirementGatheringId: requirementGatheringId ?? "",
        user_case_ids: useCaseIds ?? [], // TODO get from usecase redux
        attachments: [...filesToUpload],
      }),
    );
  };

  return <div>WebsiteLinks</div>;
}
