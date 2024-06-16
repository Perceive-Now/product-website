import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import quickPromptPagesList from "./quick-prompt-pages-list";

// TODO Remove and use one in reusable after switching to redux

export default function ProgressBar() {
  const { currentPageId, paragraphIds, currentStep } = useAppSelector(
    (state) => state.uploadQuickPrompt,
  );

  const [totalSteps, setTotalSteps] = useState(0);

  useEffect(() => {
    let totalSteps = 0;
    quickPromptPagesList.forEach((step) => {
      if (step.id === currentPageId) {
        totalSteps = step.totalPages;
      }
    });
    totalSteps += paragraphIds?.length ?? 0;
    setTotalSteps(totalSteps);
  }, [currentPageId, paragraphIds, currentStep]);

  return (
    <div className="w-full bg-primary-900 h-1 my-3">
      <div
        className="h-full bg-secondary-500"
        style={{ width: `${((currentStep + 1) / (totalSteps + 2)) * 100}%` }}
      ></div>
    </div>
  );
}
