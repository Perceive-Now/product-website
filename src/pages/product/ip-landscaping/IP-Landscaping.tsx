import { useMemo, useState } from "react";
import Breadcrumb from "../../../components/reusable/breadcrumb";
import { Stepper } from "../../../components/reusable/Stepper/Stepper";
import { IStep } from "../../../@types/entities/IStep";
import StepOne from "../../../components/@dashboard/IP-landscaping/StepOne";
import StepTwo from "../../../components/@dashboard/IP-landscaping/StepTwo";
import StepThree from "../../../components/@dashboard/IP-landscaping/StepThree";

export function IPLandscaping() {
  const [activeStep, setActiveStep] = useState(1);

  const changeActiveStep = (stepValue: number) => {
    if (stepValue < steps.length || stepValue >= 1) {
      setActiveStep(stepValue);
    }
  };

  const steps: IStep[] = useMemo(
    () => [
      {
        label: "Report Details",
        value: 1,
        component: <StepOne changeActiveStep={changeActiveStep} />,
      },
      {
        label: "Objectives & Scope",
        value: 2,
        component: <StepTwo changeActiveStep={changeActiveStep} />,
      },
      {
        label: "Organizations& Competitors",
        value: 3,
        component: <StepThree changeActiveStep={changeActiveStep} />,
      },
    ],
    [],
  );

  const activeComponent = useMemo(() => {
    return steps.find(({ value }) => value === activeStep)?.component || null;
  }, [activeStep, steps]);

  return (
    <>
      <div className="bg-appGray-200 flex justify-between items-center mb-1 pl-2 rounded-md">
        <div className="flex items-start justify-center gap-0.5 py-1">
          {/* <p className="text-lg text-primary-900 fw-600">IP Landscaping</p> */}
          <Breadcrumb breadCrumbs={breadcrumbs} />
        </div>
      </div>
      <div className="mx-auto w-1/3 mt-4">
        <Stepper steps={steps} activeStep={activeStep} changeActiveStep={changeActiveStep} />
        {activeComponent}
      </div>
    </>
  );
}

const breadcrumbs = [
  { title: "IP Landscaping", link: "/companies" },
  { title: "Report Details", link: "/patents/1" },
];
