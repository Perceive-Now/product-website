import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import jsCookie from "js-cookie";

import axiosInstance from "../../../../../utils/axios";

import { IAnswer } from "../../../../../@types/entities/IPLandscape";

import { useAppDispatch } from "../../../../../hooks/redux";

import { setQuestionId } from "../../../../../stores/chat";
import { setNoveltyAspect } from "../../../../../stores/IpSteps";

import NewComponent from "../../new-comp";
import { addAnswer } from "../../../../../utils/api/chat";
// import { addAnswer } from "../../../../../utils/api/chat";

interface Props {
  changeActiveStep: (steps: number) => void;
  activeStep: number;
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
}: // questionId,
Props) {
  const dispatch = useAppDispatch();
  // jsCookie.set("chatId", String(3));

  const [isloading, setIsLoading] = useState(false);
  // const [answers, setAnswers] = useState<IAnswers[]>([]);

  const questionId = question.questionId;

  const userId = jsCookie.get("user_id");
  // const sessionId = jsCookie.get("session_id");

  const onContinue = useCallback(
    async (value: IAnswer) => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.post(
          `https://pn-chatbot.azurewebsites.net/generate/?answer=${encodeURIComponent(
            value.answer,
          )}&userID=${userId}&sessionID=${Number(111111111)}&QuestionID=${questionId}`,
          // userInput,
        );

        const apiData = response.data.question;
        const status = response.data.status;
        const resError = response.data.error;

        setIsLoading(false);
        dispatch(setQuestionId({ questionId: 1 }));

        if (resError || resError !== undefined) {
          toast.error(resError);
        } else {
          if (status === "true" || status == true) {
            // jsCookie.set("questionId", String(questionId + 1));

            const updateAnswer = {
              question_id: String(questionId) || "1",
              session_id: "111111111",
              user_id: userId || "",
              answer: value.answer || "",
            };

            addAnswer(updateAnswer); // Send updated answers to the API
            if (Number(questionId) <= 5) {
              jsCookie.set("commonQuestionId", String(questionId + 1));
            } else {
              jsCookie.set("questionId", String(questionId + 1));
            }

            // jsCookie.set("questionId", String(questionId + 1));
            changeActiveStep(activeStep + 1);
            //
            // if (questionId === 11) {
            //   changeActiveStep(14);
            // } else {
            //   jsCookie.set("questionId", String(questionId + 1));
            //   changeActiveStep(activeStep + 1);
            // }
          } else {
            jsCookie.set("questionId", String(questionId));
            dispatch(setNoveltyAspect({ answer: apiData }));
            changeActiveStep(2);
          }
        }
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error || error.message);
      }
    },
    [activeStep, changeActiveStep, dispatch, questionId, userId],
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
