import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { quickPromptContent } from "./quick-prompt-content";
import { type AnyObject } from "yup/lib/types";
import Button from "../../../components/reusable/button";
import classNames from "classnames";
import { useAppDispatch } from "@/hooks/redux";
import { uploadQuickPrompts } from "@/stores/quick-prompt";
import jsCookie from "js-cookie";

export default function QuickPromptForm() {
  const dispatch = useAppDispatch();

  const requiredQuickPrompts = quickPromptContent.find((content) => content.id === 0);

  const formInitialValue =
    requiredQuickPrompts?.contentList.reduce((acc: { [key: string]: string }, curr) => {
      if (curr.contentType === "prompt" && curr.keyword) {
        acc[curr.keyword] = "";
      }
      return acc;
    }, {}) || {};

  const formSchema =
    requiredQuickPrompts?.contentList.reduce(
      (
        acc: { [key: string]: yup.StringSchema<string | undefined, AnyObject, string | undefined> },
        curr,
      ) => {
        if (curr.contentType === "prompt" && curr.keyword) {
          acc[curr.keyword] = yup.string().trim().required("Please provide your answer");
        }
        return acc;
      },
      {},
    ) || {};

  const formResolver = yup.object().shape(formSchema);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });

  const onContinue = (params: any) => {
    const dataObj = {
      paragraphId: "1",
      quickPrompts: { ...params },
      categoryId: "1", // TODO: get categoryId, userId,
      userId: jsCookie.get("user_id") ?? "",
      sessionId: jsCookie.get("session_id") ?? "",
    };

    dispatch(uploadQuickPrompts(dataObj));

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onContinue)}>
      <fieldset className="bg-white rounded-lg p-[20px] border border-appGray-200">
        <div className="flex flex-wrap gap-2 items-center text-lg font-semibold">
          {requiredQuickPrompts?.contentList.map((content, index) => {
            if (content.contentType === "text") {
              return (
                <p className="inline-block" key={index}>
                  {content.content}
                </p>
              );
            } else if (content.contentType === "prompt" && content.keyword) {
              return (
                <div key={index} className="inline-block max-w-fit px-1 bg-appGray-100">
                  <input
                    className={classNames(
                      { "border-b-red-500": errors[content.keyword] },
                      { "border-b-primary-900": !errors[content.keyword] },
                      "focus:outline-none p-1 bg-transparent rounded-md rounded-b-none border-b-2 text-primary-900",
                    )}
                    key={index}
                    width={content.placeholder.length}
                    {...register(content.keyword)}
                    placeholder={content.placeholder}
                  />
                </div>
              );
            }
          })}
        </div>
      </fieldset>
      <Button
        type="optional"
        handleClick={() => {
          handleSubmit(onContinue);
        }}
        classname="w-[320px] mt-[20px]"
      >
        <p className="text-secondary-800">Continue</p>
      </Button>
    </form>
  );
}
