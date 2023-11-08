import { FunctionComponent } from "react";
import classNames from "classnames";

import { IStep } from "../../../@types/entities/IStep";

import { CheckIcon } from "../../icons";

interface Props {
  steps: IStep[];
  activeStep: number;
}

export const Stepper: FunctionComponent<Props> = ({ steps, activeStep }) => {
  const isStepComplete = (currentStep: number) => activeStep > currentStep;
  return (
    <>
      <ol className="flex items-center mx-auto mb-8 w-4/5">
        {steps.map((step, idx, arr) => (
          <li
            key={idx}
            className={classNames(
              activeStep === step.value ? "text-primary-900" : "text-gray-500",
              arr.length - 1 === idx
                ? "flex items-center"
                : "flex w-full items-center   after:content-[''] after:w-full after:h-0.25 after:border-b after:border-gray-500 after:border-1 after:bg-primary-900  after:inline-block after:-mt-6",
            )}
          >
            <div className="flex flex-col items-center">
              <div
                className={classNames(
                  isStepComplete(step.value) && "bg-success-500 text-success-500",
                  activeStep === step.value ? "bg-primary-900 text-white" : "bg-gray-200 ",
                  "flex items-center justify-center  rounded-full lg:h-3 lg:w-3 shrink-0",
                )}
              >
                {isStepComplete(step.value) ? (
                  <CheckIcon className="text-white w-5 h-5" />
                ) : (
                  <span className="font-bold">{step.value}</span>
                )}
              </div>
              <span
                className={classNames(
                  isStepComplete(step.value) && "text-success-500",
                  "text-center ",
                )}
              >
                {step.label}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
};
