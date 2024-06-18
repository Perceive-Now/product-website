import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";

import * as yup from "yup";
import { useCallback } from "react";
import Button from "src/components/reusable/button";

interface QuestionFormProps {
  onContinue: ({ answer }: { answer: string | undefined }) => Promise<void>;
  onSkipBtnClick: () => void;
  question: string;
  exampleAnswer: string;
  isLoading: boolean;
  answer?: string;
  onSkip?: any;
}

export default function QuestionForm({
  onContinue,
  onSkipBtnClick,
  question,
  isLoading,
  exampleAnswer,
  answer,
}: QuestionFormProps) {
  const formResolver = yup.object().shape({
    answer: yup.string().trim().required("Please provide your answer"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      answer: answer,
    },
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });

  const useExample = useCallback(() => {
    setValue("answer", exampleAnswer); // Update the form value
  }, [exampleAnswer, setValue]);

  const formattedAnswer = exampleAnswer.replace(/\n/g, "<br>");

  return (
    <div className="w-[900px] bg-white p-2 shadow-page-content">
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
                  "appearance-none w-full px-2 py-[10px] text-sm placeholder:text-sm bg-appGray-100 border border-gray-300 rounded-md placeholder:text-gray-400 focus:ring-0.5 min-h-[160px] pn_scroller ",
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
        <div className="mt-4 pb-4 flex gap-2 items-center">
          <Button
            htmlType={"button"}
            rounded={"medium"}
            loading={isLoading}
            disabled={isLoading}
            handleClick={onSkipBtnClick}
          >
            Skip and continue
          </Button>
          <Button htmlType={"submit"} rounded={"medium"} loading={isLoading} disabled={isLoading}>
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
