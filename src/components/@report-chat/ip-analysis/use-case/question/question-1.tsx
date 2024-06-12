import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import jsCookie from "js-cookie";

import axiosInstance from "../../../../../utils/axios";

import { IAnswer } from "../../../../../@types/entities/IPLandscape";

import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";

import NewComponent from "../../new-comp";
import { setSession } from "../../../../../stores/session";
import { setChat } from "../../../../../stores/chat";

interface Props {
  changeActiveStep: (steps: number) => void;
  activeStep: number;
  activeIndex: number;
  totalQuestion: number;
  question: {
    question: string;
    questionId: number;
    usecase?: any;
    answer: string;
  };
}

/**
 *
 */
export default function ChatQuestionAnswer({
  changeActiveStep,
  // activeStep,
  totalQuestion,
  question,
  activeIndex,
}: // questionId,
Props) {
  const dispatch = useAppDispatch();
  const [isloading, setIsLoading] = useState(false);

  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);

  const questionId = useMemo(() => question.questionId, [question.questionId]);

  const userId = jsCookie.get("user_id");
  const sessionId = jsCookie.get("session_id");

  const onContinue = useCallback(
    async (value: IAnswer) => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.post(
          `https://pn-chatbot.azurewebsites.net/generate/?answer=${encodeURIComponent(
            value.answer,
          )}&userID=${userId}&requirement_gathering_id=${Number(
            sessionId,
          )}&QuestionID=${questionId}`,
        );

        const apiData = response.data.question;
        const status = response.data.status;
        const resError = response.data.error;

        setIsLoading(false);

        if (response == undefined || status === undefined) {
          toast.error("Something went wrong");
        }

        if (resError || resError !== undefined) {
          toast.error(resError);
        } else {
          if (status === "true" || status == true) {
            if (totalQuestion - 1 === activeIndex) {
              dispatch(
                setSession({
                  session_data: {
                    ...sessionDetail,
                    question_id: questionId,
                    step_id: 5,
                    active_index: activeIndex + 1,
                    skipped_question: (sessionDetail?.skipped_question || []).filter(
                      (id) => id !== questionId,
                    ),
                  },
                }),
              );
              changeActiveStep(5);
            } else {
              dispatch(
                setSession({
                  session_data: {
                    ...sessionDetail,
                    question_id: questionId,
                    step_id: 3,
                    active_index: activeIndex + 1,
                    skipped_question: (sessionDetail?.skipped_question || []).filter(
                      (id) => id !== questionId,
                    ),
                  },
                }),
              );
            }
            changeActiveStep(3);
          } else if (status === undefined) {
            toast.error("Something went wrong");
          } else {
            dispatch(
              setSession({
                session_data: {
                  ...sessionDetail,
                  step_id: 8,
                  user_chat: {
                    question: apiData,
                    question_id: questionId,
                  },
                },
              }),
            );
            dispatch(setChat({ question: apiData }));
            changeActiveStep(8);
          }
        }
      } catch (error: any) {
        if (error.request.data == undefined) {
          toast.error(error.message || "Something went wrong");
        }
        setIsLoading(false);
        toast.error(error || error.message || "Something went wrong");
      }
    },
    [
      activeIndex,
      changeActiveStep,
      dispatch,
      questionId,
      sessionDetail,
      sessionId,
      totalQuestion,
      userId,
    ],
  );
  const onSkip = useCallback(() => {
    if (totalQuestion - 1 === activeIndex) {
      dispatch(
        setSession({
          session_data: {
            ...sessionDetail,
            question_id: questionId,
            step_id: 5,
            active_index: activeIndex + 1,
            skipped_question: [...(sessionDetail?.skipped_question || []), questionId],
          },
        }),
      );
      changeActiveStep(5);
    } else {
      dispatch(
        setSession({
          session_data: {
            ...sessionDetail,
            question_id: questionId,
            step_id: 3,
            active_index: activeIndex + 1,
            skipped_question: [...(sessionDetail?.skipped_question || []), questionId],
          },
        }),
      );
      changeActiveStep(3);
    }
  }, [activeIndex, changeActiveStep, dispatch, questionId, sessionDetail, totalQuestion]);

  return (
    <>
      <NewComponent
        isLoading={isloading}
        onContinue={onContinue}
        question={question.question}
        exampleAnswer={question.answer}
        onSkip={onSkip}
      />
    </>
  );
}
