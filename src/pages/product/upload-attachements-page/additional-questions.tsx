import { useContext, useEffect, useState } from "react";
import NewComponent from "../../../components/@report-chat/ip-analysis/new-comp";
import { UploadAttachmentsContext } from "./upload-attachments-context";
import { questionList } from "../ip-landscaping/ip-analysis/_question";
import useAdditionalQuestionsService, { IAnswerObj } from "./use-additional-questions-service";

export default function AdditionalQuestions() {
  const { additionalQuestionIds } = useContext(UploadAttachmentsContext);

  const [currentQuestionId, setCurrentQuestionId] = useState(Number(additionalQuestionIds[0]) ?? 0);
  const [answers, setAnswers] = useState<IAnswerObj[]>();

  const { uploading, uploadAnswers } = useAdditionalQuestionsService();
  const { setCurrentStep } = useContext(UploadAttachmentsContext);

  useEffect(() => {
    setCurrentQuestionId(Number(additionalQuestionIds[0]) ?? 0);
  }, [additionalQuestionIds, setCurrentQuestionId]);

  const currentQuestion = questionList.filter(
    (question) => question.questionId === currentQuestionId,
  )[0];

  const handleOnContinue = async (answer: IAnswerObj) => {
    const updatedAnswers = [
      ...(answers ?? []),
      {
        questionId: currentQuestionId,
        answer: answer.answer,
      },
    ];

    setAnswers(updatedAnswers);

    const nextQuestionIndex = additionalQuestionIds.indexOf(currentQuestionId) + 1;

    // if there are no additional questions
    if (nextQuestionIndex === additionalQuestionIds.length) {
      const resData = await uploadAnswers(updatedAnswers);

      if (resData) {
        setCurrentStep(4);
        return;
      }

      return;
    }

    setCurrentQuestionId(additionalQuestionIds[nextQuestionIndex]);
  };

  return (
    <>
      {currentQuestion && (
        <NewComponent
          isLoading={uploading}
          exampleAnswer={currentQuestion.answer}
          question={currentQuestion.question}
          onContinue={handleOnContinue}
          key={currentQuestionId}
        />
      )}
    </>
  );
}
