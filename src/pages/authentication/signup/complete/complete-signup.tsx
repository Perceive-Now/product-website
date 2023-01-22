import classNames from "classnames";
import { useEffect, useState } from "react";

//
import { CheckIcon } from "../../../../components/icons";

import {
  ChoosePlanStep,
  CompanyDetailsStep,
  ConfirmDetailsStep,
  IpPortfolioStep,
  PaymentStep,
  UserProfileStep,
} from "../../../../components/@signup-complete";

//
import PerceiveLogo from "../../../../assets/images/logo.svg";

//
import "./complete-signup.css";

//
const steps: IStepItem[] = [
  {
    key: "user-profile",
    title: "User Profile",
  },
  {
    key: "company-details",
    title: "Company Details",
  },
  {
    key: "ip-portfolio",
    title: "IP Portfolio",
  },
  {
    key: "confirm-details",
    title: "Confirm Details",
  },
  {
    key: "choose-plan",
    title: "Choose a Plan",
  },
  {
    key: "payment",
    title: "Payment",
  },
];

//
export default function CompleteSignup() {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({});

  //
  const activeStepItem = steps[activeStep] ?? { key: "success" };

  //
  const gotoPreviousStep = () => {
    const newValue = Math.max(activeStep - 1, 0);
    setActiveStep(newValue);
  };

  //
  const gotoNextStep = (values?: Record<string, unknown>) => {
    const newValue = Math.min(activeStep + 1, steps.length);
    setActiveStep(newValue);

    //
    if (values) {
      setFormValues((current) => ({ ...current, ...values }));
    }
  };

  //
  const jumpToStep = (id: string) => {
    const foundStep = steps.find((step) => step.key === id);
    if (!foundStep) return;

    //
    const foundIndex = steps.indexOf(foundStep);
    if (foundIndex < 0) return;

    //
    setActiveStep(foundIndex);
  };

  // Scroll to top when the form step is changed
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  //
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex w-full px-4 py-3 bg-gray-100">
        <img src={PerceiveLogo} alt="PerceiveNow logo" />
      </div>

      <div className="grow flex flex-col items-center px-4 py-7">
        <div className="grid grid-cols-6 gap-x-2 w-full items-start lg:max-w-5xl">
          {steps.map((step, index) => (
            <div
              key={step.key}
              className={classNames("col-span-1", { "step-item": index !== steps.length - 1 })}
            >
              <div className="flex flex-col justify-center items-center text-center">
                <div className="border-2 border-white rounded-full z-20">
                  <div
                    className={classNames(
                      "w-4 h-4 border-2 rounded-full text-white font-semibold flex justify-center items-center",
                      { "bg-green-600 border-green-600": activeStep > index },
                      { "bg-primary-900 border-primary-900": activeStep === index },
                      { "bg-white border-gray-400 text-gray-800": activeStep < index },
                    )}
                  >
                    {activeStep > index ? <CheckIcon width={32} height={32} /> : index + 1}
                  </div>
                </div>

                <p
                  className={classNames(
                    { "text-green-600": activeStep > index },
                    { "text-primary-900": activeStep === index },
                    { "text-gray-500": activeStep < index },
                  )}
                >
                  {step.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="my-5 w-full flex justify-center">
          {activeStepItem.key === "user-profile" && (
            <UserProfileStep handleNext={gotoNextStep} values={formValues} />
          )}

          {activeStepItem.key === "company-details" && (
            <CompanyDetailsStep
              handlePrevious={gotoPreviousStep}
              handleNext={gotoNextStep}
              values={formValues}
            />
          )}

          {activeStepItem.key === "ip-portfolio" && (
            <IpPortfolioStep handlePrevious={gotoPreviousStep} handleNext={gotoNextStep} />
          )}

          {activeStepItem.key === "confirm-details" && (
            <ConfirmDetailsStep
              handlePrevious={gotoPreviousStep}
              handleNext={gotoNextStep}
              jumpTo={jumpToStep}
            />
          )}

          {activeStepItem.key === "choose-plan" && (
            <ChoosePlanStep handlePrevious={gotoPreviousStep} handleNext={gotoNextStep} />
          )}

          {activeStepItem.key === "payment" && (
            <PaymentStep handlePrevious={gotoPreviousStep} handleNext={gotoNextStep} />
          )}
        </div>
      </div>
    </div>
  );
}

//
interface IStepItem {
  title: string;
  key: string;
}
