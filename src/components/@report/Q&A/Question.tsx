import { useCallback, useState, useEffect } from "react";
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

const BASE_PN_REPORT_URL = process.env.REACT_APP_REPORT_API_URL;
const BASE_DRAFT_URL = `${BASE_PN_REPORT_URL}/draft/`;

export const EReportSectionPageIDs = {
  UseCases: "new-report",
  InteractionMethod: "interaction-method",
  UploadAttachments: "upload-attachments",
  UploadQuickPrompts: "quick-prompt",
  QA: "q&a",
  Payment: "payment",
};

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

interface Draft {
  [key: number]: string;
}

const ReportChatQuestionAnswer = ({ question, questionWithUsecase }: Props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [draft, setDraft] = useState<Draft>({});

  const userId = jsCookie.get("user_id");

  const { currentQuestionId, skippedQuestionList } = useAppSelector((state) => state.QA);
  const { requirementGatheringId } = useAppSelector((state) => state.usecases);

  const saveDraft = useCallback(
    async (updatedDraft: Draft) => {
      try {
        const draftData = {
          requirement_gathering_id: Number(requirementGatheringId),
          user_id: userId,
          current_page: EReportSectionPageIDs.QA,
          other_data: updatedDraft,
          date: new Date().toISOString(),
          report_name: "Report Chat",
        };

        await axiosInstance.post(BASE_DRAFT_URL, draftData);
      } catch (error) {
        console.error("Failed to save draft", error);
      }
    },
    [requirementGatheringId, userId],
  );

  const onContinue = useCallback(
    async (value: IAnswer) => {
      setLoading(true);
      try {
        const res = await axiosInstance.post(
          `${BASE_PN_REPORT_URL}/generate/?answer=${encodeURIComponent(
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
          const updatedDraft = {
            ...draft,
            [question.questionId]: value.answer,
          };
          setDraft(updatedDraft);
          await saveDraft(updatedDraft);

          dispatch(
            updateQuestionAnswer({
              questionId: currentQuestionId,
              answer: value.answer,
            }),
          );

          const nextQuestionIndex =
            questionWithUsecase.findIndex((q) => currentQuestionId === q.questionId) + 1;

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
      draft,
      saveDraft,
    ],
  );

  const onSkip = useCallback(async () => {
    const updatedDraft = {
      ...draft,
      [question.questionId]: "",
    };
    setDraft(updatedDraft);
    await saveDraft(updatedDraft);

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
      questionWithUsecase.findIndex((q) => currentQuestionId === q.questionId) + 1;

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
    draft,
    saveDraft,
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
