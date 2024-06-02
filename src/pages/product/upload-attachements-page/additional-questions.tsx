import { useContext, useEffect, useState } from "react";
import NewComponent from "../../../components/@report-chat/ip-analysis/new-comp";
import { UploadAttachmentsContext } from "./upload-attachments-context";
import useAdditionalQuestionsService, { IAnswerObj } from "./use-additional-questions-service";
import { questionList } from "../report/_question";

export default function AdditionalQuestions() {
  const { additionalQuestionIds, setCurrentQuestionId, currentQuestionId, setCurrentStep } =
    useContext(UploadAttachmentsContext);

  const [answers, setAnswers] = useState<IAnswerObj[]>();

  const { uploading, uploadAnswers } = useAdditionalQuestionsService();
  const { setCurrentPageId } = useContext(UploadAttachmentsContext);

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
        setCurrentPageId(4);
        setCurrentStep((prev) => prev + 1);
        return;
      }

      return;
    }

    setCurrentQuestionId(additionalQuestionIds[nextQuestionIndex]);
    setCurrentStep((prev) => prev + 1);
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
