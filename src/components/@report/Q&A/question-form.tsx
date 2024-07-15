import { useCallback, useState } from "react";
// import { useForm } from "react-hook-form";

// import { yupResolver } from "@hookform/resolvers/yup";
// import classNames from "classnames";

// import * as yup from "yup";

//
import Button from "../../reusable/button";
import MadlibEdit from "./madlib-edit";
import DiagnosticPlatform from "./madlin-an";

//
// import EditIcon from "src/components/icons/miscs/Edit";
// import ToolTip from "src/components/reusable/tool-tip";

interface Props {
  onContinue: any;
  question: string;
  exampleAnswer: string;
  isLoading: boolean;
  answer?: string;
  onSkip?: any;
  hasSkippedQuestion?: boolean;
  showSkip?: boolean;
  resetForm: boolean;
  setResetForm: (reset: boolean) => void;
  questionId: number;
  chatRef?: any;
  isEdit: boolean;
}

/**
 *
 */
export default function QuestionAnswerForm({
  onContinue,
  question,
  isLoading,
  exampleAnswer,
  answer,
  onSkip,
  hasSkippedQuestion,
  showSkip = true,
  // resetForm,
  // setResetForm,
  questionId,
  chatRef,
  isEdit,
}: Props) {
  const [updatedAnswer, setUpdatedAnswer] = useState("");
  const [hasContent, setHasContent] = useState(true);

  // const [madlibAnswer, setMadlibAnswer] = useState("");
  // const [edit, setEdit] = useState(false);

  // const formResolver = yup.object().shape({
  //   answer: yup.string().trim().required("Please provide your answer"),
  // });

  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  //   setValue,
  //   reset,
  //   watch
  // } = useForm({
  //   defaultValues: {
  //     answer: updatedAnswer,
  //   },
  //   resolver: yupResolver(formResolver),
  //   mode: "onBlur",
  // });

  // const watchAnswer = watch('answer');

  // useEffect(() => {
  //   setUpdatedAnswer(answer || "");
  //   // setValue("answer", answer || "");
  // }, [answer]);

  //
  // const onEdit = useCallback((answer: string) => {
  //   setEdit(!edit);
  //   setMadlibAnswer(answer);
  //   // setValue("answer", answer); // Update the form value
  // }, [edit])

  //
  // useEffect(() => {
  //   if (resetForm) {
  //     reset();
  //     setResetForm(false);
  //   }
  // });

  //
  const useExample = useCallback(() => {
    setUpdatedAnswer(exampleAnswer);
  }, [exampleAnswer]);

  const formattedAnswer = exampleAnswer.replace(/\n/g, "<br>");

  return (
    <div ref={chatRef} className="h-[calc(100vh-284px)] overflow-auto bg-white pn_scroller pr-2">
      <div className="space-y-[10px]">
        <h4
          className="text-primary-900 text-lg 2xl:text-xl font-semibold"
          dangerouslySetInnerHTML={{ __html: `${question}` }}
        />
        <p
          id="exampleText"
          className="text-gray-600 text-xs 2xl:text-sm"
          dangerouslySetInnerHTML={{ __html: `Eg: ${formattedAnswer}` }}
        />
        <Button
          type="gray"
          size="small"
          rounded="small"
          classname="px-0.5 py-[6px] text-xs font-semibold hover:cursor-default"
          handleClick={useExample}
        >
          Use this Example
        </Button>
      </div>

      {isEdit ? (
        <MadlibEdit
          hasSkippedQuestion={hasSkippedQuestion}
          showSkip={showSkip}
          onSkip={onSkip}
          question={[
            {
              question: question,
              answer: answer || "",
              questionId: questionId,
            },
          ]}
          onContinue={onContinue}
          isLoading={isLoading}
        />
      ) : (
        <DiagnosticPlatform
          hasSkippedQuestion={hasSkippedQuestion}
          showSkip={showSkip}
          onSkip={onSkip}
          onContinue={onContinue}
          isLoading={isLoading}
          answer={updatedAnswer}
          setHasContent={setHasContent}
        />
      )}
      {/* {
        edit ?
          <form onSubmit={handleSubmit(onContinue)} className="mt-2.5">
            <div className="">
              <label className=" text-sm font-medium leading-5 text-gray-700">
                <div className="mt-0.5 rounded-md relative">
                  <textarea
                    rows={5}
                    disabled={isLoading}
                    {...register("answer")}
                    className={classNames(
                      "appearance-none w-full px-2 py-[10px] bg-appGray-100 border border-appGray-200 rounded-md placeholder:text-gray-400 min-h-[180px] pn_scroller focus:outline-none text-sm",
                      errors.answer && !watchAnswer
                        ? "border-danger-500 focus:border-danger-500"
                        : "border-gray-400 focus:border-primary-500",
                    )}
                    placeholder="Please provide your answer here."
                  />
                  <button
                    type="button"
                    className="absolute -top-0 right-0 rounded-full  p-[4px]"
                    onClick={() => onEdit(madlibAnswer)}
                  >
                    <ToolTip title="Madlib Format">
                      <EditIcon className="text-primary-900" />
                    </ToolTip>
                  </button>
                </div>
              </label>
              {errors.answer?.message && !watchAnswer && (
                <div className="text-xs text-danger-500">{errors.answer?.message}</div>
              )}
            </div>
            <div className="bottom-0 left-0 right-0 absolute w-full bg-white pb-2 pt-2 mt-1 border-t">
              {hasSkippedQuestion ? (
                <div>Please answer all the skipped questions to continue.</div>
              ) : (
               
              )}
              <div className=" flex gap-2 items-center">
                {showSkip && (
                  <Button htmlType={"button"} type="secondary" rounded={"medium"} handleClick={onSkip}>
                    Skip for now
                  </Button>
                )}
                <Button loading={isLoading} htmlType="submit" rounded={"medium"}>
                  Save & Continue
                </Button>
              </div>
            </div>
          </form> :
          
      } */}
    </div>
  );
}
