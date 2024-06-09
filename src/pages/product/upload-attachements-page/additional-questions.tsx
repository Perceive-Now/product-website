import { useEffect } from "react";
import jsCookie from "js-cookie";
import NewComponent from "../../../components/@report-chat/ip-analysis/new-comp";
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
  uploadAnswerToAddtionalQuestions,
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
    isUploadAnswerToAddtionalQuestionsError,
    isUploadAnswerToAddtionalQuestionsSuccess,
    message,
  } = useAppSelector((state) => state.uploadAttachments);

  useEffect(() => {
    if (isUploadAnswerToAddtionalQuestionsError) {
      toast.error(message);
      dispatch(setisUploadAnswerToAddtionalQuestionsError(false));
      return;
    }

    if (isUploadAnswerToAddtionalQuestionsSuccess) {
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
    dispatch,
  ]);

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

    dispatch(
      uploadAnswerToAddtionalQuestions({
        userId: jsCookie.get("user_id") ?? "",
        user_case_id: "1" ?? "", // TODO get from usecase redux
        answer: answer,
        requirementGatheringId: 1 ?? 0, // TODO get from usecase redux
      }),
    );
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
