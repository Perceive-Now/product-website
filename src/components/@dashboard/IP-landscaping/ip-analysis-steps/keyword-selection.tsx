import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../reusable/button";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";

import * as yup from "yup";
import { useCallback, useState } from "react";
import { CrossIcon } from "../../../icons";
import { useAppDispatch } from "../../../../hooks/redux";
import { setDashboardKeywords } from "../../../../stores/dashboard";

interface Props {
  changeActiveStep: (steps: number) => void;
}

interface FormData {
  keyword: string;
}

export default function KeywordSelection({ changeActiveStep }: Props) {
  const dispatch = useAppDispatch();

  const [hasKeywords, setHasKeywords] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);

  const formResolver = yup.object().shape({
    keyword: yup.string().required("Please provide Keyword"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      keyword: "",
    },
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });
  //
  const addKeyword: SubmitHandler<FormData> = useCallback(
    (value: FormData) => {
      if (keywords.length >= 0) {
        setHasKeywords(true);
      }
      setKeywords((prevKeywords) => [...prevKeywords, value.keyword]);
      reset();
    },
    [keywords, reset],
  );

  const onContinue = useCallback(async () => {
    dispatch(
      setDashboardKeywords(["Artificial Intelligence-based Predictive Analytics for Healthcare"]),
    );
    changeActiveStep(3);
  }, [changeActiveStep, dispatch]);

  const removeKeyword = useCallback(
    (value: string) => {
      setKeywords(keywords.filter((keyword) => keyword !== value));
    },
    [keywords],
  );

  return (
    <>
      {/* <Loading isLoading={isloading} /> */}
      <h4 className="text-gray-600 text-xl font-semibold">
        Please provide at least 5 keywords associated to your technology.
      </h4>
      <div className="flex gap-[10px] mt-5">
        {keywords.map((keyword) => (
          <div
            key={keyword}
            className="flex items-center justify-between gap-x-1 border rounded-lg border-appGray-600 py-0.5 px-2 text-sm font-medium text-secondary-800"
          >
            {keyword}
            <button type="button" onClick={() => removeKeyword(keyword)}>
              <CrossIcon width={"16px"} className="text-secondary-800" />
            </button>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit(addKeyword)} className="mt-2">
        <fieldset className="mt-">
          <label className=" text-sm font-medium leading-5 text-gray-700">
            {/* Technology / Sector Description* */}
            <div className="mt-0.5 rounded-md shadow-sm">
              <textarea
                rows={2}
                {...register("keyword")}
                className={classNames(
                  "appearance-none w-full px-2 py-[10px] bg-gray-100 border-1 rounded-md placeholder:text-gray-400 focus:ring-0.5",
                  errors.keyword
                    ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                    : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                )}
                placeholder="Enter Keyword"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Prevent default behavior of Enter key
                    const keyword = (e.target as HTMLTextAreaElement).value.trim(); // Get the keyword and remove leading/trailing spaces
                    if (keyword) {
                      addKeyword({ keyword });
                    }
                  }
                }}
              />
            </div>
          </label>
          {errors.keyword?.message && (
            <div className="text-xs text-danger-500">{errors.keyword?.message}</div>
          )}
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
