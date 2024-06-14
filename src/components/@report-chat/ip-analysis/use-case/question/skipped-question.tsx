import jsCookie from "js-cookie";
import toast from "react-hot-toast";
import { useCallback, useMemo, useState } from "react";

import { IAnswer } from "../../../../../@types/entities/IPLandscape";

import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";

import axiosInstance from "../../../../../utils/axios";

import NewComponent from "../../new-comp";
import { setChat } from "../../../../../stores/chat";
import { setSession } from "../../../../../stores/session";

interface Props {
  changeActiveStep: (steps: number) => void;
  // activeStep: number;
  exampleAnswer?: string;
  activeIndex: number;
  questionWithUsecase: IQuestionUsecase[];
}

interface IQuestionUsecase {
  questionId: number;
  useCaseId: number;
  question: string;
  usecase: string;
  answer: string;
}

/**NewQuestion
 *
 */

export default function SkippedQuestionAnswer({
  changeActiveStep,
  activeIndex,
  questionWithUsecase,
}: Props) {
  const dispatch = useAppDispatch();

  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);
  //
  const userId = jsCookie.get("user_id");
  const requirementGatheringId = jsCookie.get("requirement_gathering_id");

  const [isloading, setIsLoading] = useState(false);

  //
  const answer = useMemo(
    () => sessionDetail?.user_chat?.answer || "",
    [sessionDetail?.user_chat?.answer],
  );
  const exampleAnswer = useMemo(
    () => sessionDetail?.user_chat?.example_answer,
    [sessionDetail?.user_chat?.example_answer],
  );
  const question = useMemo(
    () => sessionDetail?.user_chat?.question,
    [sessionDetail?.user_chat?.question],
  );
  const questionId = useMemo(
    () => sessionDetail?.user_chat?.question_id,
    [sessionDetail?.user_chat?.question_id],
  );

  const notCompletedQuestionList = questionWithUsecase.find(
    (q) => !sessionDetail?.completed_questions?.includes(q.questionId),
  );

  console.log(notCompletedQuestionList);

  const skippedQA = useMemo(
    () =>
      questionWithUsecase.find((q, idx) => {
        if (idx === activeIndex) {
          return q;
        }
      }) || { questionId: Number(questionId), question: "", usecase: "", answer: "" },
    [activeIndex, questionWithUsecase, questionId],
  );

  const totalQuestion = questionWithUsecase.length;

  const onContinue = useCallback(
    async (value: IAnswer) => {
      setIsLoading(true);

      try {
        const response = await axiosInstance.post(
          `https://pn-chatbot.azurewebsites.net/generate/?answer=${encodeURIComponent(
            value.answer,
          )}&userID=${userId}&requirement_gathering_id=${Number(
            requirementGatheringId,
          )}&QuestionID=${questionId}`,
        );
        const resError = response.data.error;
        const apiData = response.data.question;
        const status = response.status;
        const statusText = response.statusText;

        if (status === undefined) {
          toast.error("Something went wrong");
        }

        if (resError || resError !== undefined) {
          toast.error(resError);
        } else {
          if (status === 200 || statusText === "OK") {
            if (sessionDetail?.skipped_question && sessionDetail?.skipped_question?.length > 0) {
              dispatch(
                setSession({
                  session_data: {
                    ...sessionDetail,
                    step_id: 3,
                    prev_index: activeIndex,
                    skipped_question: (sessionDetail?.skipped_question || []).filter(
                      (id) => id !== questionId,
                    ),
                    active_index: activeIndex + 1,
                    completed_questions: [
                      ...(sessionDetail?.completed_questions || []),
                      questionId as any,
                    ],
                  },
                }),
              );
            } else {
              dispatch(
                setSession({
                  session_data: {
                    ...sessionDetail,
                    hasSkippedQuestion: false,
                    prev_index: activeIndex,
                    step_id: 6,
                    skipped_question: [
                      ...(sessionDetail?.skipped_question || []),
                      questionId as any,
                    ],
                  },
                }),
              );
            }

            changeActiveStep(6);
          } else if (status === undefined) {
            toast.error("Something went wrong");
          } else {
            dispatch(
              setSession({
                session_data: {
                  ...sessionDetail,
                  prev_index: activeIndex,
                  step_id: 8,
                  user_chat: {
                    question: apiData,
                    question_id: questionId,
                    example_answer: exampleAnswer,
                    answer: answer,
                  },
                },
              }),
            );
            dispatch(setChat({ question: apiData }));
            changeActiveStep(8);
          }
        }
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error.message);
      }
    },
    [
      activeIndex,
      answer,
      changeActiveStep,
      dispatch,
      exampleAnswer,
      questionId,
      requirementGatheringId,
      sessionDetail,
      userId,
    ],
  );

  const onSkip = useCallback(() => {
    if (sessionDetail?.skipped_question && sessionDetail?.skipped_question?.length > 0) {
      dispatch(
        setSession({
          session_data: {
            ...sessionDetail,
            hasSkippedQuestion: true,
            skipped_question: [...(sessionDetail?.skipped_question || []), questionId as any],
          },
        }),
      );
      toast.error("Answer all the skipped questions to continue.");
    } else {
      dispatch(
        setSession({
          session_data: {
            ...sessionDetail,
            question_id: questionId,
            step_id: 3,
            active_index: activeIndex + 1,
            hasSkippedQuestion: false,
            skipped_question: [...(sessionDetail?.skipped_question || []), questionId as any],
          },
        }),
      );
      changeActiveStep(3);
    }
  }, [activeIndex, changeActiveStep, dispatch, questionId, sessionDetail]);

  return (
    <>
      SKIPPED
      {question && exampleAnswer && (
        <NewComponent
          isLoading={isloading}
          onContinue={onContinue}
          question={skippedQA?.question}
          exampleAnswer={skippedQA?.answer}
          onSkip={onSkip}
          hasSkippedQuestion={sessionDetail?.hasSkippedQuestion}
        />
      )}
    </>
  );
}
