import jsCookie from "js-cookie";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";

import { IAnswer } from "../../../../../../@types/entities/IPLandscape";

import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux";

import { setNoveltyAspect } from "../../../../../../stores/IpSteps";
import axiosInstance from "../../../../../../utils/axios";

import NewComponent from "../../../new-comp";

interface Props {
  changeActiveStep: (steps: number) => void;
  activeStep: number;
  exampleAnswer: string;
}

export default function NewQuestion({ changeActiveStep, activeStep, exampleAnswer }: Props) {
  const dispatch = useAppDispatch();
  const [isloading, setIsLoading] = useState(false);

  const chatId = jsCookie.get("chatId");
  const questionId = Number(jsCookie.get("questionId"));

  useEffect(() => {
    jsCookie.set("chatId", chatId || "");
  }, [chatId]);

  const apiQuestion = useAppSelector((state) => state.ipData.novelty_aspect.answer) ?? "";

  //
  const [question, setQuestion] = useState("");

  const userId = jsCookie.get("user_id");
  // const sessionId = jsCookie.get("session_id");

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
          )}&userID=${userId}&sessionID=${Number(111111111)}&QuestionID=${questionId}`,
        );
        const resError = response.data.error;
        const apiData = response.data.question;
        const status = response.data.status;

        if (resError || resError !== undefined) {
          toast.error(resError);
        } else {
          if (status === "true" || status == true) {
            // if (questionId === 11) {
            //   changeActiveStep(14);
            // } else {
            //   jsCookie.set("questionId", String(questionId + 1));
            //   changeActiveStep(activeStep + 1);
            // }

            jsCookie.set("questionId", String(questionId + 1));
            changeActiveStep(activeStep + 1);

            // changeActiveStep(Number(chatId) + 1);
          } else {
            jsCookie.set("chatId", chatId || "");
            jsCookie.set("questionId", String(questionId));
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
    [activeStep, changeActiveStep, chatId, dispatch, questionId, userId],
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
