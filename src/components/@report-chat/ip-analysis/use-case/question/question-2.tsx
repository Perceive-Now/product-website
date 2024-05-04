import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import jsCookie from "js-cookie";

import { IAnswer } from "../../../../../@types/entities/IPLandscape";

import axiosInstance from "../../../../../utils/axios";
import { useAppDispatch } from "../../../../../hooks/redux";

import NewComponent from "../../new-comp";
import { addAnswer } from "../../../../../utils/api/chat";
import { setChat } from "../../../../../stores/chat";

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
            const updateAnswer = {
              question_id: String(questionId) || "",
              session_id: sessionId || "",
              user_id: userId || "",
              answer: value.answer || "",
            };

            addAnswer(updateAnswer); // Send updated answers to the API

            if (Number(questionId) <= 5) {
              jsCookie.set("commonQuestionId", String(questionId + 1));
            } else {
              jsCookie.set("questionId", String(questionId + 1));
            }
            changeActiveStep(activeStep - 1);
          } else {
            jsCookie.set("questionId", String(questionId));
            dispatch(setChat({ question: apiData }));
            changeActiveStep(2);
          }
        }
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error || error.message);
      }
    },
    [activeStep, changeActiveStep, dispatch, questionId, sessionId, userId],
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
