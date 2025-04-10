// import EditIcon from "../../../icons/miscs/Edit";
/* eslint-disable @typescript-eslint/no-unused-vars */

interface Props {
  question: string;
  answer: string;
  onEdit: (...values: any) => void;
}
const ReviewQuestionAnswer = ({
  question,
  answer,
}: // onEdit
Props) => {
  const formatedAnswer = answer.replace(/\n/g, "<br>");

  return (
    <div className="rounded-lg overflow-hidden">
      <div
        className="bg-primary-900 font-medium text-white px-2 py-1"
        dangerouslySetInnerHTML={{ __html: question }}
      />
      <div className="bg-appGray-100">
        <ul className="px-2.5 py-1">
          <li>
            <div className="flex justify-between items-start gap-2.5">
              <p
                className="text-secondary-800 font-medium text-justify"
                dangerouslySetInnerHTML={{ __html: formatedAnswer }}
              />
              {/* <button type="button" className="flex-shrink-0 w-[20px]" onClick={onEdit}>
                <EditIcon className="w-2 h-2" />
              </button> */}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReviewQuestionAnswer;
