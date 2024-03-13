import { useCallback, useEffect, useState } from "react";
import { IAnswer } from "../../../../../@types/entities/IPLandscape";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { setNoveltyAspect } from "../../../../../stores/IpSteps";
import axiosInstance from "../../../../../utils/axios";
import toast from "react-hot-toast";
import NewComponent from "../new-comp";
import { setSixthChat } from "../../../../../stores/chat";

interface Props {
  changeActiveStep: (steps: number) => void;
}

export default function ChatSixthQuestion({ changeActiveStep }: Props) {
  const dispatch = useAppDispatch();
  const [isloading, setIsLoading] = useState(false);

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
          `https://pn-chatbot.azurewebsites.net/generate/`,
          userInput,
        );
        const apiData = response.data.question;
        const status = response.data.status;

        if (status === "true" || status == true) {
          dispatch(
            setSixthChat({
              answer: value.answer,
              question: question,
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
