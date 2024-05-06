import jsCookie from "js-cookie";
import toast from "react-hot-toast";
import { useCallback, useMemo, useState } from "react";

import { IAnswer } from "../../../../../@types/entities/IPLandscape";

import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";

import axiosInstance from "../../../../../utils/axios";

import NewComponent from "../../new-comp";
import { setChat } from "../../../../../stores/chat";
import { setSession } from "../../../../../stores/session";

interface Props {
  changeActiveStep: (steps: number) => void;
  // activeStep: number;
  exampleAnswer?: string;
}

/**NewQuestion
 *
 */

export default function EditQuestion({ changeActiveStep }: Props) {
  const dispatch = useAppDispatch();
  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);
  //
  const userId = jsCookie.get("user_id");
  const sessionId = jsCookie.get("session_id");

  const [isloading, setIsLoading] = useState(false);

  //
  const answer = useMemo(
    () => sessionDetail?.user_chat?.answer,
    [sessionDetail?.user_chat?.answer],
  );
  const exampleAnswer = useMemo(
    () => sessionDetail?.user_chat?.example_answer,
    [sessionDetail?.user_chat?.example_answer],
  );
  const question = useMemo(
    () => sessionDetail?.user_chat?.question,
    [sessionDetail?.user_chat?.question],
  );
  const questionId = useMemo(
    () => sessionDetail?.user_chat?.question_id,
    [sessionDetail?.user_chat?.question_id],
  );

  const onContinue = useCallback(
    async (value: IAnswer) => {
      setIsLoading(true);

      try {
        const response = await axiosInstance.post(
          `https://pn-chatbot.azurewebsites.net/generate/?answer=${encodeURIComponent(
            value.answer,
          )}&userID=${userId}&sessionID=${Number(sessionId)}&QuestionID=${Number(questionId)}`,
        );
        const resError = response.data.error;
        const apiData = response.data.question;
        const status = response.data.status;

        if (resError || resError !== undefined) {
          toast.error(resError);
        } else {
          if (status === "true" || status == true) {
            dispatch(
              setSession({
                session_data: {
                  ...sessionDetail,
                  step_id: 6,
                },
              }),
            );
            changeActiveStep(6);
          } else {
            dispatch(
              setSession({
                session_data: {
                  ...sessionDetail,
                  step_id: 2,
                },
              }),
            );
            dispatch(setChat({ question: apiData }));
            changeActiveStep(2);
          }
        }
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error.message);
      }
    },
    [changeActiveStep, dispatch, questionId, sessionDetail, sessionId, userId],
  );

  return (
    <>
      {question && exampleAnswer && answer && (
        <NewComponent
          isLoading={isloading}
          onContinue={onContinue}
          question={question}
          exampleAnswer={exampleAnswer}
          answer={answer}
        />
      )}
    </>
  );
}
