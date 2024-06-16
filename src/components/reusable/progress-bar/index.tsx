import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import uploadAttachmentsPages from "../../../pages/product/upload-attachements-page/upload-attachment-pages-list";

// TODO Remove and use one in reusable after switching to redux

export default function ProgressBar() {
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
