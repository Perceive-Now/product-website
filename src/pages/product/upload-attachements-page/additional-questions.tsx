import { useEffect } from "react";
import jsCookie from "js-cookie";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  EUploadAttachmentsPages,
  fetchRequirementPercentage,
  incrementStep,
  resetFetchRequirementPercentageState,
  setAnswers,
  setCurrentPageId,
  setCurrentQuestionId,
  setisUploadAnswerToAddtionalQuestionsError,
  setisUploadAnswerToAddtionalQuestionsSuccess,
  updateQuestionList,
  uploadAnswerToAddtionalQuestions,
  saveDraft
} from "../../../stores/upload-attachments";
import toast from "react-hot-toast";
import QuestionForm from "./question-form";
import ReportPercentage from "./report-percentage";
import LeftContentWrapper from "./left-content-wrapper";

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

  const { fetchRequirementPercentageState } = useAppSelector((state) => state.uploadAttachments);
  useEffect(() => {
    if (fetchRequirementPercentageState.isError) {
      toast.error(fetchRequirementPercentageState.message);
      dispatch(resetFetchRequirementPercentageState());
      return;
    }

    if (fetchRequirementPercentageState.isSuccess) {
      dispatch(resetFetchRequirementPercentageState());
      return;
    }
  }, [dispatch, fetchRequirementPercentageState]);

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
        dispatch(
          fetchRequirementPercentage({
            requirement_gathering_id: requirementGatheringId,
          }),
        );
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
    requirementGatheringId,
    dispatch,
  ]);

  const currentQuestion = questionsList.filter(
    (question) => question.questionId === currentQuestionId,
  )[0];

  const handleOnContinue = async ({ answer }: { answer: string | undefined }) => {
    if (!answer) return;

    // check if there is already an answer to the question
    const indexOfAlreadyAnsweredQuestion = answers.findIndex(
      (answerObj) => answerObj.questionId === currentQuestionId,
    );

    const updatedAnswers = [...answers];

    if (indexOfAlreadyAnsweredQuestion >= 0) {
      updatedAnswers[indexOfAlreadyAnsweredQuestion] = {
        questionId: currentQuestionId,
        answer: answer,
      };
    } else {
      updatedAnswers.push({
        questionId: currentQuestionId,
        answer: answer,
      });
    }

    dispatch(setAnswers(updatedAnswers));
    await dispatch(saveDraft());
    console.log(jsCookie.get("user_id"));
    console.log(currentQuestion.useCaseId);
    console.log(answer);
    console.log(currentQuestionId);
    console.log(requirementGatheringId);

    dispatch(
      uploadAnswerToAddtionalQuestions({
        userId: jsCookie.get("user_id") ?? "",
        useCaseId: String(currentQuestion.useCaseId) ?? "", // TODO get correct use case ids
        answer: { answer, questionId: currentQuestionId },
        questionId: currentQuestionId,
        requirementGatheringId: requirementGatheringId,
      }),
    );
  };

  const handleSkipBtnClick = () => {
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
  };

  const answerForCurrentQuestion = answers.find(
    (answer) => currentQuestion?.questionId === answer?.questionId,
  );

  if (!currentQuestion) {
    handleSkipBtnClick();
  }

  return (
    <>
      {currentQuestion && (
        <LeftContentWrapper>
          <QuestionForm
            isLoading={isUploading}
            exampleAnswer={currentQuestion.answer}
            question={currentQuestion.question}
            onContinue={handleOnContinue}
            onSkipBtnClick={handleSkipBtnClick}
            key={currentQuestionId}
            answer={answerForCurrentQuestion?.answer}
          />
          <div className="max-w-[250px] lg:max-w-[300px] xl:max-w-[400px] w-full shrink-0">
            <p className="font-bold text-lg text-purple-900 mb-1">Report requirements</p>
            <ReportPercentage isAdditionalQuestions={true} />
          </div>
        </LeftContentWrapper>
      )}
    </>
  );
}
