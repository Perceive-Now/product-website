import GoBack from "./goback";
import { useAppSelector } from "../../../hooks/redux";
import quickPromptPagesList from "./quick-prompt-pages-list";
import Title from "src/components/reusable/title/title";
import { useEffect, useState } from "react";
import ProgressBar from "../upload-attachements-page/progress-bar";

export default function QuickPromptPage() {
  const { currentPageId } = useAppSelector((state) => state.uploadQuickPrompt);

  const currentPageTitle =
    quickPromptPagesList.find((page) => page.id === currentPageId)?.title ?? "Upload Attachments";

  return (
    <>
      <GoBack />
      <div className="flex flex-col min-w-[900px] min-h-[400px] rounded-lg">
        <Title text={currentPageTitle} className="mt-5" />
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

// TODO Remove and use one in reusable after switching to redux

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
