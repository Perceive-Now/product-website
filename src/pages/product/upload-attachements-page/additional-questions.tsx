import { useContext } from "react";
import NewComponent from "../../../components/@report-chat/ip-analysis/new-comp";
import { UploadAttachmentsContext } from "./upload-attachments-context";
import useAdditionalQuestionsService, { IAnswerObj } from "./use-additional-questions-service";
import { questionList } from "../report/_question";

export default function AdditionalQuestions() {
  const {
    additionalQuestionIds,
    setCurrentQuestionId,
    currentQuestionId,
    setCurrentStep,
    setCurrentPageId,
    answers,
    setAnswers,
  } = useContext(UploadAttachmentsContext);

  const { uploading, uploadAnswers } = useAdditionalQuestionsService();

  const currentQuestion = questionList.filter(
    (question) => question.questionId === currentQuestionId,
  )[0];

  const handleOnContinue = async (answer: IAnswerObj) => {
    // check if there is already an answer to the question
    const indexOfAlreadyAnsweredQuestion = answers.findIndex(
      (answerObj) => answerObj.questionId === currentQuestionId,
    );

    const updatedAnswers = [...answers];

    if (indexOfAlreadyAnsweredQuestion >= 0) {
      updatedAnswers[indexOfAlreadyAnsweredQuestion].answer = answer.answer;
    } else {
      updatedAnswers.push({
        questionId: currentQuestionId,
        answer: answer.answer,
      });
    }

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

  const answerForCurrentQuestion = answers.find(
    (answer) => currentQuestion.questionId === answer.questionId,
  );

  return (
    <>
      {currentQuestion && (
        <NewComponent
          isLoading={uploading}
          exampleAnswer={currentQuestion.answer}
          question={currentQuestion.question}
          onContinue={handleOnContinue}
          key={currentQuestionId}
          answer={answerForCurrentQuestion?.answer}
        />
      )}
    </>
  );
}
