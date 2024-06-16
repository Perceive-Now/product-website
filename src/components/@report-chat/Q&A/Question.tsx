import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import toast from "react-hot-toast";
import jsCookie from "js-cookie";

import QuestionAnswerForm from "./question-form";
import {
  QAPages,
  addToSkippedQuestionList,
  incrementStep,
  setCurrentPageId,
  setCurrentQuestionId,
  setGenerateAnswerSuccess,
  updateQuestionAnswer,
  updateQuestionList,
} from "src/stores/Q&A";

import { IAnswer } from "src/@types/entities/IPLandscape";
import axiosInstance from "src/utils/axios";

interface IQuestionUsecase {
  questionId: number;
  useCaseId: number;
  question: string;
  usecase: string;
  answer: string;
  exampleAnswer: string;
}

interface Props {
  question: IQuestionUsecase;
  questionWithUsecase: IQuestionUsecase[];
}

const ReportChatQuestionAnswer = ({ question, questionWithUsecase }: Props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [resetForm, setResetForm] = useState(false);

  const userId = jsCookie.get("user_id");

  const { currentQuestionId, skippedQuestionList } = useAppSelector((state) => state.QA);

  const { requirementGatheringId } = useAppSelector((state) => state.usecases);

  const onContinue = useCallback(
    async (value: IAnswer) => {
      setLoading(true);
      try {
        const res = await axiosInstance.post(
          `https://pn-chatbot.azurewebsites.net/generate/?answer=${encodeURIComponent(
            value.answer,
          )}&userID=${userId}&requirement_gathering_id=${Number(
            requirementGatheringId,
          )}&QuestionID=${question.questionId}`,
        );
        const new_question = res.data.question;
        setLoading(false);
        setResetForm(true);

        if (res.data.status === "false") {
          toast.error("Give a more detailed answer");
          dispatch(
            updateQuestionList({
              questionId: currentQuestionId,
              question: new_question,
            }),
          );
          dispatch(setGenerateAnswerSuccess(false));
          return;
        } else {
          dispatch(
            updateQuestionAnswer({
              questionId: currentQuestionId,
              answer: value.answer,
            }),
          );
          const nextQuestionIndex =
            questionWithUsecase.findIndex(
              (questionId) => currentQuestionId === questionId.questionId,
            ) + 1;

          if (nextQuestionIndex === questionWithUsecase.length) {
            dispatch(setCurrentPageId(QAPages.Review));
            dispatch(incrementStep());
          } else {
            dispatch(setCurrentQuestionId(questionWithUsecase[nextQuestionIndex].questionId));
            dispatch(incrementStep());
          }
        }
      } catch (e: any) {
        setLoading(false);
      }
    },
    [
      currentQuestionId,
      dispatch,
      question.questionId,
      questionWithUsecase,
      requirementGatheringId,
      userId,
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
      questionWithUsecase.findIndex((questionId) => currentQuestionId === questionId.questionId) +
      1;

    const nextQuestionId = questionWithUsecase[nextQuestionIndex].questionId;
    dispatch(setCurrentQuestionId(nextQuestionId));
  }, [
    currentQuestionId,
    dispatch,
    question.exampleAnswer,
    question.question,
    question.questionId,
    question.useCaseId,
    question.usecase,
    questionWithUsecase,
  ]);

  return (
    <>
      <QuestionAnswerForm
        onContinue={onContinue}
        question={question?.question || ""}
        exampleAnswer={question?.exampleAnswer || ""}
        answer={question.answer}
        isLoading={loading}
        onSkip={onSkip}
        setResetForm={setResetForm}
        resetForm={resetForm}
        hasSkippedQuestion={
          skippedQuestionList.length > 0 &&
          questionWithUsecase[questionWithUsecase.length - 1]?.questionId === currentQuestionId
        }
      />
    </>
  );
};

export default ReportChatQuestionAnswer;
