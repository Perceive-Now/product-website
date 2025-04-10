// import jsCookie from "js-cookie";
import toast from "react-hot-toast";
import { useCallback, useState } from "react";

//
// import axiosInstance from "src/utils/axios";

//
import QuestionAnswerForm from "./question-form";

//
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import {
  QAPages,
  setCurrentPageId,
  setGenerateAnswerSuccess,
  updateQuestionAnswer,
  updateQuestionList,
} from "src/stores/Q&A";

//
// const BASE_PN_REPORT_URL = process.env.REACT_APP_REPORT_API_URL;

export default function EditQuestionAnswer() {
  const dispatch = useAppDispatch();

  const [isloading, setIsLoading] = useState(false);
  const [resetForm, setResetForm] = useState(false);

  const { questionsList, currentQuestionId } = useAppSelector((state) => state.QA);
  // const requirementGatheringId = jsCookie.get("requirement_gathering_id");

  // const userId = jsCookie.get("user_id");

  //
  const onContinue = useCallback(
    async (value: { answer: string }) => {
      setIsLoading(true);

      try {
        // const response = await axiosInstance.post(
        //   `${BASE_PN_REPORT_URL}/generate/?answer=${encodeURIComponent(
        //     value.answer,
        //   )}&userID=${userId}&requirement_gathering_id=${Number(
        //     requirementGatheringId,
        //   )}&QuestionID=${currentQuestionId}`,
        // );
        const response = {
          data: {
            question: "",
            status: "true",
          },
        };
        const new_question = response.data.question;
        setIsLoading(false);

        if (response.data.status === "false") {
          toast.error("Give a more detailed answer");
          dispatch(
            updateQuestionList({
              questionId: currentQuestionId,
              question: new_question,
            }),
          );
          dispatch(setGenerateAnswerSuccess(false));
          return;
        } else {
          dispatch(
            updateQuestionAnswer({
              questionId: currentQuestionId,
              answer: value.answer,
            }),
          );
          dispatch(setCurrentPageId(QAPages.Review));
        }
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error.message);
      }
    },
    [currentQuestionId, dispatch],
  );

  const question = questionsList.find((q) => q.questionId === currentQuestionId);

  return (
    <>
      {question?.questionId && (
        <QuestionAnswerForm
          isLoading={isloading}
          onContinue={onContinue}
          question={question?.question || ""}
          exampleAnswer={question?.exampleAnswer || ""}
          answer={question?.answer}
          showSkip={false}
          resetForm={resetForm}
          setResetForm={setResetForm}
          questionId={question?.questionId}
          isEdit={true}
        />
      )}
    </>
  );
}
