import { useCallback, useEffect, useState } from "react";

//
import Breadcrumb from "../../../components/reusable/breadcrumb";
import { Stepper } from "../../../components/reusable/Stepper/Stepper";
import MoreNavOption from "../../../components/reusable/nav-options";

//
import { IStep } from "../../../@types/entities/IStep";

//
import StepOne from "../../../components/@dashboard/IP-landscaping/StepOne";
import StepTwo from "../../../components/@dashboard/IP-landscaping/StepTwo";
import StepThree from "../../../components/@dashboard/IP-landscaping/StepThree";
import StartStep from "../../../components/@dashboard/IP-landscaping/StartStep";
import StepFour from "../../../components/@dashboard/IP-landscaping/StepFour";
import StepFive from "../../../components/@dashboard/IP-landscaping/StepFive";
import StepSix from "../../../components/@dashboard/IP-landscaping/StepSix";
import StepSeven from "../../../components/@dashboard/IP-landscaping/StepSeven";
import classNames from "classnames";

/**
 *
 */
export function IPLandscaping() {
  const [activeStep, setActiveStep] = useState(0);
  const [sliderHeight, setSliderHeight] = useState("400px");

  //
  const changeActiveStep = useCallback((stepValue: number) => {
    if (stepValue < steps.length && stepValue >= 0) {
      // Ensure the stepValue is within valid range
      setActiveStep(stepValue);
    }
  }, []);

  //
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const steps: IStep[] = [
    {
      label: "",
      value: 0,
      component: <StartStep changeActiveStep={changeActiveStep} />,
    },
    {
      label: "Use case and date",
      value: 1,
      component: <StepOne changeActiveStep={changeActiveStep} />,
    },
    {
      label: "Technology description",
      value: 2,
      component: <StepTwo changeActiveStep={changeActiveStep} />,
    },
    {
      label: "Objectives",
      value: 3,
      component: <StepThree changeActiveStep={changeActiveStep} />,
    },
    {
      label: "Geographical scope",
      value: 4,
      component: <StepFour changeActiveStep={changeActiveStep} />,
    },
    {
      label: "Analysis period",
      value: 5,
      component: <StepFive changeActiveStep={changeActiveStep} />,
    },
    {
      label: "Organization",
      value: 6,
      component: <StepSix changeActiveStep={changeActiveStep} />,
    },
    {
      label: "Competitors",
      value: 7,
      component: <StepSeven changeActiveStep={changeActiveStep} />,
    },
  ];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const calculateMaxHeight = () => {
  //   const maxHeight = Math.max(...steps.map(step => {
  //     const componentHeight = step.component.props.style?.minHeight || '0px';
  //     return parseInt(componentHeight.replace('px', ''), 10);
  //   }));
  //   setSliderHeight(`${maxHeight}px`);
  // };

  // // Calculate the maximum height whenever the activeStep or steps change
  // useEffect(() => {
  //   calculateMaxHeight();
  // }, [activeStep, steps, calculateMaxHeight]);

  //
  // const activeComponent = useMemo(() => {
  //   return steps.find(({ value }) => value === activeStep)?.component || null;
  // }, [activeStep, steps]);

  // const stepperClass = activeStepminValue: 100000,
  // maxVa !== 0 ? 'translate-x-[-100%]' : '';

  return (
    <>
      {/* <div className="bg-appGray-200 flex justify-between items-center mb-1 pl-2 rounded-md">
        <div className="flex items-start justify-center gap-0.5 py-1">
          <p className="text-lg text-primary-900 fw-600">IP Landscaping</p>
          <Breadcrumb breadCrumbs={breadcrumbs} />
        </div>
      </div> */}
      {/* <div className="flex flex-col md:flex-row mt-12 justify-between">
        <MoreNavOption /> */}
      <div className="xl:w-[829px] md:w-[400px]">
        {/* <div className="overflow-hidde h-[calc(100vh-600px)]"> */}
        <div className="overflow-hidden min-h-[calc(100vh-400px)] md:min-h-[calc(100vh-400px)] xl:min-h-[calc(100vh-900px)] 2xl:min-h-full max-h-[400px]">
          {/* <div className={`overflow-hidden min-h-[${sliderHeight}] md:min-h-[${sliderHeight}] xl:min-h-[${sliderHeight}] 2xl:min-h-full max-h-[400px]`}> */}
          <div
            className={`translate-y-[${
              activeStep * 12.5
            }% flex flex-col gap-y-5 transition duration-500 ease-in-out`}
            style={{
              transform: `translateY(-${activeStep * 12.5}%)`,
            }}
          >
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={classNames(
                  // activeStep !== step.value && "hidden",
                  "px-1  h-[400px] overflow-y-auto overflow-x-hidden pn_scroller",
                )}
              >
                {step.component}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-shrink-0">
        {/* // className={`transition-transform duration-500 ease-in-out ${stepperClass}`} */}
        <Stepper
          steps={steps}
          activeStep={activeStep}
          // changeActiveStep={changeActiveStep}
        />
      </div>
      {/* </div> */}
    </>
  );
}

const breadcrumbs = [
  { title: "IP Landscaping", link: "/companies" },
  { title: "Report Details", link: "/patents/1" },
];
