import { useForm } from "react-hook-form";
import Button from "../../../reusable/button";
import KeywordSelected from "../KeywordSelected";
import IPUseCase from "../components/use-case";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";

import * as yup from "yup";
import { useCallback } from "react";
import { setPriorArtResearchfinding } from "../../../../stores/IpSteps";
import { IAnswer } from "../../../../@types/entities/IPLandscape";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

interface Props {
  changeActiveStep: (steps: number) => void;
}

export default function IPPriorArt({ changeActiveStep }: Props) {
  const dispatch = useAppDispatch();
  const answer = useAppSelector((state) => state.ipData.prior_art_research.answer) ?? "";

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
      dispatch(setPriorArtResearchfinding(value));
      changeActiveStep(4);
    },
    [changeActiveStep, dispatch],
  );

  return (
    <>
      <div className="space-y-2.5">
        <KeywordSelected />
        <IPUseCase changeActiveStep={changeActiveStep} />
        <div className="py-0.5 px-1 bg-appGray-100 rounded-sm text-base text-secondary-800 ">
          Prior Art Research Findings
        </div>
        <h4 className="text-gray-600 text-xl font-semibold">
          Have you conducted any prior art research, and what were the findings?
        </h4>
        <p className="text-gray-600 text-sm">
          E.g. Prior to the extensive research at Georgia State University, Julian Abhari conducted
          a year of undergraduate research at the University of Tulsa. This research, which also
          received NSF backing, focused on exploring existing skin cancer detection methods and
          identifying their limitations, particularly in terms of racial bias and dataset
          representation. The findings highlighted a significant gap in the existing technology,
          particularly in the equitable representation of diverse skin tones, which directly
          influenced the development of SkinCheck.
        </p>
        <Button
          type="secondary"
          size="small"
          rounded="medium"
          classname="px-0.5 py-[6px] text-xs font-semibold"
        >
          Use this example
        </Button>
      </div>
      <form onSubmit={handleSubmit(onContinue)} className="mt-13">
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
