import { useForm } from "react-hook-form";
import Button from "../../../reusable/button";
import KeywordSelected from "../KeywordSelected";
import IPUseCase from "../components/use-case";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";

import * as yup from "yup";
import { useCallback } from "react";
import { IAnswer } from "../../../../@types/entities/IPLandscape";
import { setInventiveStep } from "../../../../stores/IpSteps";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

interface Props {
  changeActiveStep: (steps: number) => void;
}

export default function IPInventiveSteps({ changeActiveStep }: Props) {
  const dispatch = useAppDispatch();
  const answer = useAppSelector((state) => state.ipData.inventive_step.answer) ?? "";

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
      dispatch(setInventiveStep(value));
      changeActiveStep(9);
    },
    [changeActiveStep, dispatch],
  );

  return (
    <>
      <div className="space-y-2.5">
        <KeywordSelected />
        <IPUseCase changeActiveStep={changeActiveStep} />
        <div className="py-0.5 px-1 bg-appGray-100 rounded-sm text-base text-secondary-800 ">
          Inventive Step or Non-Obviousness Discussion
        </div>
        <h4 className="text-gray-600 text-xl font-semibold">
          Can you discuss the inventive step or non-obviousness of your invention?
        </h4>
        <p className="text-gray-600 text-sm">
          E.g. SkinCheck's inventive step lies in its unique approach to addressing racial bias in
          skin cancer detection. Unlike existing tools that rely on limited datasets, SkinCheck uses
          CycleGANs for effective domain adaptation, ensuring inclusivity and accuracy across
          different skin tones. The integration of these AI algorithms into a user-friendly mobile
          platform is a non-obvious leap, making advanced healthcare technology accessible to the
          general public. Furthermore, our focus on remote patient monitoring and telehealth
          connectivity introduces a novel method of healthcare delivery, especially in dermatology.
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
