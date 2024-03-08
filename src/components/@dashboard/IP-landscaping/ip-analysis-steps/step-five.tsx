// import KeywordSelected from "../KeywordSelected";
// import IPUseCase from "../components/use-case";

import { useCallback, useState } from "react";
import { IAnswer } from "../../../../@types/entities/IPLandscape";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setPotentialApplication } from "../../../../stores/IpSteps";
import axiosInstance from "../../../../utils/axios";
import toast from "react-hot-toast";
import NewComponent from "./new-comp";

interface Props {
  changeActiveStep: (steps: number) => void;
}

export default function IPNewStepFive({ changeActiveStep }: Props) {
  const dispatch = useAppDispatch();
  const [isloading, setIsLoading] = useState(false);
  // const [answer, setAnswer] = useState("");
  const question = useAppSelector((state) => state.ipData.inventor_identification.answer) ?? "";

  //

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
        // console.log(response.data.question);
        const apiData = response.data.question;
        setIsLoading(false);

        if (apiData !== null && apiData.length > 0) {
          dispatch(setPotentialApplication({ answer: apiData }));
          changeActiveStep(7);
        } else {
          toast.error(null);
        }

        // return response.data.data;
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error.message);
        // console.log(error);
      }
    },
    [changeActiveStep, dispatch, question],
  );

  return <NewComponent isLoading={isloading} onContinue={onContinue} question={question} />;
}
