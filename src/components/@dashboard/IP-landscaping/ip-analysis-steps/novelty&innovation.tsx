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

interface Props {
  changeActiveStep: (steps: number) => void;
}

export default function IPNovelty({ changeActiveStep }: Props) {
  const dispatch = useAppDispatch();
  const answer = useAppSelector((state) => state.ipData.novelty_aspect.answer) ?? "";
  const [exampleText, setExampleText] = useState("");

  console.log(answer);

  const formResolver = yup.object().shape({
    answer: yup.string().required("Case is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      answer: answer,
    },
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });
  //
  const onContinue = useCallback(
    (value: IAnswer) => {
      dispatch(setNoveltyAspect(value));
      changeActiveStep(3);
    },
    [changeActiveStep, dispatch],
  );
  // State to store the text content

  const useExample = useCallback(() => {
    // Get the text content of the <p> element
    const pElement = document.getElementById("exampleText");
    if (pElement) {
      const pText = pElement.textContent;
      // Set the example text in state
      dispatch(setNoveltyAspect({ answer: pText || "" }));
      setExampleText(pText || "");
    }
  }, [dispatch]);

  return (
    <>
      <div className="space-y-2.5">
        {/* <KeywordSelected /> */}
        {/* <IPUseCase changeActiveStep={changeActiveStep} />
        <div className="py-0.5 px-1 bg-appGray-100 rounded-sm text-base text-secondary-800 ">
          Novelty and Innovation Aspects
        </div> */}
        <h4 className="text-gray-600 text-xl font-semibold">
          What is the full name of the company developing Smart sensor?
        </h4>
        <p id="exampleText" className="text-gray-600 text-sm">
          E.g. I'm aiming to assess the patentability of SkinCheck and identify potential areas
          where it might face challenges in terms of IP validity. My goal is to strengthen our
          patent application by preemptively addressing these areas, ensuring that our technology
          stands out in the competitive field of AI-driven healthcare solutions.
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
