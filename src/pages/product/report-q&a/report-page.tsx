import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

//
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

import { setSession } from "../../../stores/session";
import { questionList } from "./_question";

import Loading from "../../../components/reusable/loading";
// import BackButton from "../../../components/reusable/back-button";

import IPStepper from "../../../components/@report-chat/ip-analysis/stepper";
// import Thankyou from "../../../components/@report-chat/ip-analysis/use-case/thank-you";
import IPReview from "../../../components/@report-chat/ip-analysis/use-case/review/review";
import NewQuestion from "../../../components/@report-chat/ip-analysis/use-case/new-question";
import EditQuestion from "../../../components/@report-chat/ip-analysis/use-case/question/edit-question";
import ChatQuestionAnswer from "../../../components/@report-chat/ip-analysis/use-case/question/question-1";

import SkippedQuestion from "./skipped-question";

import ArrowLeftIcon from "src/components/icons/common/arrow-left";
import SkippedQuestionAnswer from "src/components/@report-chat/ip-analysis/use-case/question/skipped-question";
import Thankyou from "src/components/@report-chat/ip-analysis/use-case/thank-you";
// import Payment from "src/components/@report-chat/ip-analysis/use-case/payment";

/**
 *
 */
export default function ReportQuestionAnswerPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const session = useAppSelector((state) => state.sessionDetail.session);
  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);

  const activeIndex = useMemo(
    () => sessionDetail?.active_index || 0,
    [sessionDetail?.active_index],
  );

  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<any>(0);
  const [useCases, setUseCases] = useState<string[]>([]);

  useEffect(() => {
    if (sessionDetail === undefined) {
      setLoading(true);
    }
    if (sessionDetail) {
      if (sessionDetail?.step_id) {
        setActiveStep(sessionDetail?.step_id);
      }
      if (sessionDetail?.use_cases) {
        setUseCases(sessionDetail?.use_cases);
      }
    }
    setLoading(false);
  }, [sessionDetail]);

  //
  const changeActiveStep = useCallback((stepValue: number) => {
    if (stepValue < steps.length - 1 && stepValue >= 0) {
      setActiveStep(stepValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const questionId = useMemo(() => sessionDetail?.question_id, [sessionDetail?.question_id]);
  //
  const questionWithUsecase = questionList.filter(
    (q) => q.usecase === "common-question" || useCases.includes(q.usecase),
  );

  const question = useMemo(
    () =>
      questionWithUsecase.find((q, idx) => {
        if (idx === activeIndex) {
          return q;
        }
      }) || { questionId: Number(questionId), question: "", usecase: "", answer: "" },
    [activeIndex, questionId, questionWithUsecase],
  );

  //
  const steps = [
    {
      label: "",
      value: 3,
      component: (
        <ChatQuestionAnswer
          changeActiveStep={changeActiveStep}
          activeStep={activeStep}
          question={question}
          activeIndex={activeIndex}
          totalQuestion={questionWithUsecase.length}
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
      component: <IPReview changeActiveStep={changeActiveStep} activeStep={activeStep} />,
    },
    {
      label: "Edit",
      value: 7,
      component: <EditQuestion changeActiveStep={changeActiveStep} />,
    },
    {
      label: "",
      value: 8,
      component: (
        <NewQuestion
          changeActiveStep={changeActiveStep}
          activeStep={activeStep}
          exampleAnswer={question.answer}
          activeIndex={activeIndex}
        />
      ),
    },
    {
      label: "skipped-question",
      value: 9,
      component: (
        <SkippedQuestionAnswer
          changeActiveStep={changeActiveStep}
          activeIndex={activeIndex}
          questionWithUsecase={questionWithUsecase}
        />
      ),
    },
  ];

  const onBack = useCallback(() => {
    if (activeIndex === 0) {
      navigate("/interaction-method");
    } else {
      dispatch(
        setSession({
          session_data: {
            ...sessionDetail,
            question_id: questionId,
            step_id: 3,
            active_index: activeIndex - 1,
          },
        }),
      );
    }
  }, [activeIndex, dispatch, navigate, questionId, sessionDetail]);

  //
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  if (loading || session === undefined) {
    return <Loading isLoading={loading || session === undefined} />;
  }

  return (
    <>
      <div className="w-full">
        <button
          className="flex flex-row gap-x-1 font-bold text-secondary-800 w-fit"
          onClick={onBack}
        >
          <ArrowLeftIcon /> Back
        </button>
        <h5 className="text-5xl font-[800] my-2">Detailed Q&A</h5>
        <div className="w-full overflow-hidden">
          <IPStepper steps={questionWithUsecase} activeStep={activeIndex} />
        </div>
        <div className="flex mt-2.5 justify-between gap-8">
          <div
            className={classNames(
              "relative min-h-[calc(100vh-400px)] md:min-h-[calc(100vh-400px)] xl:min-h-[calc(100vh-920px)] 2xl:min-h-full max-h-full shadow border rounded-md w-[932px] p-2 bg-white",
              sessionDetail?.step_id === 6 ? "mx-auto" : "",
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
                  className={classNames(
                    activeStep !== step.value && "hidden",
                    "px-1 h-full w-full",
                  )}
                >
                  {step.component}
                </div>
              ))}
            </div>
          </div>
          {sessionDetail?.step_id !== 6 && (
            <div className="flex-shrink-0 2xl:w-[300px]">
              <SkippedQuestion
                questions={
                  questionList
                    .filter((q) => sessionDetail?.skipped_question?.includes(q.questionId))
                    .map((q) => q) || []
                }
                questionWithUsecase={questionWithUsecase}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
