import React, { useCallback } from "react";
import Button from "../../../../../reusable/button";
import jsCookie from "js-cookie";

interface Props {
  changeActiveStep: (steps: number) => void;
}

const Thankyou = ({ changeActiveStep }: Props) => {
  const onContinue = useCallback(() => {
    jsCookie.set("questionId", String(0));
    jsCookie.set("commonQuestionId", String(0));
    changeActiveStep(0);
  }, [changeActiveStep]);

  return (
    <div className="h-[500px] flex flex-col items-center justify-center gap-10">
      <div>
        <h6 className="text-2xl font-bold text-secondary-800 text-center">
          Thank you for providing all the answers
        </h6>
        <p className="text-secondary-800">
          {/* If you'd like to take another look and make any changes, feel free to do so. Otherwise,
          you can go ahead and generate your report. */}
          we will be following up with the report to your email in 2 business days.
        </p>
      </div>
      <div className="flex items-center gap-1">
        {/* <Button
          htmlType={"button"}
          type="default"
          handleClick={() => changeActiveStep(15)}
          classname="text-primary-900"
        >
          Review answers
        </Button> */}
        <Button
          htmlType={"button"}
          rounded={"large"}
          classname="font-semibold"
          handleClick={onContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Thankyou;
