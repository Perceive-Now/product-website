import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import jsCookie from "js-cookie";

import { IAnswer } from "../../../../../@types/entities/IPLandscape";

import axiosInstance from "../../../../../utils/axios";
import { useAppDispatch } from "../../../../../hooks/redux";
import { setFirstChat } from "../../../../../stores/chat";
import { setNoveltyAspect } from "../../../../../stores/IpSteps";

import NewComponent from "../../new-comp";

interface Props {
  changeActiveStep: (steps: number) => void;
  activeStep: number;
  question: {
    question: string;
    questionId: number;
    usecase?: any;
    // "all" | "ip-validity-analysis" | "ip-licensing-opportunity" | "ip-landscaping&fto" | "infringement-analysis"
  };
}

export default function ChatQuestionAnswer2({ changeActiveStep, activeStep, question }: Props) {
  const dispatch = useAppDispatch();
  const [isloading, setIsLoading] = useState(false);
  const questionId = question.questionId;

  // jsCookie.set("chatId", String(3));

  const onContinue = useCallback(
    async (value: IAnswer) => {
      setIsLoading(true);

      try {
        const response = await axiosInstance.post(
          `https://pn-chatbot.azurewebsites.net/generate/?answer=${
            value.answer
          }&userID=${1}&sessionID=1111111111&QuestionID=${questionId}`,
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
            dispatch(
              setFirstChat({
                answer: value.answer,
                question: question.question,
                questionId: 1,
              }),
            );

            if (questionId === 11) {
              changeActiveStep(14);
            } else {
              jsCookie.set("questionId", String(questionId + 1));
              changeActiveStep(activeStep - 1);
            }
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
    [activeStep, changeActiveStep, dispatch, question, questionId],
  );

  return (
    <>
      <NewComponent isLoading={isloading} onContinue={onContinue} question={question.question} />
    </>
  );
}
