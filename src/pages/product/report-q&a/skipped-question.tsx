import { useCallback } from "react";
import { useAppDispatch } from "src/hooks/redux";
import {
  removeFromSkippedQuestionList,
  setCurrentQuestionId,
  updateNewQuestionList,
} from "src/stores/Q&A";

interface IQuestionUsecase {
  questionId: number;
  useCaseId: number;
  question: string;
  usecase: string;
  answer: string;
}

interface Props {
  questions: IQuestionUsecase[];
  questionWithUsecase?: IQuestionUsecase[];
}

const SkippedQuestion = ({ questions }: Props) => {
  const dispatch = useAppDispatch();

  console.log(questions);

  const handleQuestionSelect = useCallback(
    (question: IQuestionUsecase) => {
      dispatch(
        removeFromSkippedQuestionList({
          question: question.question,
          useCaseId: question.useCaseId,
          exampleAnswer: question.answer,
          answer: "",
          usecase: question.usecase,
          questionId: question.questionId,
        }),
      );
      dispatch(setCurrentQuestionId(question.questionId));
      dispatch(
        updateNewQuestionList({
          currentId: question.questionId,
          questionAnswer: {
            question: question.question,
            useCaseId: question.useCaseId,
            exampleAnswer: question.answer,
            answer: "",
            usecase: question.usecase,
            questionId: question.questionId,
          },
        }),
      );
    },
    [dispatch],
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
