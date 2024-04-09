import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import jsCookie from "js-cookie";

import axiosInstance from "../../../../../../utils/axios";

import { IAnswer } from "../../../../../../@types/entities/IPLandscape";

import { setNoveltyAspect } from "../../../../../../stores/IpSteps";
import { setFirstChat, setQuestionId } from "../../../../../../stores/chat";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux";
import NewComponent from "../../../new-comp";

interface Props {
  changeActiveStep: (steps: number) => void;
  activeStep: number;
}

export default function ChatFirstQuestion({ changeActiveStep, activeStep }: Props) {
  const dispatch = useAppDispatch();
  const [isloading, setIsLoading] = useState(false);

  jsCookie.set("chatId", String(3));

  const searchedKeywords = useAppSelector((state) => state.dashboard?.keywords) ?? [];
  //
  const keywords = searchedKeywords.map((kwd) => kwd);

  const defaultQuestion = `What is the full name of the company developing the ${keywords}?`;

  const [question, setQuestion] = useState("");

  useEffect(() => {
    setQuestion(defaultQuestion);
  }, [defaultQuestion]);

  const onContinue = useCallback(
    async (value: IAnswer) => {
      setIsLoading(true);

      try {
        const response = await axiosInstance.post(
          `https://pn-chatbot.azurewebsites.net/generate/?answer=${
            value.answer
          }&userID=${1}&sessionID=1111111111&QuestionID=${1}`,
          // userInput,
        );

        const apiData = response.data.question;
        const status = response.data.status;

        setIsLoading(false);

        dispatch(setQuestionId({ questionId: 1 }));
        jsCookie.set("questionId", String(1));

        if (status === "true" || status == true) {
          dispatch(
            setFirstChat({
              answer: value.answer,
              question: question,
              questionId: 1,
            }),
          );
          changeActiveStep(activeStep + 1);
        } else {
          dispatch(setNoveltyAspect({ answer: apiData }));
          changeActiveStep(2);
        }
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error.message);
      }
    },
    [activeStep, changeActiveStep, dispatch, question],
  );

  return (
    <>
      <NewComponent isLoading={isloading} onContinue={onContinue} question={question} />
    </>
  );
}
