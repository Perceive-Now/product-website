import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
//
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
//
//
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
//
import SkippedQuestion from "./skipped-question";
import ReportChatQuestionAnswer from "src/components/@report-chat/Q&A/Question";
import IPReview from "src/components/@report-chat/Q&A/review/review";
//
import {
  QAPages,
  decrementStep,
  questionWithUseCases,
  setCurrentPageId,
  setCurrentQuestionId,
} from "src/stores/Q&A";

import DetailQAProgressBar from "src/components/@report-chat/Q&A/progress-bar";
import EditQuestionAnswer from "src/components/@report-chat/Q&A/edit-Q&A";

/**
 *
 */
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
    if (useCases && useCases.length > 0) {
      return questionsList.filter(
        (q) => q.usecase === "common-question" || useCases.includes(q.usecase),
      );
    }
  }, [questionsList, useCases]);

  useEffect(() => {
    if (questionWithUsecase && questionWithUsecase?.length > 0) {
      dispatch(questionWithUseCases(questionWithUsecase));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const question = useMemo(
    () =>
      questionWithUsecase?.find((q) => {
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
  //
  const QAPagesList = [
    {
      id: 1,
      title: "",
      description: "",
      Component: (
        <ReportChatQuestionAnswer
          question={question}
          questionWithUsecase={questionWithUsecase || []}
        />
      ),
    },
    {
      id: 2,
      title: "",
      description: "",
      Component: <IPReview />,
    },
    {
      id: 3,
      title: "",
      description: "",
      Component: <EditQuestionAnswer />,
    },
  ];

  const onBack = useCallback(() => {
    const prevQuestionIndex = questionWithUsecase?.findIndex(
      (questionId) => currentQuestionId === questionId.questionId,
    );
    const QIndex = questionWithUsecase?.findIndex((q) => q.questionId === currentQuestionId);
    if (currentPageId === 3) {
      dispatch(setCurrentPageId(QAPages.Review));
    } else if (QIndex === 0) {
      navigate("/interaction-method");
    } else if (currentPageId === 2) {
      dispatch(setCurrentPageId(QAPages.QA));
    } else {
      dispatch(setCurrentQuestionId(prevQuestionIndex || 0));
      dispatch(decrementStep());
    }
  }, [currentPageId, currentQuestionId, dispatch, navigate, questionWithUsecase]);

  return (
    <div className="w-full">
      <button className="flex flex-row gap-x-1 font-bold text-secondary-800 w-fit" onClick={onBack}>
        <ArrowLeftIcon /> Back
      </button>
      <h5 className="text-5xl font-[800] my-2">Detailed Q&A</h5>
      <div className="w-full overflow-hidden">
        <DetailQAProgressBar
          questionWithUsecase={questionWithUsecase || ([] as any)}
          QAPagesList={QAPagesList}
        />
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
        {currentPageId !== 2 && (
          <div className="flex-shrink-0 2xl:w-[300px]">
            {<SkippedQuestion questions={skippedQuestionList || []} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPage;
