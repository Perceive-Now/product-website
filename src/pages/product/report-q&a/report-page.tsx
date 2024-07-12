import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

//
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
//
import ArrowLeftIcon from "src/components/icons/common/arrow-left";

//
import SkippedQuestion from "./skipped-question";
import ReportChatQuestionAnswer from "src/components/@report/Q&A/Question";
import IPReview from "src/components/@report/Q&A/review/review";

//
import {
  QAPages,
  decrementStep,
  questionWithUseCases,
  setCurrentPageId,
  setCurrentQuestionId,
} from "src/stores/Q&A";

//
import DetailQAProgressBar from "src/components/@report/Q&A/progress-bar";
import EditQuestionAnswer from "src/components/@report/Q&A/edit-Q&A";
import { LiquidSphereLoaderIcon } from "src/components/icons";

//
import { NewQAList } from "./_new-question";
import ToolTip from "src/components/reusable/tool-tip";

/**
 *
 */
const ReportDetailedQAPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [useCases, setUseCases] = useState<string[]>([]);

  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);

  const { questionsList, currentQuestionId, skippedQuestionList, currentPageId } = useAppSelector(
    (state) => state.QA,
  );

  // Percentage calculation
  const totalQuestions = questionsList.length + skippedQuestionList.length;
  const answeredQuestion = questionsList.filter((q) => q.answer !== "").length;
  const percentage = Math.round((answeredQuestion / totalQuestions) * 100);

  useEffect(() => {
    if (sessionDetail?.use_cases) {
      setUseCases(sessionDetail?.use_cases);
    }
  }, [sessionDetail]);

  const questionWithUsecase = useMemo(() => {
    if (useCases && useCases.length > 0 && questionsList.length === 0) {
      return NewQAList.filter(
        (q) => q.usecase === "common-question" || useCases.includes(q.usecase),
      ).map((q) => ({
        question: q.question,
        questionId: q.questionId,
        useCaseId: q.useCaseId,
        usecase: q.usecase,
        answer: "",
        exampleAnswer: q.answer, // Assigning the answer to exampleAnswer
      }));
    } else {
      return questionsList;
    }
  }, [questionsList, useCases]);

  useEffect(() => {
    if (questionWithUsecase && questionWithUsecase?.length > 0) {
      dispatch(questionWithUseCases(questionWithUsecase));
    }
  }, [dispatch, questionWithUsecase]);

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
    const currentIndex = questionWithUsecase?.findIndex((q) => q.questionId === currentQuestionId);
    const prevQiestionId =
      questionWithUsecase && currentIndex && questionWithUsecase[currentIndex - 1].questionId;
    if (currentPageId === 3) {
      dispatch(setCurrentPageId(QAPages.Review));
    } else if (currentIndex === 0) {
      navigate("/interaction-method");
    } else if (currentPageId === 2) {
      dispatch(setCurrentPageId(QAPages.QA));
    } else {
      dispatch(setCurrentQuestionId(prevQiestionId || 0));
      dispatch(decrementStep());
    }
  }, [currentPageId, currentQuestionId, dispatch, navigate, questionWithUsecase]);

  return (
    <div className="w-full">
      <div className="">
        <button
          type="button"
          className="flex items-center flex-row gap-x-1 font-bold text-secondary-800 w-fit"
          onClick={onBack}
        >
          <ToolTip title="Back">
            <ArrowLeftIcon />
          </ToolTip>
          <span className="text-3xl font-[800]">Detailed Q&A</span>
        </button>

        <div className="w-full overflow-hidden">
          <DetailQAProgressBar
            questionWithUsecase={questionWithUsecase || ([] as any)}
            QAPagesList={QAPagesList}
          />
        </div>
      </div>

      <div className="flex justify-between gap-2 2xl:gap-8">
        <div
          className={classNames(
            "relative h-[calc(100vh-176px)] shadow border rounded-md  p-2 pb-0 bg-white grow-0",
            currentPageId === 2 ? "mx-auto w-full xl:w-[900px]" : "w-full",
          )}
        >
          <div
            className={`flex flex-col gap-y-5 transition duration-500 ease-in-out  h-full w-full `}
          >
            {QAPagesList.map((step, idx) => (
              <div
                key={idx}
                className={classNames(
                  "px-1 h-full w-full relative",
                  currentPageId !== step.id && "hidden",
                )}
              >
                {step.Component}
              </div>
            ))}
          </div>
        </div>
        <div className="shrink-0">
          <div className="h-[60px] min-w-[60px] max-w-[61px] grid grid-cols-1 justify-center items-center grid-rows-1 overflow-hidden mb-2 ml-0.5">
            <LiquidSphereLoaderIcon
              className="row-start-1 col-start-1"
              percentage={!Number.isNaN(percentage) ? percentage : 0}
            />
            <p className="col-start-1 row-start-1 text-white flex flex-row items-center justify-center text-center w-full mix-blend-difference">
              {percentage}%
            </p>
          </div>
          {currentPageId !== 2 && (
            <div>
              <h4 className="text-primary-900 font-semibold px-[12px] border-b pb-0.5 mb-0.5">
                Skipped questions
              </h4>
              <div className="shrink-0 w-[260px] 2xl:w-[300px] h-[calc(100vh-280px)] overflow-auto pn_scroller">
                {<SkippedQuestion questions={skippedQuestionList || []} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportDetailedQAPage;
