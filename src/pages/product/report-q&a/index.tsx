import { useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";

import { useAppDispatch, useAppSelector } from "src/hooks/redux";

import IPStepper from "src/components/@report-chat/ip-analysis/stepper";

import ArrowLeftIcon from "src/components/icons/common/arrow-left";

import SkippedQuestion from "./skipped-question";
import ReportChatQuestionAnswer from "src/components/@report-chat/Q&A/Question";
import IPReview from "src/components/@report-chat/ip-analysis/use-case/review/review";
import { useNavigate } from "react-router-dom";
import { questionWithUseCases, setCurrentQuestionId } from "src/stores/Q&A";

const ReportPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [useCases, setUseCases] = useState<string[]>([]);

  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);
  const { questionsList, currentQuestionId, skippedQuestionList, currentPageId } = useAppSelector(
    (state) => state.QA,
  );

  useEffect(() => {
    if (sessionDetail?.use_cases) {
      setUseCases(sessionDetail?.use_cases);
    }
  }, [sessionDetail]);

  const questionWithUsecase = useMemo(() => {
    if (useCases.length > 0) {
      return questionsList.filter(
        (q) => q.usecase === "common-question" || useCases.includes(q.usecase),
      );
    }
  }, [questionsList, useCases]);

  useEffect(() => {
    if (questionWithUsecase && questionWithUsecase?.length > 0) {
      dispatch(questionWithUseCases(questionWithUsecase as any));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const question = useMemo(
    () =>
      questionsList.find((q) => {
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
    [currentQuestionId, questionsList],
  );

  const QAPagesList = [
    {
      id: 1,
      totalPages: 1,
      title: "",
      description: "",
      Component: <ReportChatQuestionAnswer question={question} />,
    },
    {
      id: 2,
      totalPages: 1,
      title: "",
      description: "",
      Component: (
        <IPReview
          changeActiveStep={() => {
            console.log("");
          }}
        />
      ),
    },
  ];

  const onBack = useCallback(() => {
    const prevQuestionIndex = questionsList.findIndex(
      (questionId) => currentQuestionId === questionId.questionId,
    );
    const QIndex = questionsList.findIndex((q) => q.questionId === currentQuestionId);
    if (QIndex === 0) {
      navigate("/interaction-method");
    } else {
      dispatch(setCurrentQuestionId(prevQuestionIndex));
    }
  }, [currentQuestionId, dispatch, navigate, questionsList]);

  return (
    <div className="w-full">
      <button className="flex flex-row gap-x-1 font-bold text-secondary-800 w-fit" onClick={onBack}>
        <ArrowLeftIcon /> Back
      </button>
      <h5 className="text-5xl font-[800] my-2">Detailed Q&A</h5>
      <div className="w-full overflow-hidden">
        <IPStepper steps={questionsList as any} activeStep={currentQuestionId} />
      </div>
      <div className="flex mt-2.5 justify-between gap-8">
        <div
          className={classNames(
            "relative min-h-[calc(100vh-400px)] md:min-h-[calc(100vh-400px)] xl:min-h-[calc(100vh-920px)] 2xl:min-h-full max-h-full shadow border rounded-md w-[932px] p-2 bg-white",
            currentPageId === 2 ? "mx-auto" : "",
          )}
        >
          <div
            className={`flex flex-col gap-y-5 transition duration-500 ease-in-out  h-full w-full `}
          >
            {QAPagesList.map((step, idx) => (
              <div
                key={idx}
                className={classNames("px-1 h-full w-full", currentPageId !== step.id && "hidden")}
              >
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
