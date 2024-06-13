import { useEffect } from "react";
import jsCookie from "js-cookie";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  EUploadAttachmentsPages,
  IAnswerObj,
  incrementStep,
  setAnswers,
  setCurrentPageId,
  setCurrentQuestionId,
  setisUploadAnswerToAddtionalQuestionsError,
  setisUploadAnswerToAddtionalQuestionsSuccess,
  updateQuestionList,
  uploadAnswerToAddtionalQuestions,
} from "../../../stores/upload-attachments";
import toast from "react-hot-toast";
import QuestionForm from "./question-form";

export default function AdditionalQuestions() {
  const dispatch = useAppDispatch();

  const {
    isUploading,
    answers,
    currentQuestionId,
    additionalQuestionIds,
    isUploadAnswerToAddtionalQuestionsError,
    isUploadAnswerToAddtionalQuestionsSuccess,
    message,
    answerResponse,
    questionsList,
  } = useAppSelector((state) => state.uploadAttachments);

  const { requirementGatheringId, useCaseIds } = useAppSelector((state) => state.usecases);

  useEffect(() => {
    if (isUploadAnswerToAddtionalQuestionsError) {
      toast.error(message);
      dispatch(setisUploadAnswerToAddtionalQuestionsError(false));
      return;
    }

    if (isUploadAnswerToAddtionalQuestionsSuccess) {
      if (answerResponse.status === "false") {
        toast.error("Give a more detailed answer");
        dispatch(
          updateQuestionList({ questionId: currentQuestionId, question: answerResponse.question }),
        );
        dispatch(setisUploadAnswerToAddtionalQuestionsSuccess(false));
        return;
      }

      const nextQuestionIndex =
        additionalQuestionIds.findIndex(
          (questionId) => currentQuestionId === questionId.question_id,
        ) + 1;

      // if this is the last question
      if (nextQuestionIndex === additionalQuestionIds.length) {
        dispatch(setCurrentPageId(EUploadAttachmentsPages.AllSet));
        dispatch(incrementStep());
      } else {
        dispatch(setCurrentQuestionId(additionalQuestionIds[nextQuestionIndex].question_id));
        dispatch(incrementStep());
      }

      dispatch(setisUploadAnswerToAddtionalQuestionsSuccess(false));
      return;
    }
  }, [
    isUploadAnswerToAddtionalQuestionsError,
    isUploadAnswerToAddtionalQuestionsSuccess,
    additionalQuestionIds,
    currentQuestionId,
    message,
    answerResponse,
    dispatch,
  ]);

  const currentQuestion = questionsList.filter(
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

    dispatch(
      uploadAnswerToAddtionalQuestions({
        userId: jsCookie.get("user_id") ?? "",
        useCaseId: useCaseIds[0] ?? "", // TODO get correct use case ids
        answer: answer,
        questionId: currentQuestionId,
        requirementGatheringId: requirementGatheringId,
      }),
    );
  };

  const answerForCurrentQuestion = answers.find(
    (answer) => currentQuestion?.questionId === answer?.questionId,
  );

  return (
    <>
      {currentQuestion && (
        <QuestionForm
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
