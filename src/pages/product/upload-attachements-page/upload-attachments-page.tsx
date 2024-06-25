import GoBack from "./goback";
import ProgressBar from "./progress-bar";
import uploadAttachmentsPages from "./upload-attachment-pages-list";
import { useAppSelector } from "../../../hooks/redux";
import Title from "src/components/reusable/title/title";
import { useEffect, useState } from "react";

export default function UploadAttachmentsPage() {
  const { currentPageId } = useAppSelector((state) => state.uploadAttachments);

  const currentPageTitle =
    uploadAttachmentsPages.find((page) => page.id === currentPageId)?.title ?? "Upload Attachments";

  return (
    <>
      <GoBack />
      <div>
        <Title text={currentPageTitle} className="mt-5" />
        <ProgressBarWrapper />
        <PagesStepper />
      </div>
    </>
  );
}

const PagesStepper = () => {
  const { currentPageId } = useAppSelector((state) => state.uploadAttachments);

  return (
    <>
      {uploadAttachmentsPages.map((page) => {
        const Comp = page.Component;
        if (page.id === currentPageId) {
          return <Comp key={page.id} />;
        }
      })}
    </>
  );
};

function ProgressBarWrapper() {
  const { currentPageId, additionalQuestionIds, currentStep } = useAppSelector(
    (state) => state.uploadAttachments,
  );

  const [totalSteps, setTotalSteps] = useState(0);

  useEffect(() => {
    let totalSteps = 0;
    uploadAttachmentsPages.forEach((step) => {
      if (step.id === currentPageId) {
        totalSteps = step.totalPages;
      }
    });
    totalSteps += additionalQuestionIds.length;
    setTotalSteps(totalSteps);
  }, [currentPageId, additionalQuestionIds, currentStep]);

  return <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />;
}
