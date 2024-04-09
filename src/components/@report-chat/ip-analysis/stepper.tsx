import { FunctionComponent } from "react";
import classNames from "classnames";
// import { IStep } from "../../../@types/entities/IStep";

interface Props {
  steps: any[];
  activeStep: number;
}

const IPStepper: FunctionComponent<Props> = ({ steps, activeStep }) => {
  const isStepComplete = (currentStep: number) => activeStep > currentStep;
  return (
    <>
      <ol className="flex items-center overflow-hidden w-full">
        {steps.slice(0, 14).map((step, idx) => (
          <li
            key={idx}
            className={classNames(
              "py-0.5 px-[10px] bg-appGray-100 w-full",
              // (idx === 0 || idx === 1) && "hidden",
              isStepComplete(step.questionId) && "bg-primary-800",
            )}
          ></li>
        ))}
      </ol>
    </>
  );
};

export default IPStepper;
