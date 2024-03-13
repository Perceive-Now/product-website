import React, { useCallback } from "react";
import Button from "../../../../reusable/button";

interface Props {
  changeActiveStep: (steps: number) => void;
}

const Thankyou = ({ changeActiveStep }: Props) => {
  const onContinue = useCallback(() => {
    changeActiveStep(16);
  }, [changeActiveStep]);

  return (
    <div className="h-[264px] flex flex-col items-center justify-between">
      <div>
        <h6 className="text-xl font-medium text-secondary-800">
          Thank you for providing all the answers
        </h6>
        <p className="text-secondary-800">
          If you'd like to take another look and make any changes, feel free to do so. Otherwise,
          you can go ahead and generate your report.
        </p>
      </div>
      <div className="flex items-center gap-1">
        <Button
          htmlType={"button"}
          type="default"
          handleClick={() => changeActiveStep(15)}
          classname="text-primary-900"
        >
          Review answers
        </Button>
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
