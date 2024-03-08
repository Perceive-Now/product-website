import { useCallback, useState } from "react";
import { IAnswer } from "../../../../@types/entities/IPLandscape";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setPriorArtResearchfinding } from "../../../../stores/IpSteps";
import axiosInstance from "../../../../utils/axios";
import toast from "react-hot-toast";
import NewComponent from "./new-comp";

interface Props {
  changeActiveStep: (steps: number) => void;
}

export default function IPNewStep({ changeActiveStep }: Props) {
  const dispatch = useAppDispatch();
  // const [answer, setAnswer] = useState("");
  const question = useAppSelector((state) => state.ipData.novelty_aspect.answer) ?? "";
  const [isloading, setIsLoading] = useState(false);

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
          dispatch(setPriorArtResearchfinding({ answer: apiData }));
          changeActiveStep(4);
        } else {
          toast.error("null");
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

  return (
    <>
      <NewComponent isLoading={isloading} onContinue={onContinue} question={question} />
    </>
  );
}
