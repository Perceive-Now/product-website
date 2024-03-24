// import KeywordSelected from "../KeywordSelected";
// import IPUseCase from "../components/use-case";

import { useCallback, useEffect, useState } from "react";
import { IAnswer } from "../../../../../@types/entities/IPLandscape";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { setNoveltyAspect } from "../../../../../stores/IpSteps";
import axiosInstance from "../../../../../utils/axios";
import toast from "react-hot-toast";
import NewComponent from "../new-comp";
import { setEleventhChat, setQuestionId } from "../../../../../stores/chat";
import jsCookie from "js-cookie";

interface Props {
  changeActiveStep: (steps: number) => void;
}

export default function ChatEleventhQuestion({ changeActiveStep }: Props) {
  const dispatch = useAppDispatch();
  const [isloading, setIsLoading] = useState(false);

  jsCookie.set("chatId", String(13));

  const searchedKeywords = useAppSelector((state) => state.dashboard?.keywords) ?? [];
  //
  const keywords = searchedKeywords.map((kwd) => kwd);

  const defaultQuestion = `Can you provide the exact claims that will be present in the patent application for your ${keywords}?`;

  const [question, setQuestion] = useState("");

  useEffect(() => {
    setQuestion(defaultQuestion);
  }, [defaultQuestion]);

  const onContinue = useCallback(
    async (value: IAnswer) => {
      setIsLoading(true);
      // const userInput = {
      //   message: {
      //     user_input: value.answer,
      //   },
      //   answeredQuestion: {
      //     user_input: question,
      //   },
      // };
      try {
        const response = await axiosInstance.post(
          `https://pn-chatbot.azurewebsites.net/generate/?answer=${
            value.answer
          }&userID=${1}&sessionID=1111111111&QuestionID=${11}`,
          // userInput,
        );
        const apiData = response.data.question;
        const status = response.data.status;

        dispatch(setQuestionId({ questionId: 11 }));
        jsCookie.set("questionId", String(11));

        if (status === "true" || status == true) {
          dispatch(
            setEleventhChat({
              answer: value.answer,
              question: question,
              questionId: 11,
            }),
          );
          changeActiveStep(14);
        } else {
          dispatch(setNoveltyAspect({ answer: apiData }));
          changeActiveStep(2);
        }
        setIsLoading(false);
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
