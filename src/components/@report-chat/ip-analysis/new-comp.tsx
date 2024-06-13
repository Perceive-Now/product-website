import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";

import * as yup from "yup";
import Button from "../../reusable/button";
import { useCallback, useEffect } from "react";

interface Props {
  onContinue: any;
  question: string;
  exampleAnswer: string;
  isLoading: boolean;
  answer?: string;
  onSkip?: any;
  hasSkippedQuestion?: boolean;
  showSkip?: boolean;
}

export default function NewComponent({
  onContinue,
  question,
  isLoading,
  exampleAnswer,
  answer,
  onSkip,
  hasSkippedQuestion,
  showSkip = true,
}: Props) {
  const formResolver = yup.object().shape({
    answer: yup.string().trim().required("Please provide your answer"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      answer: answer,
    },
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });
  //
  const useExample = useCallback(() => {
    setValue("answer", exampleAnswer); // Update the form value
  }, [exampleAnswer, setValue]);

  useEffect(() => {
    if (!isLoading) {
      reset();
    }
  }, [isLoading, reset]);

  const formattedAnswer = exampleAnswer.replace(/\n/g, "<br>");

  return (
    <div className="">
      {/* <Loading isLoading={isLoading} /> */}
      <div className="space-y-2.5">
        <h4
          className="text-primary-900 text-xl font-semibold"
          dangerouslySetInnerHTML={{ __html: `${question}` }}
        />
        <p
          id="exampleText"
          className="text-gray-600 text-sm"
          dangerouslySetInnerHTML={{ __html: `Eg: ${formattedAnswer}` }}
        />
        <Button
          type="gray"
          size="small"
          rounded="small"
          classname="px-0.5 py-[6px] text-xs font-semibold"
          handleClick={useExample}
        >
          Use this example
        </Button>
      </div>
      <form onSubmit={handleSubmit(onContinue)} className="mt-4">
        <fieldset className="mt-3">
          <label className=" text-sm font-medium leading-5 text-gray-700">
            <div className="mt-0.5 rounded-md">
              <textarea
                rows={5}
                disabled={isLoading}
                {...register("answer")}
                className={classNames(
                  "appearance-none w-full px-2 py-[10px] bg-gray-100 border border-gray-300 rounded-md placeholder:text-gray-400 focus:ring-0.5 min-h-[160px] pn_scroller ",
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
        {hasSkippedQuestion ? (
          <div>Answer all the skipped questions to continue.</div>
        ) : (
          <div className="mt-4 pb-4 flex gap-2 items-center">
            {showSkip && (
              <Button htmlType={"button"} type="secondary" rounded={"medium"} handleClick={onSkip}>
                Skip for now
              </Button>
            )}
            <Button htmlType={"submit"} rounded={"medium"} loading={isLoading} disabled={isLoading}>
              Save & Continue
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
