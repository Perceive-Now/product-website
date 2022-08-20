import classNames from "classnames";
import { useEffect, useState } from "react";
import Button from "../../../components/reusable/button";
import Input from "../../../components/reusable/input";

export default function Feedback() {
  const [feedbackNumber, setFeedbackNumber] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | undefined>();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (feedbackNumber && feedback) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [feedbackNumber, feedback]);

  const handleFeedbackNumberChange = (number: number) => {
    setFeedbackNumber(number);
  };

  const handleFeedbackChange = (e: any) => {
    setFeedback(e.target.value);
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
        <div className="mb-10 max-w-[580px]">
          <div className="text-[22px] font-semibold text-primary-900 mb-8">
            Let us know how we can better serve your needs
          </div>
          <Input
            type="textarea"
            placeholder="example@gmail.com"
            label="Comment"
            value={feedback}
            handleChange={handleFeedbackChange}
          />
        </div>
        <Button disabled={isSubmitDisabled}>Submit Feedback</Button>
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
