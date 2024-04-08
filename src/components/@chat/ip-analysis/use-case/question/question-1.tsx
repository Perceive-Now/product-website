import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import jsCookie from "js-cookie";

import axiosInstance from "../../../../../utils/axios";

import { IAnswer } from "../../../../../@types/entities/IPLandscape";

import { useAppDispatch } from "../../../../../hooks/redux";

import { setFirstChat, setQuestionId } from "../../../../../stores/chat";
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
  const questionId = question.questionId;

  // const useCases = useAppSelector((state) => state.usecase.usecases) ?? [];
  // console.log(useCases)

  // const useCase = useCases.find((u) => u === question.usecase)

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

        const apiData = response.data.question;
        const status = response.data.status;
        const resError = response.data.error;

        setIsLoading(false);
        dispatch(setQuestionId({ questionId: 1 }));

        if (resError || resError !== undefined) {
          toast.error(resError);
        } else {
          if (status === "true" || status == true) {
            jsCookie.set("questionId", String(questionId + 1));

            dispatch(
              setFirstChat({
                answer: value.answer,
                question: question.question,
                questionId: 1,
              }),
            );

            jsCookie.set("questionId", String(questionId + 1));
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
    [activeStep, changeActiveStep, dispatch, question.question, questionId],
  );

  return (
    <>
      <NewComponent isLoading={isloading} onContinue={onContinue} question={question.question} />
    </>
  );
}
