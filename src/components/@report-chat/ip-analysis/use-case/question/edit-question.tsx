import jsCookie from "js-cookie";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";

import { IAnswer } from "../../../../../@types/entities/IPLandscape";

import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";

import axiosInstance from "../../../../../utils/axios";

import NewComponent from "../../new-comp";
import { setChat } from "../../../../../stores/chat";
interface Props {
  changeActiveStep: (steps: number) => void;
  // activeStep: number;
  exampleAnswer: string;
}

/**NewQuestion
 *
 */

export default function EditQuestion({ changeActiveStep, exampleAnswer }: Props) {
  const dispatch = useAppDispatch();
  const chatDetail = useAppSelector((state) => state.chat.chat);

  const [isloading, setIsLoading] = useState(false);

  const chatId = jsCookie.get("chatId");
  const questionId = Number(jsCookie.get("questionId"));

  useEffect(() => {
    jsCookie.set("chatId", chatId || "");
  }, [chatId]);

  const apiQuestion = useAppSelector((state) => state.chat.chat.question) ?? "";

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
            jsCookie.set("questionId", String(questionId + 1));
            changeActiveStep(6);
          } else {
            jsCookie.set("chatId", chatId || "");
            jsCookie.set("questionId", String(questionId));
            dispatch(setChat({ question: apiData }));
            changeActiveStep(2);
          }
        }

        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error.message);
      }
    },
    [changeActiveStep, chatId, dispatch, questionId, sessionId, userId],
  );

  return (
    <NewComponent
      isLoading={isloading}
      onContinue={onContinue}
      question={question}
      exampleAnswer={exampleAnswer}
      answer={chatDetail.answer}
    />
  );
}
