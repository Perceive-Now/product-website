// import KeywordSelected from "../KeywordSelected";
// import IPUseCase from "../components/use-case";

import { useCallback, useEffect, useState } from "react";
import { IAnswer } from "../../../../@types/entities/IPLandscape";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setNoveltyAspect } from "../../../../stores/IpSteps";
import axiosInstance from "../../../../utils/axios";
import toast from "react-hot-toast";
import NewComponent from "./new-comp";

interface Props {
  changeActiveStep: (steps: number) => void;
  addStep?: any;
}

export default function IPNovelty({ changeActiveStep }: Props) {
  const dispatch = useAppDispatch();
  const [isloading, setIsLoading] = useState(false);

  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];

  const apiQuestion = useAppSelector((state) => state.ipData.inventive_step.answer) ?? "";
  //
  const keywords = searchedKeywords.map((kwd) => kwd.value);

  const defaultQuestion = `What is the full name of the company developing the ${keywords}?`;

  const [question, setQuestion] = useState("");

  useEffect(() => {
    if (apiQuestion) {
      setQuestion(apiQuestion);
    }
    setQuestion(defaultQuestion);
  }, [apiQuestion, defaultQuestion]);

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

        if (status === true) {
          changeActiveStep(3);
        } else {
          dispatch(setNoveltyAspect({ answer: apiData }));
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
