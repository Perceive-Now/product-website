import { useCallback, useRef, useState } from "react";
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
  incrementStep,
  setCurrentPageId,
  setCurrentQuestionId,
  setGenerateAnswerSuccess,
  updateQuestionAnswer,
  updateQuestionList,
  updateResponse,
} from "src/stores/Q&A";

import { IAnswer } from "src/@types/entities/IPLandscape";

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
  const dispatch = useAppDispatch();

  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [prevCase, setPrevCase] = useState("");

  const chatRef = useRef<HTMLInputElement>(null);

  const userId = jsCookie.get("user_id");

  //
  const { currentQuestionId, skippedQuestionList, isResponseGood } = useAppSelector(
    (state) => state.QA,
  );
  const { requirementGatheringId } = useAppSelector((state) => state.usecases);

  //
  const onContinue = useCallback(
    async (value: IAnswer) => {
      setLoading(true);
      setPrevCase(question.usecase);

      // const filterUsecases = quickPromptUseCase.filter((q) => usecases.includes(q));
      // console.log(filterUsecases)

      // ------------------ previous report endponint  -----------------------
      // const res = await axios.post(
      //   `${BASE_PN_REPORT_URL}/generate/?answer=${encodeURIComponent(
      //     value.answer,
      //   )}&userID=${userId}&requirement_gathering_id=${Number(
      //     requirementGatheringId,
      //   )}&QuestionID=${question.questionId}`,
      // );
      // ------------------- previous report endponint  ----------------------

      try {
        const res = isResponseGood
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
                question: String(question.question),
                answer: value.answer,
              },
            );

        const check = await axios.post(
          "https://templateuserrequirements.azurewebsites.net/check_matlib_qa",
          {
            text: `question:${question.question} answer:${value.answer}`,
          },
        );

        const responseText = check.data.response.Response;
        const badMarker = "@@bad@@";
        const badResponse = responseText.includes(badMarker);
        const indexOfBadMarker = responseText.indexOf(badMarker);

        const newQuestion = responseText.substring(indexOfBadMarker + badMarker.length).trim();

        // console.log(res)
        // console.log(check);
        // console.log(badResponse);

        // const new_question = res.data.question;
        setLoading(false);
        scrollToTop();

        if (badResponse) {
          dispatch(updateResponse(false));
          toast.error("Give a more detailed answer");
          dispatch(
            updateQuestionList({
              questionId: currentQuestionId,
              question: newQuestion,
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

          // const nextUsecase = questionWithUsecase[nextQuestionIndex].usecase;
          // const check = filterUsecases.some((q) => q === nextUsecase);

          // console.log(check);
          // console.log(nextUsecase)
          // if (check) {
          //   navigate('/interaction-method')
          // } else {
          // }

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
        toast.error("Server error");
      }
    },
    [
      currentQuestionId,
      dispatch,
      isResponseGood,
      question,
      questionWithUsecase,
      requirementGatheringId,
      userId,
    ],
  );

  //
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
