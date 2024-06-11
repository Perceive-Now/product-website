import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { setSession } from "src/stores/session";

interface IQuestion {
  questionId: number;
  question: string;
  answer: string;
}

interface Props {
  questions: IQuestion[];
}

const SkippedQuestion = ({ questions }: Props) => {
  const dispatch = useAppDispatch();

  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);

  const handleQuestionSelect = useCallback(
    (question: IQuestion) => {
      dispatch(
        setSession({
          session_data: {
            ...sessionDetail,
            question_id: question.questionId,
            step_id: 3,
            active_index: question.questionId - 1,
          },
        }),
      );
    },
    [dispatch, sessionDetail],
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
