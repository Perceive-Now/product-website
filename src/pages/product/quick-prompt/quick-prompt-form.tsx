import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { quickPromptContent } from "./quick-prompt-content";
import { type AnyObject } from "yup/lib/types";
import Button from "../../../components/reusable/button";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setQuickPrompts, uploadQuickPrompts } from "../../../stores/upload-quick-prompt";
import jsCookie from "js-cookie";

export default function QuickPromptForm() {
  const dispatch = useAppDispatch();

  const { isUploading, quickPrompts, currentParagraphId } = useAppSelector(
    (state) => state.uploadQuickPrompt,
  );

  const requiredQuickPrompts =
    quickPromptContent.find((content) => content.id === currentParagraphId) ??
    quickPromptContent[0];

  const modifiedRequiredQuickPrompts = { ...requiredQuickPrompts };
  modifiedRequiredQuickPrompts.contentList = [];

  requiredQuickPrompts?.contentList.forEach((quickPrompt) => {
    if (quickPrompt.contentType === "text" && quickPrompt.content) {
      const words = quickPrompt.content.split(" ");
      words.forEach((word) => {
        modifiedRequiredQuickPrompts.contentList.push({
          contentType: "text",
          content: word,
          keyword: undefined,
          placeholder: undefined,
        });
      });
    } else {
      modifiedRequiredQuickPrompts.contentList.push(quickPrompt);
    }
  });

  let formInitialValue =
    modifiedRequiredQuickPrompts?.contentList.reduce((acc: { [key: string]: string }, curr) => {
      if (curr.contentType === "prompt" && curr.keyword) {
        acc[curr.keyword] = "";
      }
      return acc;
    }, {}) || {};

  formInitialValue = {
    ...formInitialValue,
    ...quickPrompts.find((content) => content.id === 0)?.prompts,
  };

  const formSchema =
    modifiedRequiredQuickPrompts?.contentList.reduce(
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
  } = useForm({
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });

  const onContinue = (params: { [key: string]: string }) => {
    dispatch(setQuickPrompts({ prompts: params, paragraphId: currentParagraphId }));

    const indexOfCurrentParagraphId = quickPromptContent.findIndex(
      (content) => content.id === currentParagraphId,
    );

    const promptData = [...quickPromptContent];

    promptData[indexOfCurrentParagraphId] = {
      ...promptData[indexOfCurrentParagraphId],
      contentList: promptData[indexOfCurrentParagraphId].contentList.map((content) => {
        if (content.contentType === "prompt" && content.keyword) {
          return {
            ...content,
            prompt: params[content.keyword],
          };
        }
        return content;
      }),
    };

    const content = promptData[indexOfCurrentParagraphId].contentList.reduce(
      (acc: string, curr) => {
        if (curr.contentType === "text") {
          return acc + " " + curr.content;
        } else if (curr.contentType === "prompt" && "prompt" in curr) {
          return acc + " " + curr.prompt;
        }
        return acc;
      },
      "",
    );

    const dataObj = {
      promptData: promptData,
      requirementGatheringId: "1", // TODO: get requirementGatheringId from usecases
      userId: jsCookie.get("user_id") ?? "",
      content: content,
    };

    dispatch(uploadQuickPrompts(dataObj));
  };

  return (
    <form onSubmit={handleSubmit(onContinue)}>
      <fieldset className="bg-white rounded-lg p-[20px] border border-appGray-200">
        <div className="flex flex-wrap gap-y-2 items-center text-lg font-semibold">
          {modifiedRequiredQuickPrompts?.contentList.map((content, index) => {
            if (content.contentType === "text") {
              return (
                <p className="inline-block mx-[3px]" key={index}>
                  {content.content}
                </p>
              );
            } else if (content.contentType === "prompt" && content.keyword) {
              return (
                <div
                  key={index}
                  className="inline-block px-1 mr-1 max-w-[900px] overflow-hidden bg-appGray-100"
                >
                  <input
                    className={classNames(
                      { "border-b-red-500": errors[content.keyword] },
                      { "border-b-primary-900": !errors[content.keyword] },
                      "focus:outline-none bg-transparent rounded-md min-w-fit max-w-[900px] display-block overflow-x-auto rounded-b-none border-b-2 text-primary-900",
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
        loading={isUploading}
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
