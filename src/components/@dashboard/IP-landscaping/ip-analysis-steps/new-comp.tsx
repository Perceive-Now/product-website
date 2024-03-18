import { useForm } from "react-hook-form";
import Button from "../../../reusable/button";

import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";

import * as yup from "yup";
import Loading from "../../../reusable/loading";

interface Props {
  onContinue: any;
  question: string;
  isLoading: boolean;
}

export default function NewComponent({ onContinue, question, isLoading }: Props) {
  // const example = "The company behind Smart sensor is 'DermAI Tech Inc.'";

  const formResolver = yup.object().shape({
    answer: yup.string().required("Please provide your answer"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    // setValue,
  } = useForm({
    defaultValues: {
      answer: "",
    },
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });
  //
  // const useExample = useCallback(() => {
  //   setValue("answer", "");
  // }, [setValue]);

  return (
    <>
      <Loading isLoading={true} />
      <div className="space-y-2.5">
        <h4 className="text-gray-600 text-xl font-semibold">{question}</h4>
        {/* <p id="exampleText" className="text-gray-600 text-sm">
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
        </Button> */}
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
                  "appearance-none w-full px-2 py-[10px] bg-gray-100 border-1 rounded-md placeholder:text-gray-400 focus:ring-0.5 min-h-[160px]",
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
        <div className="mt-4 pb-4">
          <Button htmlType={"submit"} rounded={"large"}>
            Continue
          </Button>
        </div>
      </form>
    </>
  );
}
