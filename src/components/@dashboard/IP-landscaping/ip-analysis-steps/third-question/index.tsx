import { useCallback, useEffect, useState } from "react";
import { IAnswer } from "../../../../../@types/entities/IPLandscape";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { setNoveltyAspect } from "../../../../../stores/IpSteps";
import axiosInstance from "../../../../../utils/axios";
import toast from "react-hot-toast";
import NewComponent from "../new-comp";
import { setQuestionId, setThirdChat } from "../../../../../stores/chat";
import jsCookie from "js-cookie";

interface Props {
  changeActiveStep: (steps: number) => void;
}

export default function ChatThirdQuestion({ changeActiveStep }: Props) {
  const dispatch = useAppDispatch();
  const [isloading, setIsLoading] = useState(false);

  jsCookie.set("chatId", String(5));

  const searchedKeywords = useAppSelector((state) => state.dashboard?.keywords) ?? [];
  //
  const keywords = searchedKeywords.map((kwd) => kwd);

  const defaultQuestion = `Describe the technical aspects and unique features of the ${keywords}?`;

  const [question, setQuestion] = useState("");

  useEffect(() => {
    setQuestion(defaultQuestion);
  }, [defaultQuestion]);

  const onContinue = useCallback(
    async (value: IAnswer) => {
      setIsLoading(true);
      const userInput = {
        message: {
          user_input: value.answer,
        },
        answeredQuestion: {
          user_input: question,
        },
      };
      try {
        const response = await axiosInstance.post(
          `https://pn-chatbot.azurewebsites.net/generate/?answer=${
            value.answer
          }&userID=${3}&sessionID=1111111111&QuestionID=${1}`,
          userInput,
        );
        const apiData = response.data.question;
        const status = response.data.status;

        dispatch(setQuestionId({ questionId: 3 }));
        jsCookie.set("questionId", String(3));

        if (status === "true" || status == true) {
          dispatch(
            setThirdChat({
              answer: value.answer,
              question: question,
              questionId: 3,
            }),
          );
          changeActiveStep(6);
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
