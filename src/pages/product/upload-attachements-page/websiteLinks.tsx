import { useEffect } from "react";
import {
  EUploadAttachmentsPages,
  incrementStep,
  setCurrentPageId,
  setIsUploadAttachmentsError,
  setIsUploadAttachmentsSuccess,
  setWebsiteLinks,
  uploadAttachments,
} from "../../../stores/upload-attachments";
import jsCookie from "js-cookie";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import toast from "react-hot-toast";
import WebsiteLinksForm from "./website-links-form";
import { DustbinIcon } from "src/components/icons";
import Button from "src/components/reusable/button";
import classNames from "classnames";

export default function WebsiteLinks() {
  const dispatch = useAppDispatch();

  const {
    isUploading: isUploadingUploadAttachments,
    additionalQuestionIds,
    isUploadAttachmentsError,
    isUploadAttachmentsSuccess,
    message,
    filesToUpload,
    websiteLinks,
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
      dispatch(setCurrentPageId(EUploadAttachmentsPages.GoToReport));
      dispatch(incrementStep());
      dispatch(setIsUploadAttachmentsSuccess(false));
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

  const handleWebLinkDelete = (webLink: string) => {
    const newWebLink = websiteLinks.filter((w) => w !== webLink);
    dispatch(setWebsiteLinks(newWebLink));
  };

  const isLoading = isUploadingUseCases || isUploadingUploadAttachments;

  return (
    <div className="flex flex-row justify-between gap-x-[150px]">
      <div className="flex flex-col justify-center p-[20px] rounded-lg border-4 border-dashed border-primary-900 bg-white outline-none w-[900px]">
        <WebsiteLinksForm isLoading={isLoading} />
      </div>

      {/* Dropped files */}
      <div className="w-[300px]">
        <p className="text-lg font-bold text-primary-900 mb-1">Added websites</p>
        <div className="space-y-[4px] mb-5">
          {websiteLinks.map((webLink) => (
            <div key={webLink}>
              <div className="flex flex-row justify-between gap-x-3">
                <p className="truncate text-xs mb-1">{webLink}</p>
                <div
                  onClick={() => {
                    handleWebLinkDelete(webLink);
                  }}
                  className="cursor-pointer"
                >
                  <DustbinIcon />
                </div>
              </div>
              <div className="w-full bg-gray-200 h-[1px]"></div>
            </div>
          ))}
        </div>
        <Button
          type="optional"
          classname="text-secondary-800 w-full"
          handleClick={handleContinueBtnClick}
          disabled={websiteLinks.length === 0}
          loading={isLoading}
        >
          <p
            className={classNames("text-secondary-800", {
              "opacity-50": websiteLinks.length === 0,
            })}
          >
            Continue
          </p>
        </Button>
      </div>
    </div>
  );
}
