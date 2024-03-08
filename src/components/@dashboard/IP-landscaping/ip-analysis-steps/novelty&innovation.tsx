// import KeywordSelected from "../KeywordSelected";
// import IPUseCase from "../components/use-case";

import { useCallback, useState } from "react";
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

export default function IPNovelty({ changeActiveStep, addStep }: Props) {
  const dispatch = useAppDispatch();
  const [isloading, setIsLoading] = useState(false);
  const question = useAppSelector((state) => state.ipData.inventive_step.answer) ?? "";

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
        setIsLoading(false);
        if (apiData !== null && apiData.length > 0) {
          dispatch(setNoveltyAspect({ answer: apiData }));
          changeActiveStep(3);
          // addStep({
          //   label: "",
          //   value: 2,
          //   component:
          //     <NewComponent
          //       isLoading={isloading}
          //       onContinue={onContinue}
          //       question={question}
          //     />,
          // })
        } else {
          toast.error("null");
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
