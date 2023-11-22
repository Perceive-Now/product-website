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
      <ol className="mb-8 space-y-1">
        {steps.map((step, idx, arr) => (
          <li
            key={idx}
            className={classNames(
              idx === 0 && "hidden",
              activeStep === step.value ? "text-primary-900" : "text-gray-500",
            )}
          >
            <div className="flex items-center gap-x-1">
              <div
                className={classNames(
                  // activeStep === 0 && "hidden",
                  isStepComplete(step.value) && "bg-primary-800",
                  activeStep === step.value ? "bg-primary-900 text-white" : "bg-appGray-100 ",
                  " rounded-full w-4 h-4 flex items-center justify-center font-bold text-sm shrink-0 duration-500 ease-in-out",
                )}
              >
                {/* {step.value} */}
                {/* <span className="bg-appGray-100 rounded-full w-4 h-4 flex items-center justify-center text-gray-600 font-bold text-sm shrink-0"></span> */}
                {isStepComplete(step.value) ? (
                  <CheckIcon className="text-white w-5 h-5" />
                ) : (
                  <>{step.value}</>
                )}
              </div>
              <span
                className={classNames(
                  // isStepComplete(step.value) && "text-success-500",
                  "text-center text-secondary-800",
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
