import { useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";

//
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

import { setSession } from "../../../stores/session";
import { questionList } from "./_question";

import Loading from "../../../components/reusable/loading";
import BackButton from "../../../components/reusable/back-button";

import IPStepper from "../../../components/@report-chat/ip-analysis/stepper";
import Thankyou from "../../../components/@report-chat/ip-analysis/use-case/thank-you";
import IPReview from "../../../components/@report-chat/ip-analysis/use-case/review/review";
import NewQuestion from "../../../components/@report-chat/ip-analysis/use-case/new-question";
import EditQuestion from "../../../components/@report-chat/ip-analysis/use-case/question/edit-question";
import ChatQuestionAnswer from "../../../components/@report-chat/ip-analysis/use-case/question/question-1";
import ChatQuestionAnswer2 from "../../../components/@report-chat/ip-analysis/use-case/question/question-2";

/**
 *
 */
export default function ReportQuestionAnswerPage() {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.sessionDetail.session);

  // const location = useLocation();

  // useEffect(() => {
  //   if (location.pathname === "/new-report") {
  //     dispatch(
  //       setSession({
  //         session_data: {},
  //       }),
  //     );
  //   }
  // }, [location, dispatch]);

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
  useEffect(() => {
    // Check if the condition is met to update the session and active step
    const isConditionMet =
      useCases.length > 0 && activeStep < 5 && questionWithUsecase.length === activeIndex;

    if (isConditionMet) {
      dispatch(
        setSession({
          session_data: {
            ...sessionDetail,
            step_id: 5,
          },
        }),
      );
      changeActiveStep(5);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  //
  const steps = [
    // {
    //   label: "",
    //   value: 0,
    //   // component: <UseCaseSelect changeActiveStep={changeActiveStep} />,
    // },
    // // {
    // //   label: "",
    // //   value: 1,
    // //   component: <KeywordSelection changeActiveStep={changeActiveStep} />,
    // // },
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
      label: "",
      value: 3,
      component: (
        <ChatQuestionAnswer
          changeActiveStep={changeActiveStep}
          activeStep={activeStep}
          question={question}
          activeIndex={activeIndex}
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
          activeIndex={activeIndex}
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
      component: <EditQuestion changeActiveStep={changeActiveStep} exampleAnswer={""} />,
    },
  ];

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
        <BackButton path={"interaction-method"} />
        <h5 className="text-5xl font-[800] my-2">Detailed Q&A</h5>
        {/* {activeStep > 1 && activeStep < 7 && ( */}
        <div className="w-full overflow-hidden">
          <IPStepper steps={questionWithUsecase} activeStep={activeIndex} />
        </div>
        {/* )}s */}
        <div className="flex">
          <div
            className={classNames(
              "relative min-h-[calc(100vh-400px)] md:min-h-[calc(100vh-400px)] xl:min-h-[calc(100vh-920px)] 2xl:min-h-full max-h-full w-ful shadow border rounded-md p-2 mt-2.5 w-[932px] bg-white",
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

          <div className="flex-shrink-0"></div>
        </div>
      </div>
    </>
  );
}
