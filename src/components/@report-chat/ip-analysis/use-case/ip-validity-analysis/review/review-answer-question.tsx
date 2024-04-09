import React from "react";
import EditIcon from "../../../../../icons/miscs/Edit";

interface Props {
  question: string;
  answer: string;
  onEdit: (value: number) => void;
}
const ReviewQuestionAnswer = ({ question, answer, onEdit }: Props) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <div className="bg-primary-900 font-medium text-white px-2 py-1">
        {/* {answer_select.novelty_aspect.answer} */}
        {question}
      </div>
      <div className="bg-appGray-100">
        <ul className="list-disc px-2.5 ml-2 mr-6 py-1">
          <li>
            <div className="flex justify-between items-start gap-2.5">
              <p className="text-secondary-800 font-medium w-[760px]">{answer}</p>
              <button type="button" className="flex-shrink-0" onClick={() => onEdit}>
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
