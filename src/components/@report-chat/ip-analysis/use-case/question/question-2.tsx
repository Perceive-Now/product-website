import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import jsCookie from "js-cookie";

import { IAnswer } from "../../../../../@types/entities/IPLandscape";

import axiosInstance from "../../../../../utils/axios";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { setNoveltyAspect } from "../../../../../stores/IpSteps";

import NewComponent from "../../new-comp";
import { setSession } from "../../../../../stores/session";

interface Props {
  changeActiveStep: (steps: number) => void;
  activeStep: number;
  question: {
    question: string;
    questionId: number;
    usecase?: any;
    answer: string;
  };
}

export default function ChatQuestionAnswer2({ changeActiveStep, activeStep, question }: Props) {
  const dispatch = useAppDispatch();
  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);

  const [isloading, setIsLoading] = useState(false);
  const questionId = question.questionId;

  const userId = jsCookie.get("user_id");
  const sessionId = jsCookie.get("session_id");

  // jsCookie.set("chatId", String(3));

  const onContinue = useCallback(
    async (value: IAnswer) => {
      setIsLoading(true);

      try {
        const response = await axiosInstance.post(
          `https://pn-chatbot.azurewebsites.net/generate/?answer=${encodeURIComponent(
            value.answer,
          )}&userID=${userId}&sessionID=${Number(sessionId)}&QuestionID=${questionId}`,
          // userInput,
        );
        const resError = response.data.error;
        const apiData = response.data.question;
        const status = response.data.status;

        setIsLoading(false);

        if (resError || resError !== undefined) {
          toast.error(resError);
        } else {
          // dispatch(setQuestionId({ questionId: 1 }));

          if (status === "true" || status == true) {
            if (Number(questionId) <= 5) {
              // jsCookie.set("commonQuestionId", String(questionId + 1));
              dispatch(
                setSession({
                  session_data: {
                    ...sessionDetail,
                    common_question_id: questionId + 1,
                  },
                }),
              );
            } else {
              // jsCookie.set("questionId", String(questionId + 1));
              dispatch(
                setSession({
                  session_data: {
                    ...sessionDetail,
                    question_id: questionId + 1,
                    step_id: activeStep - 1,
                  },
                }),
              );
            }
            //
            dispatch(
              setSession({
                session_data: {
                  ...sessionDetail,
                  step_id: activeStep - 1,
                },
              }),
            );
            changeActiveStep(activeStep - 1);
          } else {
            jsCookie.set("questionId", String(questionId));

            dispatch(setNoveltyAspect({ answer: apiData }));
            changeActiveStep(2);
            dispatch(
              setSession({
                session_data: {
                  ...sessionDetail,
                  step_id: 2,
                },
              }),
            );
          }
        }
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error || error.message);
      }
    },
    [activeStep, changeActiveStep, dispatch, questionId, sessionDetail, sessionId, userId],
  );

  return (
    <>
      <NewComponent
        isLoading={isloading}
        onContinue={onContinue}
        question={question.question}
        exampleAnswer={question.answer}
      />
    </>
  );
}
