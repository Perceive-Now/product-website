// import KeywordSelected from "../KeywordSelected";
// import IPUseCase from "../components/use-case";

import { useCallback, useEffect, useState } from "react";
import { IAnswer } from "../../../../../@types/entities/IPLandscape";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { setNoveltyAspect } from "../../../../../stores/IpSteps";
import axiosInstance from "../../../../../utils/axios";
import toast from "react-hot-toast";
import NewComponent from "../new-comp";
import { setFirstChat, setQuestionId } from "../../../../../stores/chat";
import jsCookie from "js-cookie";

interface Props {
  changeActiveStep: (steps: number) => void;
}

export default function ChatFirstQuestion({ changeActiveStep }: Props) {
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
      const userInput = {
        answer: value.answer,
        QuestionID: 1,
        userID: 1,
        sessionID: 11111,
      };
      try {
        const response = await axiosInstance.post(
          `https://pn-chatbot.azurewebsites.net/generate/?answer=${
            value.answer
          }&userID=${1}&sessionID=1111111111&QuestionID=${1}`,
          userInput,
        );

        const apiData = response.data.question;
        const status = response.data.status;

        setIsLoading(false);

        dispatch(setQuestionId({ questionId: 1 }));
        jsCookie.set("questionId", String(1));

        if (status === "false" || status == false) {
          dispatch(setNoveltyAspect({ answer: apiData }));
          changeActiveStep(2);
        } else {
          dispatch(
            setFirstChat({
              answer: value.answer,
              question: question,
              questionId: 1,
            }),
          );
          changeActiveStep(4);
        }
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error.message);
      }
    },
    [changeActiveStep, dispatch, question],
  );

  return (
    <>
      <NewComponent isLoading={isloading} onContinue={onContinue} question={question} />
    </>
  );
}
