// import KeywordSelected from "../KeywordSelected";
// import IPUseCase from "../components/use-case";

import { useCallback, useEffect, useState } from "react";
import { IAnswer } from "../../../../../@types/entities/IPLandscape";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { setNoveltyAspect } from "../../../../../stores/IpSteps";
import axiosInstance from "../../../../../utils/axios";
import toast from "react-hot-toast";
import jsCookie from "js-cookie";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import classNames from "classnames";
import Loading from "../../../../reusable/loading";
import { useForm } from "react-hook-form";
import Button from "../../../../reusable/button";

interface Props {
  changeActiveStep: (steps: number) => void;
  addStep?: any;
}

export default function NewQuestion({ changeActiveStep }: Props) {
  const dispatch = useAppDispatch();
  const [isloading, setIsLoading] = useState(false);

  const chatId = jsCookie.get("chatId");
  const questionId = jsCookie.get("questionId");

  useEffect(() => {
    jsCookie.set("chatId", chatId || "");
  }, [chatId]);

  const apiQuestion = useAppSelector((state) => state.ipData.novelty_aspect.answer) ?? "";

  //
  const [question, setQuestion] = useState("");

  useEffect(() => {
    setQuestion(apiQuestion);
  }, [apiQuestion]);

  const formResolver = yup.object().shape({
    answer: yup.string().required("Please provide your answer"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    // setValue,
  } = useForm({
    defaultValues: {
      answer: "",
    },
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });

  const onContinue = useCallback(
    async (value: IAnswer) => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.post(
          `https://pn-chatbot.azurewebsites.net/generate/?answer=${
            value.answer
          }&userID=${3}&sessionID=1111111111&QuestionID=${questionId}`,
          // userInput,
        );

        const apiData = response.data.question;
        const status = response.data.status;

        if (status === "true" || status == true) {
          changeActiveStep(Number(chatId) + 1);
        } else {
          jsCookie.set("chatId", chatId || "");

          dispatch(setNoveltyAspect({ answer: apiData }));
          changeActiveStep(2);
        }

        setIsLoading(false);
        reset();
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error.message);
      }
    },
    [changeActiveStep, chatId, dispatch, questionId, reset],
  );

  return (
    <>
      <Loading isLoading={isloading} />
      <div className="space-y-2.5">
        <h4 className="text-gray-600 text-xl font-semibold">{question}</h4>
        {/* <p id="exampleText" className="text-gray-600 text-sm">
          Eg. {example}
        </p>
        <Button
          type="secondary"
          size="small"
          rounded="medium"
          classname="px-0.5 py-[6px] text-xs font-semibold"
          handleClick={useExample}
        >
          Use this example
        </Button> */}
      </div>
      <form onSubmit={handleSubmit(onContinue)} className="mt-5">
        <fieldset className="mt-3">
          <label className=" text-sm font-medium leading-5 text-gray-700">
            {/* Technology / Sector Description* */}
            <div className="mt-0.5 rounded-md shadow-sm">
              <textarea
                rows={5}
                // onChange={handleChange}
                // value={answer}
                {...register("answer")}
                className={classNames(
                  "appearance-none w-full px-2 py-[10px] bg-gray-100 border-1 rounded-md placeholder:text-gray-400 focus:ring-0.5 min-h-[160px] pn_scroller",
                  errors.answer
                    ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                    : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                )}
                placeholder="Please provide your answer here."
              />
            </div>
          </label>
          {errors.answer?.message && (
            <div className="text-xs text-danger-500">{errors.answer?.message}</div>
          )}
        </fieldset>
        <div className="mt-4 pb-4">
          <Button htmlType={"submit"} rounded={"large"}>
            Continue
          </Button>
        </div>
      </form>
    </>
  );
}
