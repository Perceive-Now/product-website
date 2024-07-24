import { useEffect } from "react";
import {
  EUploadAttachmentsPages,
  fetchRequirementSummary,
  incrementStep,
  resetFetchRequirementSummaryState,
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
import LeftContentWrapper from "./left-content-wrapper";

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

  const { fetchRequirementSummaryState } = useAppSelector((state) => state.uploadAttachments);

  useEffect(() => {
    if (fetchRequirementSummaryState.isError) {
      toast.error(message);
      dispatch(resetFetchRequirementSummaryState());
      return;
    }

    if (fetchRequirementSummaryState.isSuccess) {
      dispatch(resetFetchRequirementSummaryState());
      dispatch(setCurrentPageId(EUploadAttachmentsPages.GoToReport));
      dispatch(incrementStep());
      dispatch(setIsUploadAttachmentsSuccess(false));
      return;
    }
  }, [fetchRequirementSummaryState, dispatch, message]);

  useEffect(() => {
    if (isUploadAttachmentsError) {
      toast.error(message);
      dispatch(setIsUploadAttachmentsError(false));
      return;
    }

    if (isUploadAttachmentsSuccess) {
      dispatch(
        fetchRequirementSummary({
          requirement_gathering_id: String(requirementGatheringId),
          useCaseIds: useCaseIds,
        }),
      );
      return;
    }
  }, [
    isUploadAttachmentsError,
    isUploadAttachmentsSuccess,
    message,
    additionalQuestionIds,
    dispatch,
    requirementGatheringId,
    useCaseIds,
  ]);

  const handleContinueBtnClick = async () => {
    dispatch(
      uploadAttachments({
        userId: jsCookie.get("user_id") ?? "",
        requirementGatheringId: requirementGatheringId ?? "",
        user_case_ids: useCaseIds ?? [],
        attachments: [...filesToUpload],
        webUrls: websiteLinks,
      }),
    );
  };

  const handleWebLinkDelete = (webLink: string) => {
    const newWebLink = websiteLinks.filter((w) => w !== webLink);
    dispatch(setWebsiteLinks(newWebLink));
  };

  const isLoading =
    isUploadingUseCases || isUploadingUploadAttachments || fetchRequirementSummaryState.isLoading;

  return (
    <LeftContentWrapper>
      <div className="flex flex-col justify-center p-2 lg:px-[20px] py-[16px] rounded-lg border-4 border-dashed border-primary-900 bg-white outline-none w-full max-w-[900px]">
        <WebsiteLinksForm isLoading={isLoading} />
      </div>

      {/* Dropped files */}
      <div className="w-[240px] 2xl:w-[300px] shrink-0">
        <p className="text-lg font-bold text-primary-900">Added websites</p>
        <div className="space-y-[4px] mb-2">
          {websiteLinks.map((webLink) => (
            <div key={webLink}>
              <div className="flex flex-row justify-between gap-x-3">
                <p className="truncate text-xs mb-1">{webLink}</p>
                {!isLoading && (
                  <div
                    onClick={() => {
                      handleWebLinkDelete(webLink);
                    }}
                    className="cursor-pointer"
                  >
                    <DustbinIcon />
                  </div>
                )}
              </div>
              <div className="w-full bg-gray-200 h-[1px]"></div>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Button
            type="optional"
            classname="text-secondary-800 w-full border"
            handleClick={handleContinueBtnClick}
            disabled={websiteLinks.length === 0}
            loading={isLoading}
          >
            <p
              className={classNames("text-secondary-800", {
                "opacity-50": isLoading,
              })}
            >
              Continue
            </p>
          </Button>
          <Button
            type="default"
            classname="w-full border border-orange-500"
            handleClick={handleContinueBtnClick}
            disabled={websiteLinks.length > 0}
            loading={false}
          >
            <p
              className={classNames("text-secondary-800", {
                "opacity-50": isLoading,
              })}
            >
              Skip
            </p>
          </Button>
        </div>
      </div>
    </LeftContentWrapper>
  );
}
