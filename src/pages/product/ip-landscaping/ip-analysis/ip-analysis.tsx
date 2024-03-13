import { useCallback, useEffect, useState } from "react";

//
import classNames from "classnames";
import DefaultStep from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/DefaultStep";
import IPStepper from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/stepper";
import IPReview from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/review/review";
import IPFinal from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/final";
import KeywordSelection from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/keyword-selection";
import ChatFirstQuestion from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/first-question";
import NewQuestion from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/new-question";
import ChatSecondQuestion from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/second-question";
import ChatThirdQuestion from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/third-question";
import ChatFourthQuestion from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/fourth";
import ChatFifthQuestion from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/fifth";
import ChatSixthQuestion from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/sixth";
import ChatSeventhQuestion from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/seventh";
import ChatEightQuestion from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/eigth";
import ChatNinthQuestion from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/ninth";
import ChatTenthQuestion from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/ten";
import ChatEleventhQuestion from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/eleven";
import Thankyou from "../../../../components/@dashboard/IP-landscaping/ip-analysis-steps/thank-you";

/**
 *
 */
export default function IPAnalysis() {
  const [activeStep, setActiveStep] = useState(0);
  //
  const changeActiveStep = useCallback((stepValue: number) => {
    if (stepValue < steps.length && stepValue >= 0) {
      setActiveStep(stepValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [steps] = useState([
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
      label: "",
      value: 2,
      component: <NewQuestion changeActiveStep={changeActiveStep} />,
    },
    {
      label: "",
      value: 33,
      component: <NewQuestion changeActiveStep={changeActiveStep} />,
    },
    {
      label: "",
      value: 3,
      component: <ChatFirstQuestion changeActiveStep={changeActiveStep} />,
    },
    {
      label: "",
      value: 4,
      component: <ChatSecondQuestion changeActiveStep={changeActiveStep} />,
    },
    {
      label: "",
      value: 5,
      component: <ChatThirdQuestion changeActiveStep={changeActiveStep} />,
    },
    {
      label: "",
      value: 6,
      component: <ChatFourthQuestion changeActiveStep={changeActiveStep} />,
    },
    {
      label: "",
      value: 7,
      component: <ChatFifthQuestion changeActiveStep={changeActiveStep} />,
    },
    {
      label: "",
      value: 8,
      component: <ChatSixthQuestion changeActiveStep={changeActiveStep} />,
    },
    {
      label: "",
      value: 9,
      component: <ChatSeventhQuestion changeActiveStep={changeActiveStep} />,
    },
    {
      label: "",
      value: 10,
      component: <ChatEightQuestion changeActiveStep={changeActiveStep} />,
    },
    {
      label: "",
      value: 11,
      component: <ChatNinthQuestion changeActiveStep={changeActiveStep} />,
    },
    {
      label: "",
      value: 12,
      component: <ChatTenthQuestion changeActiveStep={changeActiveStep} />,
    },
    {
      label: "",
      value: 13,
      component: <ChatEleventhQuestion changeActiveStep={changeActiveStep} />,
    },
    {
      label: "",
      value: 14,
      component: <Thankyou changeActiveStep={changeActiveStep} />,
    },
    {
      label: "Review",
      value: 15,
      component: <IPReview changeActiveStep={changeActiveStep} />,
    },
    {
      label: "",
      value: 16,
      component: <IPFinal activeStep={activeStep} />,
    },
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  return (
    <>
      <div className="w-full">
        <div
          className={classNames(
            "overflow-hidden relative min-h-[calc(100vh-400px)] md:min-h-[calc(100vh-400px)] xl:min-h-[calc(100vh-900px)] 2xl:min-h-full max-h-full w-full",
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
    </>
  );
}
