import classNames from "classnames";
import { useEffect, useState } from "react";

//
import Input from "../../../components/reusable/input";
import Button from "../../../components/reusable/button";

/**
 *
 */
export default function FeedbackPage() {
  const [feedbackNumber, setFeedbackNumber] = useState<number | null>(null);
  // const [feedback, setFeedback] = useState<string | undefined>();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (feedbackNumber) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [feedbackNumber]);

  const handleFeedbackNumberChange = (number: number) => {
    setFeedbackNumber(number);
  };

  // const handleFeedbackChange = (value: string) => {
  //   setFeedback(value);
  // };

  const handleSubmit = () => {
    // TODO: submit feedback
  };

  return (
    <div className="border border-black rounded-xl my-auto">
      <div className="text-appGray-900 py-3 px-4">
        <div className="font-semibold text-2xl">Feedback</div>

        <div className="mt-4">
          <div className="mb-4">
            <div className="text-[22px] font-semibold text-primary-900 mb-4">
              How satisfied are you with the overall experience?
            </div>

            <FeedbackInput activeNumber={feedbackNumber} handleChange={handleFeedbackNumberChange} />
          </div>

          <div className="mb-5 max-w-[580px]">
            <div className="text-[22px] font-semibold text-primary-900 mb-4">
              Let us know how we can better serve your needs
            </div>

            <Input
              type="textarea"
              placeholder="Enter your feedback"
              label="Comment"
            // value={feedback}
            // handleChange={handleFeedbackChange}
            />
          </div>

          <Button disabled={isSubmitDisabled} handleClick={handleSubmit}>
            Submit Feedback
          </Button>
        </div>
      </div>
    </div>
  );
}

function FeedbackInput({ activeNumber, handleChange }: IFeedbackInput) {
  return (
    <div className="w-min">
      <div className="flex gap-x-3">
        {[1, 2, 3, 4, 5].map((feedbackNumber) => (
          <div
            key={feedbackNumber}
            className={classNames(
              "flex items-center justify-center py-[12px] px-4 shadow-md border text-xl rounded-md cursor-pointer ease-in duration-150",
              "hover:bg-primary-50 hover:text-primary-900 hover:border-primary-50",
              {
                "border-primary-900 bg-primary-900 text-white cursor-default hover:bg-primary-900 hover:text-white":
                  activeNumber === feedbackNumber,
              },
            )}
            onClick={() => handleChange(feedbackNumber)}
          >
            {feedbackNumber}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-1 text-appGray-500">
        <div>Not Satisfied</div>
        <div>Very Satisfied</div>
      </div>
    </div>
  );
}

interface IFeedbackInput {
  activeNumber: number | null;
  handleChange: (value: number) => void;
}
