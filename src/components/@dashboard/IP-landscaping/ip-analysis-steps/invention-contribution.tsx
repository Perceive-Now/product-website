import { useForm } from "react-hook-form";
import Button from "../../../reusable/button";
import KeywordSelected from "../KeywordSelected";
import IPUseCase from "../components/use-case";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";

import * as yup from "yup";
import { useCallback } from "react";

interface Props {
  changeActiveStep: (steps: number) => void;
}

export default function IPInventionContribution({ changeActiveStep }: Props) {
  const formResolver = yup.object().shape({
    description: yup.string().required("Case is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    // defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });
  const onContinue = useCallback(() => {
    changeActiveStep(6);
  }, [changeActiveStep]);
  return (
    <>
      <div className="space-y-2.5">
        <KeywordSelected />
        <div>
          <IPUseCase />
        </div>
        <div className="py-0.5 px-1 bg-appGray-100 rounded-sm text-base text-secondary-800 ">
          Identification of Inventors and Contributions
        </div>
        <h4 className="text-gray-600 text-xl font-semibold">
          Who are the inventors, and what are their contributions to SkinCheck?
        </h4>
        <p className="text-gray-600 text-sm">
          E.g. Julian Abhari, the founder of SkinCheck, is the driving force behind this innovation.
          His contributions span from initial research and problem identification to the development
          of the CycleGAN model and its integration with skin cancer classification algorithms.
          Julian also played a critical role in the mobile application development and spearheaded
          the effort to publish peer-reviewed research on this topic.
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
                {...register("description")}
                className={classNames(
                  "appearance-none w-full px-2 py-[10px] bg-gray-100 border-1 rounded-md placeholder:text-gray-400 focus:ring-0.5",
                  errors.description
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
