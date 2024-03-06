import { useForm } from "react-hook-form";
import Button from "../../../reusable/button";
// import KeywordSelected from "../KeywordSelected";
// import IPUseCase from "../components/use-case";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";

import * as yup from "yup";
import { useCallback, useState } from "react";
import { IAnswer } from "../../../../@types/entities/IPLandscape";
import { useAppDispatch } from "../../../../hooks/redux";
import { setNoveltyAspect } from "../../../../stores/IpSteps";
import axiosInstance from "../../../../utils/axios";
import toast from "react-hot-toast";
import Loading from "../../../reusable/loading";

interface Props {
  changeActiveStep: (steps: number) => void;
}

export default function IPNovelty({ changeActiveStep }: Props) {
  const example = "The company behind Smart sensor is 'DermAI Tech Inc.'";

  const [exampleAnswer, setExampleAnswer] = useState("");

  const dispatch = useAppDispatch();
  const [isloading, setIsLoading] = useState(false);
  // const answer = useAppSelector((state) => state.ipData.novelty_aspect.answer) ?? "";

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
      setIsLoading(true);
      const userInput = {
        message: {
          user_input: value.answer,
        },
        answeredQuestion: {
          user_input: "What is the full name of the company developing Smart sensor?",
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
        } else {
          toast.error("null");
        }
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error.message);
      }
    },
    [changeActiveStep, dispatch],
  );

  const useExample = useCallback(() => {
    setValue("answer", example); // Set the value of the 'answer' field to the example text
  }, [setValue]);

  return (
    <>
      <Loading isLoading={isloading} />
      <div className="space-y-2.5">
        <h4 className="text-gray-600 text-xl font-semibold">
          What is the full name of the company developing Smart sensor?
        </h4>
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
