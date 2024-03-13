// import KeywordSelected from "../KeywordSelected";
// import IPUseCase from "../components/use-case";

import { useCallback, useEffect, useState } from "react";
import { IAnswer } from "../../../../../@types/entities/IPLandscape";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { setNoveltyAspect } from "../../../../../stores/IpSteps";
import axiosInstance from "../../../../../utils/axios";
import toast from "react-hot-toast";
import NewComponent from "../new-comp";

interface Props {
  changeActiveStep: (steps: number) => void;
  addStep?: any;
}

export default function NewQuestion({ changeActiveStep }: Props) {
  const dispatch = useAppDispatch();
  const [isloading, setIsLoading] = useState(false);

  const apiQuestion = useAppSelector((state) => state.ipData.novelty_aspect.answer) ?? "";
  //
  const [question, setQuestion] = useState("");

  useEffect(() => {
    setQuestion(apiQuestion);
  }, [apiQuestion]);

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
          changeActiveStep(4);
        } else {
          dispatch(setNoveltyAspect({ answer: apiData }));
          changeActiveStep(33);
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
