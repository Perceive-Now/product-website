import { useCallback, useEffect, useState } from "react";

//

//
import { IStep } from "../../../../@types/entities/IStep";

//
import classNames from "classnames";
import DefaultStep from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/DefaultStep";
// import Identification from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/Identification";
import IPStepper from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/stepper";
import IPNovelty from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/novelty&innovation";
// import IPPriorArt from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/prior-art";
// import IPTechnicalInvention from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/technical-invention";
// import IPInventionContribution from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/invention-contribution";
// import IPPotentialUses from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/potential-uses";
// import IPEstimatedMarket from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/estimated-market";
// import IPInventiveSteps from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/invemtive-steps";
import IPReview from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/review";
import IPFinal from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/final";
import KeywordSelection from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/keyword-selection";

/**
 *
 */
export default function IPAnalysis() {
  const [activeStep, setActiveStep] = useState(0);
  //
  const changeActiveStep = useCallback((stepValue: number) => {
    if (stepValue < steps.length && stepValue >= 0) {
      // Ensure the stepValue is within valid range
      setActiveStep(stepValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const steps: IStep[] = [
    {
      label: "",
      value: 0,
      component: <DefaultStep changeActiveStep={changeActiveStep} />,
    },
    {
      label: "",
      value: 1,
      component: <KeywordSelection changeActiveStep={changeActiveStep} />,
    },
    {
      label: "Novelty and Innovation Aspects",
      value: 2,
      component: <IPNovelty changeActiveStep={changeActiveStep} />,
    },
    {
      label: "Prior Art Research Findings",
      value: 3,
      component: <IPNovelty changeActiveStep={changeActiveStep} />,
    },
    {
      label: "Technical Field of the Invention",
      value: 4,
      component: <IPNovelty changeActiveStep={changeActiveStep} />,
    },
    {
      label: "Identification of Inventors and Contributions",
      value: 5,
      component: <IPNovelty changeActiveStep={changeActiveStep} />,
    },
    {
      label: "Potential Applications and Uses",
      value: 6,
      component: <IPNovelty changeActiveStep={changeActiveStep} />,
    },
    {
      label: "Estimated Market Potential",
      value: 7,
      component: <IPNovelty changeActiveStep={changeActiveStep} />,
    },
    {
      label: "Inventive Step or Non-Obviousness Discussion",
      value: 8,
      component: <IPNovelty changeActiveStep={changeActiveStep} />,
    },
    {
      label: "Review",
      value: 9,
      component: <IPReview changeActiveStep={changeActiveStep} />,
    },
    {
      label: "",
      value: 10,
      component: <IPFinal changeActiveStep={changeActiveStep} activeStep={activeStep} />,
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  return (
    <>
      <div className="w-full">
        <div
          className={classNames(
            "overflow-hidden relative min-h-[calc(100vh-400px)] md:min-h-[calc(100vh-400px)] xl:min-h-[calc(100vh-900px)] 2xl:min-h-full max-h-full w-full",
            activeStep === 9 && "max-h-full",
            activeStep !== 0 && activeStep !== 1 && "shadow border rounded-md p-2",
          )}
        >
          <div
            className={`translate-y-[${
              activeStep * 9
            }% flex flex-col gap-y-5 transition duration-500 ease-in-out overflow-hidden h-full w-full `}
            style={{
              transform: `translateY(-${activeStep * 0}%)`,
            }}
          >
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={classNames(
                  activeStep !== step.value && "hidden",
                  "px-1 h-full w-full overflow-y-auto overflow-x-hidden pn_scroller",
                  activeStep === 0 && "h-[calc(100vh-120px)]",
                  activeStep === 9 && "h-full",
                )}
              >
                {step.component}
              </div>
            ))}
          </div>
          {activeStep !== 0 && (
            <div className="absolute bottom-0 left-0 right-0">
              <IPStepper steps={steps} activeStep={activeStep} />
            </div>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 w-[200px]" />
      {/* {activeStep !== 0 && (
        
          <IPStepper steps={steps} activeStep={activeStep} />
        // </div>
      )} */}
    </>
  );
}
