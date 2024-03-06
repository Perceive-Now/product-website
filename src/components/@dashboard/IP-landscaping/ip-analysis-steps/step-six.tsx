import { useForm } from "react-hook-form";
import Button from "../../../reusable/button";
// import KeywordSelected from "../KeywordSelected";
// import IPUseCase from "../components/use-case";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";

import * as yup from "yup";
import { useCallback, useState } from "react";
import { IAnswer } from "../../../../@types/entities/IPLandscape";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setNoveltyAspect } from "../../../../stores/IpSteps";
import axiosInstance from "../../../../utils/axios";
import toast from "react-hot-toast";

interface Props {
  changeActiveStep: (steps: number) => void;
}

export default function IPNewStepSix({ changeActiveStep }: Props) {
  const dispatch = useAppDispatch();

  const example =
    "The company behind Smart sensor is 'DermAI Tech Inc.' We specialize in developing advanced AI-driven solutions for dermatological applications. Our focus is on leveraging cutting-edge technology to improve skin health and diagnostics, and Smart sensor is our flagship product.";

  const answer = useAppSelector((state) => state.ipData.potential_application.answer) ?? "";

  const formResolver = yup.object().shape({
    answer: yup.string().required("Case is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      answer: "",
    },
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });
  //

  const onContinue = useCallback(
    async (value: IAnswer) => {
      const userInput = {
        message: {
          user_input: value.answer,
        },
        answeredQuestion: {
          user_input: answer,
        },
      };
      try {
        const response = await axiosInstance.post(
          `https://pn-chatbot.azurewebsites.net/generate/`,
          userInput,
        );
        // console.log(response.data.question);
        const apiData = response.data.question;

        if (apiData !== null && apiData.length > 0) {
          dispatch(setNoveltyAspect({ answer: apiData }));
          changeActiveStep(8);
        } else {
          toast.error(null);
        }

        // return response.data.data;
      } catch (error: any) {
        toast.error(error.message);
        // console.log(error);
      }
    },
    [answer, changeActiveStep, dispatch],
  );

  const useExample = useCallback(() => {
    setValue("answer", example);
  }, [setValue]);

  return (
    <>
      <div className="space-y-2.5">
        <h4 className="text-gray-600 text-xl font-semibold">{answer}</h4>
        <p id="exampleText" className="text-gray-600 text-sm">
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
        </Button>
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
                  "appearance-none w-full px-2 py-[10px] bg-gray-100 border-1 rounded-md placeholder:text-gray-400 focus:ring-0.5",
                  errors.answer
                    ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                    : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                )}
                placeholder="Please provide your answer here."
              />
            </div>
          </label>
          {/* {errors.description?.message && (
            <div className="mt-1 text-xs text-danger-500">{errors.description?.message}</div>
          )} */}
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
