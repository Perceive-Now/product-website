import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { setSession } from "src/stores/session";

interface IQuestion {
  questionId: number;
  question: string;
  answer: string;
}

interface IQuestionUsecase {
  questionId: number;
  useCaseId: number;
  question: string;
  usecase: string;
  answer: string;
}

interface Props {
  questions: IQuestion[];
  questionWithUsecase: IQuestionUsecase[];
}

const SkippedQuestion = ({ questions, questionWithUsecase }: Props) => {
  const dispatch = useAppDispatch();

  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);

  const handleQuestionSelect = useCallback(
    (question: IQuestion) => {
      const updateQA = {
        question_id: question.questionId,
        question: question.question,
        example_answer: question.answer,
      };
      dispatch(
        setSession({
          session_data: {
            ...sessionDetail,
            question_id: question.questionId,
            step_id: 9,
            hasSkippedQuestion: false,
            active_index: questionWithUsecase.findIndex(
              (q) => q.questionId === question.questionId,
            ),
            user_chat: updateQA,
          },
        }),
      );
    },
    [dispatch, questionWithUsecase, sessionDetail],
  );

  return (
    <div>
      <h4 className="text-primary-900 text-ls font-semibold px-[12px]">Skipped questions</h4>
      <div className="space-y-1 mt-1">
        {questions.map((question, idx) => (
          <p
            key={idx * 59}
            onClick={() => handleQuestionSelect(question)}
            className="text-secondary-800 px-[12px] line-clamp-1 hover:text-primary-900 hover:cursor-pointer"
          >
            <span className="py-1">{question.question}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default SkippedQuestion;
