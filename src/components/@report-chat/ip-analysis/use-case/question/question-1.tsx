import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import jsCookie from "js-cookie";

import axiosInstance from "../../../../../utils/axios";

import { IAnswer } from "../../../../../@types/entities/IPLandscape";

import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";

import NewComponent from "../../new-comp";
import { setSession } from "../../../../../stores/session";
import { setChat } from "../../../../../stores/chat";

// import { addAnswer } from "../../../../../utils/api/chat";
// import { updateSession } from "../../../../../stores/session";
// import { addAnswer } from "../../../../../utils/api/chat";

interface Props {
  changeActiveStep: (steps: number) => void;
  activeStep: number;
  activeIndex: number;
  question: {
    question: string;
    questionId: number;
    usecase?: any;
    answer: string;
    // "all" | "ip-validity-analysis" | "ip-licensing-opportunity" | "ip-landscaping&fto" | "infringement-analysis"
  };
}

// interface IAnswers {
//   question_id: number;
//   session_id: number;
//   user_id: string;
//   answer: string;
// }

/**
 *
 */
export default function ChatQuestionAnswer({
  changeActiveStep,
  activeStep,
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
          )}&userID=${userId}&sessionID=${Number(sessionId)}&QuestionID=${questionId}`,
        );

        const apiData = response.data.question;
        const status = response.data.status;
        const resError = response.data.error;

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
                  step_id: activeStep + 1,
                  active_index: activeIndex + 1,
                },
              }),
            );
            changeActiveStep(activeStep + 1);
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
