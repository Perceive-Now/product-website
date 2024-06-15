import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import QuestionAnswerForm from "./question-form";
import jsCookie from "js-cookie";

import {
  addToSkippedQuestionList,
  generateQuestionAnswer,
  incrementStep,
  setCurrentQuestionId,
  setGenerateAnswerError,
  setGenerateAnswerSuccess,
  updateQuestionList,
} from "src/stores/Q&A";
import { IAnswer } from "src/@types/entities/IPLandscape";
import toast from "react-hot-toast";

interface Props {
  question: {
    questionId: number;
    useCaseId: number;
    question: string;
    usecase: string;
    answer?: string;
    exampleAnswer: string;
  };
}

const ReportChatQuestionAnswer = ({ question }: Props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const {
    currentQuestionId,
    questionsList,
    generateAnswerError,
    skippedQuestionList,
    answerResponse,
  } = useAppSelector((state) => state.QA);

  const { requirementGatheringId } = useAppSelector((state) => state.usecases);

  // useEffect(() => {
  //   if (generateAnswerError) {
  //     toast.error("message");
  //     dispatch(setGenerateAnswerError(false));
  //     return;
  //   }

  //   if (setGenerateAnswerSuccess) {
  //     if (answerResponse.status === "false") {
  //       toast.error("Give a more detailed answer");
  //       dispatch(
  //         updateQuestionList({ questionId: currentQuestionId, question: answerResponse.question }),
  //       );
  //       dispatch(setGenerateAnswerSuccess(false));
  //       return;
  //     }
  //     const nextQuestionIndex =
  //       questionsList.findIndex((questionId) => currentQuestionId === questionId.questionId) + 1;
  //     if (nextQuestionIndex === questionsList.length) {
  //       // dispatch(setCurrentPageId(EUploadAttachmentsPages.AllSet));
  //       dispatch(incrementStep());
  //     } else {
  //       dispatch(setCurrentQuestionId(questionsList[nextQuestionIndex].questionId));
  //       dispatch(incrementStep());
  //     }
  //   }
  // }, [answerResponse.question, answerResponse.status, currentQuestionId, dispatch, generateAnswerError, questionsList]);

  const onContinue = useCallback(
    async (value: IAnswer) => {
      setLoading(true);
      try {
        const res: any = await dispatch(
          generateQuestionAnswer({
            useCaseId: "", // Replace with actual value or state
            requirementGatheringId: requirementGatheringId,
            userId: jsCookie.get("user_id") ?? "",
            questionId: question.questionId,
            answer: value.answer || "",
          }),
        );
        setLoading(false);

        if (setGenerateAnswerSuccess) {
          if (res.payload.data.status === "false") {
            toast.error("Give a more detailed answer");
            dispatch(
              updateQuestionList({
                questionId: currentQuestionId,
                question: answerResponse.question,
              }),
            );
            dispatch(setGenerateAnswerSuccess(false));
            return;
          }
          const nextQuestionIndex =
            questionsList.findIndex((questionId) => currentQuestionId === questionId.questionId) +
            1;
          if (nextQuestionIndex === questionsList.length) {
            // dispatch(setCurrentPageId(EUploadAttachmentsPages.AllSet));
            dispatch(incrementStep());
          } else {
            dispatch(setCurrentQuestionId(questionsList[nextQuestionIndex].questionId));
            dispatch(incrementStep());
          }
        }
      } catch (e: any) {
        setLoading(false);
      }
    },
    [
      answerResponse.question,
      currentQuestionId,
      dispatch,
      question.questionId,
      questionsList,
      requirementGatheringId,
    ],
  );

  const onSkip = useCallback(() => {
    dispatch(
      addToSkippedQuestionList({
        question: question.question,
        questionId: question.questionId,
        exampleAnswer: question.exampleAnswer,
        useCaseId: question.useCaseId,
        usecase: question.usecase,
        answer: "",
      }),
    );
    const nextQuestionIndex =
      questionsList.findIndex((questionId) => currentQuestionId === questionId.questionId) + 1;

    const nextQuestionId = questionsList[nextQuestionIndex].questionId;
    dispatch(setCurrentQuestionId(nextQuestionId));
  }, [
    currentQuestionId,
    dispatch,
    question.exampleAnswer,
    question.question,
    question.questionId,
    question.useCaseId,
    question.usecase,
    questionsList,
  ]);

  return (
    <>
      <QuestionAnswerForm
        onContinue={onContinue}
        question={question?.question || ""}
        exampleAnswer={question?.exampleAnswer || ""}
        answer={question?.answer}
        isLoading={loading}
        onSkip={onSkip}
        hasSkippedQuestion={
          skippedQuestionList.length > 0 &&
          questionsList[questionsList.length - 1].questionId === currentQuestionId
        }
      />
    </>
  );
};

export default ReportChatQuestionAnswer;
