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
    <form onSubmit={handleSubmit(onContinue)} className="h-full">
      <div className="overflow-y-auto pn_scroller relative h-[calc(100vh-300px)] pr-2">
        <div className="space-y-1">
          <h4
            className="text-primary-900 text-lg font-semibold"
            dangerouslySetInnerHTML={{ __html: `${question}` }}
          />
          <p
            id="exampleText"
            className="text-gray-600 text-xs"
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
        <div className="mt-2">
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
        </div>
      </div>
      <div className="bottom-0 left-0 right-0 absolute w-full bg-white pt-1 pb-2 mt-1 border-t">
        <div className="flex gap-2 items-center px-4">
          <Button
            htmlType={"button"}
            rounded={"medium"}
            loading={false}
            disabled={isLoading}
            handleClick={onSkipBtnClick}
            type="secondary"
          >
            Skip and continue
          </Button>
          <Button htmlType={"submit"} rounded={"medium"} loading={isLoading} disabled={isLoading}>
            Continue
          </Button>
        </div>
      </div>
    </form>
  );
}
