import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import ProgressBar from "src/pages/product/upload-attachements-page/progress-bar";

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

  return <ProgressBar currentStep={currentStep + 1} totalSteps={totalSteps} />;
}
