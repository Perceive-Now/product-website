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
}

/**NewQuestion
 *
 */

export default function SkippedQuestionAnswer({ changeActiveStep }: Props) {
  const dispatch = useAppDispatch();

  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);
  //
  const userId = jsCookie.get("user_id");
  const sessionId = jsCookie.get("session_id");

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
            dispatch(
              setSession({
                session_data: {
                  ...sessionDetail,
                  step_id: 3,
                  skipped_question: (sessionDetail?.skipped_question || []).filter(
                    (id) => id !== questionId,
                  ),
                  // active_index: ,
                  completed_questions: [
                    ...(sessionDetail?.completed_questions || []),
                    questionId as any,
                  ],
                  user_chat: {
                    answer: answer,
                  },
                },
              }),
            );
            changeActiveStep(3);
          } else if (status === undefined) {
            toast.error("Something went wrong");
          } else {
            dispatch(
              setSession({
                session_data: {
                  ...sessionDetail,
                  step_id: 5,
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
            changeActiveStep(5);
          }
        }
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error.message);
      }
    },
    [
      answer,
      changeActiveStep,
      dispatch,
      exampleAnswer,
      questionId,
      sessionDetail,
      sessionId,
      userId,
    ],
  );

  const onSkip = useCallback(() => {
    dispatch(
      setSession({
        session_data: {
          ...sessionDetail,
          step_id: 5,
        },
      }),
    );
    changeActiveStep(5);
  }, [changeActiveStep, dispatch, sessionDetail]);

  return (
    <>
      {question && exampleAnswer && (
        <NewComponent
          isLoading={isloading}
          onContinue={onContinue}
          question={question}
          exampleAnswer={exampleAnswer}
          onSkip={onSkip}
        />
      )}
    </>
  );
}
