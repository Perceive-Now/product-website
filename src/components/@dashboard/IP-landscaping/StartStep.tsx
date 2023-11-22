import React, { FunctionComponent, useCallback } from "react";
import Button from "../../reusable/button";
import KeywordSelected from "./KeywordSelected";

interface Props {
  changeActiveStep: (steps: number) => void;
}

const StartStep: FunctionComponent<Props> = ({ changeActiveStep }) => {
  const onContinue = useCallback(() => {
    changeActiveStep(1);
  }, [changeActiveStep]);
  //

  return (
    <div className="xl:w-[620px]">
      <h4 className="text-secondary-800 text-4xl	">IP Landscaping</h4>
      <h6 className="text-secondary-800 mt-2">Let’s add more info to create your report</h6>

      <KeywordSelected />

      <div className="mt-4">
        <Button htmlType={"button"} rounded={"large"} handleClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default StartStep;
