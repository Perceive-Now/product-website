import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { quickPromptContent } from "./quick-prompt-content";
import { type AnyObject } from "yup/lib/types";

export default function QuickPromptForm() {
  const quickPrompts = quickPromptContent.find((content) => content.id === 0);

  const formInitialValue =
    quickPrompts?.contentList.reduce((acc: { [key: string]: string }, curr) => {
      if (curr.contentType === "prompt" && curr.keyword) {
        acc[curr.keyword] = "";
      }
      return acc;
    }, {}) || {};

  const formSchema =
    quickPrompts?.contentList.reduce(
      (
        acc: { [key: string]: yup.StringSchema<string | undefined, AnyObject, string | undefined> },
        curr,
      ) => {
        if (curr.contentType === "prompt" && curr.keyword) {
          acc[curr.keyword] = yup.string();
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
    setValue,
  } = useForm({
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });

  const onContinue = (params: any) => {
    console.log(params);
  };

  return (
    <form onSubmit={handleSubmit(onContinue)}>
      <fieldset>
        <div className="flex flex-wrap gap-2 items-center ">
          {quickPrompts?.contentList.map((content, index) => {
            if (content.contentType === "text") {
              return (
                <p className="inline-block" key={index}>
                  {content.content}
                </p>
              );
            } else if (content.contentType === "prompt" && content.keyword) {
              return (
                <div key={index} className="inline-block max-w-fit">
                  <input
                    className="input-field"
                    key={index}
                    width={content.placeholder.length}
                    {...register(content.keyword)}
                    placeholder={content.placeholder}
                    onChange={(e) => {
                      setValue(content.keyword, e.target.value);
                    }}
                  />
                </div>
              );
            }
          })}
        </div>
        <button type="submit" className="btn-primary">
          Continue
        </button>
      </fieldset>
    </form>
  );
}
