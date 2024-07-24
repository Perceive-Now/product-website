import { useEffect, useState } from "react";

//
import GoBack from "./goback";
import { useAppSelector } from "../../../hooks/redux";

//
import quickPromptPagesList from "./quick-prompt-pages-list";
import ProgressBar from "../upload-attachements-page/progress-bar";

/**
 *
 */
export default function QuickPromptPage() {
  const { currentPageId } = useAppSelector((state) => state.uploadQuickPrompt);

  const currentPageTitle =
    quickPromptPagesList.find((page) => page.id === currentPageId)?.title ?? "Upload Attachments";

  return (
    <>
      <GoBack currentPageTitle={currentPageTitle} />
      <div className="h-[calc(100vh-200px)]">
        {/* <Title text={currentPageTitle} className="" /> */}
        <ProgressBarWrapper />
        <PagesStepper />
      </div>
    </>
  );
}

const PagesStepper = () => {
  const { currentPageId } = useAppSelector((state) => state.uploadQuickPrompt);

  return (
    <>
      {quickPromptPagesList.map((page) => {
        const Comp = page.Component;
        if (page.id === currentPageId) {
          return <Comp key={page.id} />;
        }
      })}
    </>
  );
};

function ProgressBarWrapper() {
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

  return <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />;
}
