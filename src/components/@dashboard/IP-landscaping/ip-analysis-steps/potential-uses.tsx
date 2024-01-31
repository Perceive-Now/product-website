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

export default function IPPotentialUses({ changeActiveStep }: Props) {
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
    changeActiveStep(7);
  }, [changeActiveStep]);
  return (
    <>
      <div className="space-y-2.5">
        <KeywordSelected />
        <div>
          <IPUseCase />
        </div>
        <div className="py-0.5 px-1 bg-appGray-100 rounded-sm text-base text-secondary-800 ">
          Potential Applications and Uses
        </div>
        <h4 className="text-gray-600 text-xl font-semibold">
          What are the potential applications or uses of the invention, including any industrial
          applications?
        </h4>
        <p className="text-gray-600 text-sm">
          E.g. The primary application of SkinCheck is early skin cancer detection, utilizing
          advanced AI to improve diagnostic accuracy for diverse skin tones. As a mobile health
          application, it offers the convenience of self-checks and monitoring, along with
          educational resources for users. Its potential for EHR/EMR integration could revolutionize
          dermatological record-keeping and patient monitoring in clinical settings. Beyond
          healthcare, SkinCheck's image analysis capabilities could be adapted for quality control
          in manufacturing, enhancing efficiency and reducing waste.
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
