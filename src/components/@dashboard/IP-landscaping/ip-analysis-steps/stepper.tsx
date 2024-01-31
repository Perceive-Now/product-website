import { FunctionComponent } from "react";
import classNames from "classnames";
import { IStep } from "../../../../@types/entities/IStep";

interface Props {
  steps: IStep[];
  activeStep: number;
}

const IPStepper: FunctionComponent<Props> = ({ steps, activeStep }) => {
  const isStepComplete = (currentStep: number) => activeStep > currentStep;
  return (
    <>
      <ol className="mb-8 space-y-[1px] rounded-md overflow-hidden">
        {steps.map((step, idx, arr) => (
          <li
            key={idx}
            className={classNames(
              "py-0.5 px-[10px] overflow-hidden",
              (idx === 0 || idx === 10) && "hidden",
              isStepComplete(step.value) && "bg-primary-800 text-white",
              activeStep === step.value
                ? "text-black bg-primary-100"
                : " bg-appGray-100 text-primary-900",
            )}
          >
            <div className="flex items-center gap-x-1">
              {/* <div
                className={classNames(
                  // activeStep === 0 && "hidden",
                  isStepComplete(step.value) && "bg-primary-800",
                  activeStep === step.value ? "bg-primary-900 text-white" : "bg-appGray-100 ",
                  " rounded-full w-4 h-4 flex items-center justify-center font-bold text-sm shrink-0 duration-500 ease-in-out",
                )}
              >
                {step.value}
              </div> */}
              <span className={classNames("text-center truncate text-sm")}>{step.label}</span>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
};

export default IPStepper;
