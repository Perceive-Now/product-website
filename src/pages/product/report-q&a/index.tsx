import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";

import { useAppDispatch, useAppSelector } from "src/hooks/redux";

import IPStepper from "src/components/@report-chat/ip-analysis/stepper";

import ArrowLeftIcon from "src/components/icons/common/arrow-left";

import SkippedQuestion from "./skipped-question";
import ReportChatQuestionAnswer from "src/components/@report-chat/Q&A/Question";
import IPReview from "src/components/@report-chat/ip-analysis/use-case/review/review";

const ReportPage = () => {
  const [useCases, setUseCases] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);
  const { questionsList, currentQuestionId, skippedQuestionList } = useAppSelector(
    (state) => state.QA,
  );

  useEffect(() => {
    if (sessionDetail?.use_cases) {
      setUseCases(sessionDetail?.use_cases);
    }
  }, [sessionDetail]);

  const questionWithUsecase = useMemo(() => {
    return questionsList.filter(
      (q) => q.usecase === "common-question" || useCases.includes(q.usecase),
    );
  }, [questionsList, useCases]);

  const question = useMemo(
    () =>
      questionWithUsecase.find((q) => {
        if (q.questionId === currentQuestionId) {
          return q;
        }
      }) || {
        questionId: Number(currentQuestionId),
        question: "",
        usecase: "",
        answer: "",
        useCaseId: 0,
        exampleAnswer: "",
      },
    [currentQuestionId, questionWithUsecase],
  );
  const QAPagesList = [
    {
      id: 1,
      totalPages: 1,
      title: "Upload Attachments",
      description: "Upload the attachement files",
      Component: <ReportChatQuestionAnswer question={question} />,
    },
    {
      id: 2,
      totalPages: 1,
      title: "Upload Attachments",
      description: "Go to report and payement all set thing",
      Component: (
        <IPReview
          changeActiveStep={() => {
            console.log("");
          }}
        />
      ),
    },
  ];

  // const onBack = useCallback(() => {
  //   if (activeIndex === 0) {
  //     navigate("/interaction-method");
  //   } else {
  //     dispatch(
  //       setSession({
  //         session_data: {
  //           ...sessionDetail,
  //           question_id: questionId,
  //           step_id: 3,
  //           active_index: activeIndex - 1,
  //         },
  //       }),
  //     );
  //   }
  // }, [activeIndex, dispatch, navigate, questionId, sessionDetail]);

  return (
    <div className="w-full">
      <button
        className="flex flex-row gap-x-1 font-bold text-secondary-800 w-fit"
        // onClick={onBack}
      >
        <ArrowLeftIcon /> Back
      </button>
      <h5 className="text-5xl font-[800] my-2">Detailed Q&A</h5>
      <div className="w-full overflow-hidden">
        <IPStepper steps={questionWithUsecase} activeStep={currentQuestionId} />
      </div>
      <div className="flex mt-2.5 justify-between gap-8">
        <div
          className={classNames(
            "relative min-h-[calc(100vh-400px)] md:min-h-[calc(100vh-400px)] xl:min-h-[calc(100vh-920px)] 2xl:min-h-full max-h-full shadow border rounded-md w-[932px] p-2 bg-white",
            // sessionDetail?.step_id === 6 ? "mx-auto" : "",
          )}
        >
          <div
            className={`flex flex-col gap-y-5 transition duration-500 ease-in-out  h-full w-full `}
          >
            {QAPagesList.map((step, idx) => (
              <div key={idx} className={classNames("px-1 h-full w-full")}>
                {step.Component}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 2xl:w-[300px]">
          {skippedQuestionList.length > 0 && <SkippedQuestion questions={skippedQuestionList} />}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
