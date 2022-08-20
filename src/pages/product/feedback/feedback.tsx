import classNames from "classnames";
import { useState } from "react";
import Button from "../../../components/reusable/button";

export default function Feedback() {
  const [feedbackNumber, setFeedbackNumber] = useState<number | null>(null);

  const handleFeedbackNumberChange = (number: number) => {
    setFeedbackNumber(number);
  };
  return (
    <div className="pt-16 text-appGray-900">
      <div className="font-semibold text-2xl">Feedback</div>
      <div className="mt-10">
        <div className="mb-10">
          <div className="text-[22px] font-semibold text-primary-900 mb-8">
            How satisfied are you with the overall experience?
          </div>

          <div>
            <FeedbackInput
              activeNumber={feedbackNumber}
              handleChange={handleFeedbackNumberChange}
            />
          </div>
        </div>
        <div className="mb-10">
          <div className="text-[22px] font-semibold text-primary-900 mb-8">
            Let us know how we can better serve your needs
          </div>

          <div>Comments</div>
        </div>
        <Button disabled>Submit Feedback</Button>
      </div>
    </div>
  );
}

function FeedbackInput({ activeNumber, handleChange }: IFeedbackInput) {
  return (
    <div className="w-min">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={classNames(
              "flex items-center justify-center py-[12px] px-5 shadow-md border text-xl rounded-md cursor-pointer ease-in duration-150	",
              i !== 5 && "mr-3",
              activeNumber === i && "bg-primary-900 text-white"
            )}
            onClick={() => handleChange(i)}
          >
            {i}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2">
        <div>Not Satisfied</div>
        <div>Very Satisfied</div>
      </div>
    </div>
  );
}

interface IFeedbackInput {
  activeNumber: number | null;
  handleChange: (number: number) => void;
}
