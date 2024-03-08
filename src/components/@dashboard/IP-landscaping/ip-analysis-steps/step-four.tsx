import { useCallback, useState } from "react";
import { IAnswer } from "../../../../@types/entities/IPLandscape";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setInventorIdentification } from "../../../../stores/IpSteps";
import axiosInstance from "../../../../utils/axios";
import toast from "react-hot-toast";
import NewComponent from "./new-comp";

interface Props {
  changeActiveStep: (steps: number) => void;
}

export default function IPNewStepFour({ changeActiveStep }: Props) {
  const [isloading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  // const [answer, setAnswer] = useState("");
  const question = useAppSelector((state) => state.ipData.technical_field_invention.answer) ?? "";
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
          dispatch(setInventorIdentification({ answer: apiData }));
          changeActiveStep(6);
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
