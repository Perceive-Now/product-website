import { useCallback, useEffect, useState } from "react";

//
import classNames from "classnames";

import IPStepper from "../../../../components/@report-chat/ip-analysis/stepper";

import Thankyou from "../../../../components/@report-chat/ip-analysis/use-case/thank-you";
import DefaultStep from "../../../../components/@report-chat/ip-analysis/ip-analysis-steps/DefaultStep";

import ChatQuestionAnswer from "../../../../components/@report-chat/ip-analysis/use-case/question/question-1";
import ChatQuestionAnswer2 from "../../../../components/@report-chat/ip-analysis/use-case/question/question-2";

import { useAppSelector } from "../../../../hooks/redux";

import { questionList } from "./_question";
import NewQuestion from "../../../../components/@report-chat/ip-analysis/use-case/new-question";
import IPReview from "../../../../components/@report-chat/ip-analysis/use-case/review/review";

/**
 *
 */
export default function IPAnalysis() {
  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);

  const [activeStep, setActiveStep] = useState<any>(sessionDetail?.step_id);
  const [useCases, setUseCases] = useState<string[]>([]);

  useEffect(() => {
    if (sessionDetail?.step_id) {
      setActiveStep(sessionDetail?.step_id);
    }
    if (sessionDetail?.use_cases) {
      setUseCases(sessionDetail?.use_cases);
    }
  }, [sessionDetail]);

  //
  const changeActiveStep = useCallback((stepValue: number) => {
    if (stepValue < steps.length && stepValue >= 0) {
      setActiveStep(stepValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const questionId = sessionDetail?.question_id;
  // || jsCookie.get("questionId");
  const commonQuestionId = sessionDetail?.common_question_id;
  // || jsCookie.get("commonQuestionId");

  // useEffect(() => {
  //   jsCookie.set("chatId", chatId || "");
  // }, [chatId]);

  //
  const questionWithUsecase = questionList.filter(
    (q) => q.usecase === "common-question" || useCases.includes(q.usecase),
  );

  const question = questionWithUsecase.find((q) => {
    if (Number(commonQuestionId) > 5) {
      return q.questionId === Number(questionId);
    } else {
      return q.questionId === Number(commonQuestionId);
    }
  }) || { questionId: Number(questionId), question: "", usecase: "", answer: "" };

  //
  useEffect(() => {
    if (questionWithUsecase[questionWithUsecase.length - 1].questionId === Number(questionId) - 1) {
      changeActiveStep(5);
    }
    changeActiveStep(activeStep);
  }, [activeStep, changeActiveStep, question.question, questionId, questionWithUsecase]);

  //
  const steps = [
    {
      label: "",
      value: 0,
      component: <DefaultStep changeActiveStep={changeActiveStep} />,
    },
    // {
    //   label: "",
    //   value: 1,
    //   component: <KeywordSelection changeActiveStep={changeActiveStep} />,
    // },
    {
      label: "",
      value: 2,
      component: (
        <NewQuestion
          changeActiveStep={changeActiveStep}
          activeStep={activeStep}
          exampleAnswer={question.answer}
        />
      ),
    },
    {
      label: "",
      value: 3,
      component: (
        <ChatQuestionAnswer
          changeActiveStep={changeActiveStep}
          activeStep={activeStep}
          question={question}
        />
      ),
    },
    {
      label: "",
      value: 4,
      component: (
        <ChatQuestionAnswer2
          changeActiveStep={changeActiveStep}
          activeStep={activeStep}
          question={question}
        />
      ),
    },
    {
      label: "",
      value: 5,
      component: <Thankyou changeActiveStep={changeActiveStep} />,
    },
    {
      label: "Review",
      value: 6,
      component: <IPReview changeActiveStep={changeActiveStep} />,
    },
  ];

  //
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  return (
    <>
      <div className="w-full">
        <div
          className={classNames(
            "relative min-h-[calc(100vh-400px)] md:min-h-[calc(100vh-400px)] xl:min-h-[calc(100vh-900px)] 2xl:min-h-full max-h-full w-full",
            activeStep !== 0 && activeStep !== 1 && "shadow border rounded-md p-2",
          )}
        >
          <div
            className={`translate-y-[${
              activeStep * 9
            }% flex flex-col gap-y-5 transition duration-500 ease-in-out  h-full w-full `}
            style={{
              transform: `translateY(-${activeStep * 0}%)`,
            }}
          >
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={classNames(activeStep !== step.value && "hidden", "px-1 h-full w-full")}
              >
                {step.component}
              </div>
            ))}
          </div>
          {activeStep > 1 && activeStep < 7 && (
            <div className="absolute bottom-0 left-0 right-0 w-full rounded-b-md overflow-hidden">
              <IPStepper
                steps={questionWithUsecase}
                activeStep={
                  Number(commonQuestionId) > 5 ? Number(questionId) : Number(commonQuestionId)
                }
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 w-[200px]" />
    </>
  );
}
