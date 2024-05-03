import jsCookie from "js-cookie";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";

import { IAnswer } from "../../../../../@types/entities/IPLandscape";

import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";

import { setNoveltyAspect } from "../../../../../stores/IpSteps";
import axiosInstance from "../../../../../utils/axios";

import NewComponent from "../../new-comp";
import { setSession } from "../../../../../stores/session";

interface Props {
  changeActiveStep: (steps: number) => void;
  activeStep: number;
  exampleAnswer: string;
}

/**
 *
 */
export default function NewQuestion({ changeActiveStep, activeStep, exampleAnswer }: Props) {
  const dispatch = useAppDispatch();
  const [isloading, setIsLoading] = useState(false);
  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);

  const chatId = jsCookie.get("chatId");
  const questionId = Number(jsCookie.get("questionId"));

  useEffect(() => {
    jsCookie.set("chatId", chatId || "");
  }, [chatId]);

  const apiQuestion = useAppSelector((state) => state.ipData.novelty_aspect.answer) ?? "";

  //
  const [question, setQuestion] = useState("");
  //
  const userId = jsCookie.get("user_id");
  const sessionId = jsCookie.get("session_id");

  useEffect(() => {
    setQuestion(apiQuestion);
  }, [apiQuestion]);

  const onContinue = useCallback(
    async (value: IAnswer) => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.post(
          `https://pn-chatbot.azurewebsites.net/generate/?answer=${encodeURIComponent(
            value.answer,
          )}&userID=${userId}&sessionID=${Number(sessionId)}&QuestionID=${questionId}`,
        );
        const resError = response.data.error;
        const apiData = response.data.question;
        const status = response.data.status;

        if (resError || resError !== undefined) {
          toast.error(resError);
        } else {
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
                  },
                }),
              );
            }

            dispatch(
              setSession({
                session_data: {
                  ...sessionDetail,
                  step_id: activeStep + 1,
                },
              }),
            );

            changeActiveStep(activeStep + 1);
          } else {
            // jsCookie.set("chatId", chatId || "");
            // jsCookie.set("questionId", String(questionId));
            dispatch(setNoveltyAspect({ answer: apiData }));
            changeActiveStep(2);
          }
        }

        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error.message);
      }
    },
    [activeStep, changeActiveStep, dispatch, questionId, sessionDetail, sessionId, userId],
  );

  return (
    <NewComponent
      isLoading={isloading}
      onContinue={onContinue}
      question={question}
      exampleAnswer={exampleAnswer}
    />
  );
}
