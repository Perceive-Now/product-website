import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import jsCookie from "js-cookie";

import { IAnswer } from "../../../../../@types/entities/IPLandscape";

import axiosInstance from "../../../../../utils/axios";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";

import NewComponent from "../../new-comp";
import { setSession } from "../../../../../stores/session";
import { setChat } from "../../../../../stores/chat";

interface Props {
  changeActiveStep: (steps: number) => void;
  activeStep: number;
  activeIndex: number;
  question: {
    question: string;
    questionId: number;
    usecase?: any;
    answer: string;
  };
}

export default function ChatQuestionAnswer2({
  changeActiveStep,
  activeStep,
  question,
  activeIndex,
}: Props) {
  const dispatch = useAppDispatch();
  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);

  const [isloading, setIsLoading] = useState(false);
  const questionId = useMemo(() => question.questionId, [question.questionId]);

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
          if (status === "true" || status == true) {
            dispatch(
              setSession({
                session_data: {
                  ...sessionDetail,
                  question_id: questionId,
                  active_index: activeIndex + 1,
                  step_id: activeStep - 1,
                },
              }),
            );
            changeActiveStep(activeStep - 1);
          } else if (status === undefined) {
            toast.error("Something went wrong");
          } else {
            jsCookie.set("questionId", String(questionId));

            dispatch(setChat({ question: apiData }));
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
            changeActiveStep(8);
          }
        }
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error || error.message);
      }
    },
    [
      activeIndex,
      activeStep,
      changeActiveStep,
      dispatch,
      questionId,
      sessionDetail,
      sessionId,
      userId,
    ],
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
