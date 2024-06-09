import { FunctionComponent } from "react";
import classNames from "classnames";

interface Props {
  steps: any[];
  activeStep: number;
}

const IPStepper: FunctionComponent<Props> = ({ steps, activeStep }) => {
  const isStepComplete = (currentStep: number) => activeStep >= currentStep;

  return (
    <>
      <ol className="flex items-center overflow-hidden w-full">
        {steps.map((step, idx) => (
          <li
            key={idx}
            className={classNames(
              "py-0.5 px-[10px] bg-primary-900 w-full",
              isStepComplete(idx) && "bg-secondary-500",
            )}
          ></li>
        ))}
      </ol>
    </>
  );
};

export default IPStepper;
