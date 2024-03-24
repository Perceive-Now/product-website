import { useCallback, useEffect, useState } from "react";
import { IAnswer } from "../../../../../@types/entities/IPLandscape";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { setNoveltyAspect } from "../../../../../stores/IpSteps";
import axiosInstance from "../../../../../utils/axios";
import toast from "react-hot-toast";
import NewComponent from "../new-comp";
import { setQuestionId, setSixthChat } from "../../../../../stores/chat";
import jsCookie from "js-cookie";

interface Props {
  changeActiveStep: (steps: number) => void;
}

export default function ChatSixthQuestion({ changeActiveStep }: Props) {
  const dispatch = useAppDispatch();
  const [isloading, setIsLoading] = useState(false);
  jsCookie.set("chatId", String(8));

  const searchedKeywords = useAppSelector((state) => state.dashboard?.keywords) ?? [];
  //
  const keywords = searchedKeywords.map((kwd) => kwd);

  const defaultQuestion = `Can you explain why the features of the ${keywords} are considered non-obvious to someone skilled in the field?`;
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
          }&userID=${6}&sessionID=1111111111&QuestionID=${1}`,
          userInput,
        );
        const apiData = response.data.question;
        const status = response.data.status;

        dispatch(setQuestionId({ questionId: 6 }));
        jsCookie.set("questionId", String(6));

        if (status === "true" || status == true) {
          dispatch(
            setSixthChat({
              answer: value.answer,
              question: question,
              questionId: 6,
            }),
          );
          changeActiveStep(9);
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
