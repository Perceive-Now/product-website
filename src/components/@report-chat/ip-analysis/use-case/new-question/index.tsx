import jsCookie from "js-cookie";
import toast from "react-hot-toast";
import { useCallback, useMemo, useState } from "react";

import { IAnswer } from "../../../../../@types/entities/IPLandscape";

import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";

import { setChat } from "../../../../../stores/chat";
import axiosInstance from "../../../../../utils/axios";

import NewComponent from "../../new-comp";
import { setSession } from "../../../../../stores/session";

interface Props {
  changeActiveStep: (steps: number) => void;
  activeStep?: number;
  exampleAnswer: string;
  activeIndex: number;
}

/**
 *
 */
export default function NewQuestion({ changeActiveStep, exampleAnswer, activeIndex }: Props) {
  const dispatch = useAppDispatch();
  const [isloading, setIsLoading] = useState(false);

  //
  const userId = jsCookie.get("user_id");
  const sessionId = jsCookie.get("session_id");

  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);

  const questionId = useMemo(
    () => sessionDetail?.user_chat?.question_id,
    [sessionDetail?.user_chat?.question_id],
  );

  const question = useMemo(
    () => sessionDetail?.user_chat?.question,
    [sessionDetail?.user_chat?.question],
  );

  const onContinue = useCallback(
    async (value: IAnswer) => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.post(
          `https://pn-chatbot.azurewebsites.net/generate/?answer=${encodeURIComponent(
            value.answer,
          )}&userID=${userId}&sessionID=${Number(sessionId)}&QuestionID=${Number(questionId)}`,
        );
        const resError = response.data.error;
        const apiData = response.data.question;
        const status = response.data.status;

        if (resError || resError !== undefined) {
          toast.error(resError || "Something went wrong");
        } else {
          if (status === "true" || status == true) {
            if (questionId) {
              dispatch(
                setSession({
                  session_data: {
                    ...sessionDetail,
                    question_id: questionId,
                    step_id: 3,
                    active_index: activeIndex + 1,
                  },
                }),
              );
              changeActiveStep(3);
            }
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
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error.message);
      }
    },
    [activeIndex, changeActiveStep, dispatch, questionId, sessionDetail, sessionId, userId],
  );

  return (
    <>
      {question && (
        <NewComponent
          isLoading={isloading}
          onContinue={onContinue}
          question={question}
          exampleAnswer={exampleAnswer}
        />
      )}
    </>
  );
}
