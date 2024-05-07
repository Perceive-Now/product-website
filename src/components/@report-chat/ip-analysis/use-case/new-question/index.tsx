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
}

/**
 *
 */
export default function NewQuestion({ changeActiveStep, exampleAnswer }: Props) {
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
          toast.error(resError);
        } else {
          if (status === "true" || status == true) {
            if (questionId) {
              if (Number(questionId) <= 5) {
                dispatch(
                  setSession({
                    session_data: {
                      ...sessionDetail,
                      common_question_id: questionId + 1,
                      step_id: 3,
                    },
                  }),
                );
              } else {
                dispatch(
                  setSession({
                    session_data: {
                      ...sessionDetail,
                      question_id: questionId + 1,
                      step_id: 3,
                    },
                  }),
                );
              }
              changeActiveStep(3);
            }
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
    [changeActiveStep, dispatch, questionId, sessionDetail, sessionId, userId],
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
