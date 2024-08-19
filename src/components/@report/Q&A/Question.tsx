import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import jsCookie from "js-cookie";
import axios from "axios";

//
import { useAppDispatch, useAppSelector } from "src/hooks/redux";

//
import QuestionAnswerForm from "./question-form";
import {
  QAPages,
  addToSkippedQuestionList,
  getMadlibAnswers,
  incrementStep,
  setCurrentPageId,
  setCurrentQuestionId,
  setGenerateAnswerSuccess,
  updateQuestionAnswer,
  updateQuestionList,
  updateResponse,
} from "src/stores/Q&A";
import { NewQAList } from "src/pages/product/report-q&a/_new-question";

// import { getUserChats, IAnswer } from "src/utils/api/chat";

// import { quickPromptUseCase, UseCaseOptions } from "../use-case/__use-cases";
// import { useNavigate } from "react-router-dom";

// const BASE_PN_REPORT_URL = process.env.REACT_APP_REPORT_API_URL;

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

/**
 *
 */
const ReportChatQuestionAnswer = ({ question, questionWithUsecase }: Props) => {
  const userId = jsCookie.get("user_id");

  const dispatch = useAppDispatch();

  //
  const [loading, setLoading] = useState(false);
  const [resetForm, setResetForm] = useState(false);

  //
  const chatRef = useRef<HTMLInputElement>(null);

  const filterQuestion = NewQAList.filter((q) => q.questionId === question.questionId)[0] || null;

  useEffect(() => {
    dispatch(getMadlibAnswers());
  }, [dispatch]);

  //
  const { currentQuestionId, skippedQuestionList, isResponseGood, madlibAnswers } = useAppSelector(
    (state) => state.QA,
  );
  const { requirementGatheringId } = useAppSelector((state) => state.usecases);

  const hasMatchingItems =
    madlibAnswers?.some((m) => Number(m.questionId) === Number(question.questionId)) ?? false;

  //
  const onContinue = useCallback(
    async (value: { answer: string }) => {
      setLoading(true);

      //*****------------------ previous report endpoint  -----------------------******
      // setPrevCase(question.usecase);
      // const filterUsecases = quickPromptUseCase.filter((q) => usecases.includes(q));
      // console.log(filterUsecases)

      // const res = await axios.post(
      //   `${BASE_PN_REPORT_URL}/generate/?answer=${encodeURIComponent(
      //     value.answer,
      //   )}&userID=${userId}&requirement_gathering_id=${Number(
      //     requirementGatheringId,
      //   )}&QuestionID=${question.questionId}`,
      // );
      // ------------------- previous report endpoint  ----------------------
      // ******************************************************************************

      try {
        !hasMatchingItems && isResponseGood
          ? await axios.post("https://templateuserrequirements.azurewebsites.net/create-items/", {
              questionId: String(question.questionId),
              question: String(question.question),
              answer: value.answer,
              usecase: question.usecase,
              userId: String(userId),
              requirementId: String(requirementGatheringId),
            })
          : await axios.put(
              `https://templateuserrequirements.azurewebsites.net/update-items/?userId=${String(
                userId,
              )}&requirementId=${String(requirementGatheringId)}&questionId=${String(
                question.questionId,
              )}&usecaseId=${question.usecase}`,
              {
                question: String(filterQuestion.question),
                answer: value.answer,
              },
            );

        // const check =
        //   question.questionId === 1 || question.questionId === 2
        //     ? ("" as any)
        //     : await axios.post(
        //         "https://templateuserrequirements.azurewebsites.net/check_matlib_qa",
        //         {
        //           text: `question:${filterQuestion.question} answer:${value.answer}`,
        //         },
        //       );

        const responseText = "";
        // check?.data?.response?.Response || "";
        const badMarker = "@@bad@@";
        const badResponse = responseText.includes(badMarker);
        const indexOfBadMarker = responseText.indexOf(badMarker);

        const newQuestion = responseText.substring(indexOfBadMarker + badMarker.length).trim();
        const updateQuestion = newQuestion.replace(/[[\]]/g, "").trim();

        setLoading(false);
        scrollToTop();

        if (badResponse) {
          dispatch(updateResponse(false));
          // toast.error("Give a more detailed answer");
          dispatch(
            updateQuestionList({
              questionId: currentQuestionId,
              question: updateQuestion,
            }),
          );
          dispatch(setGenerateAnswerSuccess(false));
          // return;
        } else {
          setResetForm(true);
          dispatch(updateResponse(true));
          dispatch(
            updateQuestionAnswer({
              questionId: currentQuestionId,
              answer: value.answer,
            }),
          );

          //
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
        scrollToTop();
        setLoading(false);
        toast.error(e.response.data.detail || "Server error");
      }
    },
    [
      currentQuestionId,
      dispatch,
      filterQuestion.question,
      hasMatchingItems,
      isResponseGood,
      question.question,
      question.questionId,
      question.usecase,
      questionWithUsecase,
      requirementGatheringId,
      userId,
    ],
  );

  //Skip button
  const onSkip = useCallback(() => {
    dispatch(updateResponse(true));
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

  const scrollToTop = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = 0;
    }
  };

  return (
    <>
      <QuestionAnswerForm
        chatRef={chatRef}
        onContinue={onContinue}
        questionId={question.questionId}
        question={question?.question || ""}
        exampleAnswer={question?.exampleAnswer || ""}
        answer={question.answer}
        isLoading={loading}
        onSkip={onSkip}
        setResetForm={setResetForm}
        resetForm={resetForm}
        isEdit={false}
        hasSkippedQuestion={
          skippedQuestionList.length > 0 &&
          questionWithUsecase[questionWithUsecase.length - 1]?.questionId === currentQuestionId
        }
      />
    </>
  );
};

export default ReportChatQuestionAnswer;
