import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";

interface Props {
  questionWithUsecase: any[];
  QAPagesList: any[];
}

export default function DetailQAProgressBar({ questionWithUsecase, QAPagesList }: Props) {
  const { currentPageId, currentStep, skippedQuestionList } = useAppSelector((state) => state.QA);

  const [totalSteps, setTotalSteps] = useState(0);

  useEffect(() => {
    let totalSteps = 1;
    // QAPagesList.forEach((step) => {
    //   if (step.id === currentPageId) {
    //     totalSteps = step.totalPages;
    //   }
    // });
    totalSteps += questionWithUsecase.length + skippedQuestionList.length;
    setTotalSteps(totalSteps);
  }, [
    currentPageId,
    currentStep,
    QAPagesList,
    questionWithUsecase.length,
    skippedQuestionList.length,
  ]);

  return (
    <div className="w-full bg-primary-900 h-1 my-3">
      <div
        className="h-full bg-secondary-500"
        style={{ width: `${((currentStep + 1) / (totalSteps + 2)) * 100}%` }}
      ></div>
    </div>
  );
}
