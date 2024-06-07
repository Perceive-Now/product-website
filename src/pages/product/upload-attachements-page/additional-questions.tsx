import { useEffect } from "react";
import jsCookie from "js-cookie";
import NewComponent from "../../../components/@report-chat/ip-analysis/new-comp";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  IAnswerObj,
  incrementStep,
  setAnswers,
  setCurrentPageId,
  setCurrentQuestionId,
  setIsUploadAnswersToAddtionalQuestionsError,
  setIsUploadAnswersToAddtionalQuestionsSuccess,
  uploadAnswersToAddtionalQuestions,
} from "../../../stores/upload-attachments";
import toast from "react-hot-toast";
import { questionList } from "../report-q&a/_question";

export default function AdditionalQuestions() {
  const dispatch = useAppDispatch();

  const {
    isUploading,
    answers,
    currentQuestionId,
    additionalQuestionIds,
    isUploadAnswersToAddtionalQuestionsError,
    isUploadAnswersToAddtionalQuestionsSuccess,
    message,
  } = useAppSelector((state) => state.uploadAttachments);

  useEffect(() => {
    if (isUploadAnswersToAddtionalQuestionsError) {
      toast.error(message);
      dispatch(setIsUploadAnswersToAddtionalQuestionsError(false));
      return;
    }

    if (isUploadAnswersToAddtionalQuestionsSuccess) {
      dispatch(setCurrentPageId(4));
      dispatch(incrementStep());
      dispatch(setIsUploadAnswersToAddtionalQuestionsSuccess(false));
      return;
    }
  }, [
    isUploadAnswersToAddtionalQuestionsError,
    isUploadAnswersToAddtionalQuestionsSuccess,
    message,
    dispatch,
  ]);

  useEffect(() => {
    if (additionalQuestionIds.length === 0) return;
    dispatch(setCurrentQuestionId(additionalQuestionIds[0].question_id));
  }, [additionalQuestionIds, dispatch]);

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
      updatedAnswers[indexOfAlreadyAnsweredQuestion] = {
        questionId: currentQuestionId,
        answer: answer.answer,
      };
    } else {
      updatedAnswers.push({
        questionId: currentQuestionId,
        answer: answer.answer,
      });
    }

    dispatch(setAnswers(updatedAnswers));

    const nextQuestionIndex =
      additionalQuestionIds.findIndex(
        (questionId) => currentQuestionId === questionId.question_id,
      ) + 1;

    // if there are no additional questions
    if (nextQuestionIndex === additionalQuestionIds.length) {
      dispatch(
        uploadAnswersToAddtionalQuestions({
          userId: jsCookie.get("user_id") ?? "",
          sessionId: jsCookie.get("session_id") ?? "",
          categoryId: "1" ?? "", // TODO get from usecase redux
          answers: updatedAnswers,
        }),
      );
    } else {
      dispatch(setCurrentQuestionId(additionalQuestionIds[nextQuestionIndex].question_id));
      dispatch(incrementStep());
    }
  };

  const answerForCurrentQuestion = answers.find(
    (answer) => currentQuestion?.questionId === answer?.questionId,
  );

  return (
    <>
      {currentQuestion && (
        <NewComponent
          isLoading={isUploading}
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
