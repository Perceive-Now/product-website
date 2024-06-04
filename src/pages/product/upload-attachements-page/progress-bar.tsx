import { useContext, useEffect, useState } from "react";
import uploadAttachmentsPages from "./upload-attachment-pages-list";
import { UploadAttachmentsContext } from "./upload-attachments-context";

// TODO Remove and use one in reusable after switching to redux

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
