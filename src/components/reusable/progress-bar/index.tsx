import uploadAttachmentsPages from "@/pages/product/upload-attachements-page/upload-attachment-pages-list";
import { UploadAttachmentsContext } from "@/pages/product/upload-attachements-page/upload-attachments-context";
import { useContext, useEffect, useState } from "react";

// TODO remove context and reuse when needed

export default function ProgressBar() {
  const { currentPageId, additionalQuestionIds, currentStep } =
    useContext(UploadAttachmentsContext);

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
  }, [currentPageId, additionalQuestionIds]);

  return (
    <div className="w-full bg-primary-900 h-2 my-3">
      <div
        className="h-full bg-secondary-500"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      ></div>
    </div>
  );
}
