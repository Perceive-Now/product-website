import EditIcon from "../../../../icons/miscs/Edit";

interface Props {
  question: string;
  answer: string;
  onEdit: (...values: any) => void;
}
const ReviewQuestionAnswer = ({ question, answer, onEdit }: Props) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <div
        className="bg-primary-900 font-medium text-white px-2 py-1"
        dangerouslySetInnerHTML={{ __html: question }}
      />
      <div className="bg-appGray-100">
        <ul className="list-disc px-2.5 ml-2 py-1">
          <li>
            <div className="flex justify-between items-start gap-2.5">
              <p
                className="text-secondary-800 font-medium text-justify"
                dangerouslySetInnerHTML={{ __html: answer }}
              />
              <button type="button" className="flex-shrink-0 w-[20px]" onClick={onEdit}>
                <EditIcon className="w-2 h-2" />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReviewQuestionAnswer;
