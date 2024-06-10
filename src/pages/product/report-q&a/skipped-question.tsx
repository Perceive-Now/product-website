interface IQuestion {
  questionId: number;
  question: string;
  answer: string;
}

interface Props {
  questions: IQuestion[];
}

const SkippedQuestion = ({ questions }: Props) => {
  return (
    <div>
      <h4 className="text-primary-900 text-ls font-semibold px-[12px]">Skipped questions</h4>
      <div className="space-y-1 mt-1">
        {questions.map((question, idx) => (
          <p
            key={idx * 59}
            // onClick={}
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
