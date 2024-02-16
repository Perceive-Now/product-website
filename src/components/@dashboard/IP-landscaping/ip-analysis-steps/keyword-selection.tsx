import { useForm } from "react-hook-form";
import Button from "../../../reusable/button";
import KeywordSelected from "../KeywordSelected";
import IPUseCase from "../components/use-case";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";

import * as yup from "yup";
import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setPurposeIdentification } from "../../../../stores/IpSteps";
import { CrossIcon } from "../../../icons";

interface Props {
  changeActiveStep: (steps: number) => void;
}

interface IAnswer {
  answer: string;
}

export default function KeywordSelection({ changeActiveStep }: Props) {
  const dispatch = useAppDispatch();
  const answer = useAppSelector((state) => state.ipData.purpose_identification.answer) ?? "";

  const [hasKeywords, setHasKeywords] = useState(false);
  const [keywords, setKeywords] = useState<IAnswer[]>([]);

  const formResolver = yup.object().shape({
    answer: yup.string().required("Case is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      answer: answer,
    },
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });
  //
  const addKeyword = useCallback(
    (value: IAnswer) => {
      if (keywords.length >= 5) {
        setHasKeywords(true);
      } else {
        setKeywords((prevKeywords) => [...prevKeywords, { ...value, answer: value.answer }]);
        reset();
      }
    },
    [keywords.length, reset],
  );

  const onContinue = useCallback(() => {
    changeActiveStep(2);
  }, [changeActiveStep]);

  const removeKeyword = useCallback(
    (value: string) => {
      setKeywords(keywords.filter((keyword) => keyword.answer !== value));
    },
    [keywords],
  );

  return (
    <>
      {/* <div className="space-y-2.5">
        <KeywordSelected />
        <IPUseCase changeActiveStep={changeActiveStep} />
        <div className="py-0.5 px-1 bg-appGray-100 rounded-sm text-base text-secondary-800 ">
          Introduction and Purpose Identification
        </div>
        <p className="text-gray-600 text-sm">
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
        >
          Use this example
        </Button>
      </div> */}
      <h4 className="text-gray-600 text-xl font-semibold">
        Please provide at least 5 keywords associated to your technology.
      </h4>
      <div className="flex gap-[10px] mt-5">
        {keywords.map((keyword) => (
          <div
            key={keyword.answer}
            className="flex items-center justify-between gap-x-1 border rounded-lg border-appGray-600 py-0.5 px-2 text-sm font-medium text-secondary-800"
          >
            {keyword.answer}
            <button type="button" onClick={() => removeKeyword(keyword.answer)}>
              <CrossIcon width={"16px"} className="text-secondary-800" />
            </button>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit(addKeyword)} className="mt-4">
        <fieldset className="mt-">
          <label className=" text-sm font-medium leading-5 text-gray-700">
            {/* Technology / Sector Description* */}
            <div className="mt-0.5 rounded-md shadow-sm">
              <textarea
                rows={2}
                {...register("answer")}
                className={classNames(
                  "appearance-none w-full px-2 py-[10px] bg-gray-100 border-1 rounded-md placeholder:text-gray-400 focus:ring-0.5",
                  errors.answer
                    ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                    : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                )}
                placeholder="Enter Keyword"
              />
            </div>
          </label>
          {/* {errors.description?.message && (
            <div className="mt-1 text-xs text-danger-500">{errors.description?.message}</div>
          )} */}
        </fieldset>
        {hasKeywords ? (
          <div className="mt-4 pb-4">
            <Button htmlType={"button"} rounded={"large"} handleClick={onContinue}>
              Continue
            </Button>
          </div>
        ) : (
          <div className="mt-4 pb-4">
            <Button htmlType={"submit"} rounded={"large"}>
              Add Keyword
            </Button>
          </div>
        )}
      </form>
    </>
  );
}
