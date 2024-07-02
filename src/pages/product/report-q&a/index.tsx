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

import DetailQAProgressBar from "src/components/@report/Q&A/progress-bar";
import EditQuestionAnswer from "src/components/@report/Q&A/edit-Q&A";
import { questionList } from "./_question";
import { LiquidSphereLoaderIcon } from "src/components/icons";

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

  const totalQuestions = questionsList.length + skippedQuestionList.length;
  const answeredQuestion = questionsList.filter((q) => q.answer !== "").length;
  const percentage = Math.round((answeredQuestion / totalQuestions) * 100);

  useEffect(() => {
    if (sessionDetail?.use_cases) {
      setUseCases(sessionDetail?.use_cases);
    }
  }, [sessionDetail]);

  //
  const questionWithUsecase = useMemo(() => {
    if (useCases && useCases.length > 0 && questionsList.length === 0) {
      return questionList
        .filter((q) => q.usecase === "common-question" || useCases.includes(q.usecase))
        .map((q) => ({
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

  console.log(percentage);

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
        <div>
          <div className="h-[60px] min-w-[60px] max-w-[61px] grid grid-cols-1 justify-center items-center grid-rows-1 overflow-hidden">
            <LiquidSphereLoaderIcon className="row-start-1 col-start-1" percentage={percentage} />
            <p className="col-start-1 row-start-1 text-white flex flex-row items-center justify-center text-center w-full mix-blend-difference">
              <>{percentage}%</>
            </p>
          </div>
          {currentPageId !== 2 && (
            <div className="flex-shrink-0 lg:w-[300px]">
              {<SkippedQuestion questions={skippedQuestionList || []} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
