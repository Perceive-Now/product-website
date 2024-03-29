import { useCallback, useEffect, useState } from "react";

//
import classNames from "classnames";

// Ip validity Analysis
// import ChatFirstQuestion from "../../../../components/@chat/ip-analysis/use-case/ip-validity-analysis/first-question";
// import ChatSecondQuestion from "../../../../components/@chat/ip-analysis/use-case/ip-validity-analysis/second-question";
// import ChatThirdQuestion from "../../../../components/@chat/ip-analysis/use-case/ip-validity-analysis/third-question";
// import ChatFourthQuestion from "../../../../components/@chat/ip-analysis/use-case/ip-validity-analysis/fourth";
// import ChatFifthQuestion from "../../../../components/@chat/ip-analysis/use-case/ip-validity-analysis/fifth";
// import ChatSixthQuestion from "../../../../components/@chat/ip-analysis/use-case/ip-validity-analysis/sixth";
// import ChatSeventhQuestion from "../../../../components/@chat/ip-analysis/use-case/ip-validity-analysis/seventh";
// import ChatEightQuestion from "../../../../components/@chat/ip-analysis/use-case/ip-validity-analysis/eigth";
// import ChatNinthQuestion from "../../../../components/@chat/ip-analysis/use-case/ip-validity-analysis/ninth";
// import ChatTenthQuestion from "../../../../components/@chat/ip-analysis/use-case/ip-validity-analysis/ten";
// import ChatEleventhQuestion from "../../../../components/@chat/ip-analysis/use-case/ip-validity-analysis/eleven";

import IPStepper from "../../../../components/@chat/ip-analysis/stepper";
import IPReview from "../../../../components/@chat/ip-analysis/use-case/ip-validity-analysis/review/review";
import NewQuestion from "../../../../components/@chat/ip-analysis/use-case/ip-validity-analysis/new-question";
import Thankyou from "../../../../components/@chat/ip-analysis/use-case/ip-validity-analysis/thank-you";
import DefaultStep from "../../../../components/@chat/ip-analysis/ip-analysis-steps/DefaultStep";
import KeywordSelection from "../../../../components/@chat/ip-analysis/ip-analysis-steps/keyword-selection";
import IPFinal from "../../../../components/@chat/ip-analysis/ip-analysis-steps/final";
import ChatQuestionAnswer from "../../../../components/@chat/ip-analysis/use-case/question/question-1";
import jsCookie from "js-cookie";
import ChatQuestionAnswer2 from "../../../../components/@chat/ip-analysis/use-case/question/question-2";
import { useAppSelector } from "../../../../hooks/redux";

/**
 *
 */
export default function IPAnalysis() {
  const [activeStep, setActiveStep] = useState(0);

  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  // const useCases = useAppSelector((state) => state.usecase.usecases) ?? [];

  //
  const keywords = searchedKeywords.map((kwd) => kwd.label);

  const changeActiveStep = useCallback((stepValue: number) => {
    if (stepValue < steps.length && stepValue >= 0) {
      setActiveStep(stepValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chatId = jsCookie.get("chatId");
  const questionId = jsCookie.get("questionId");

  useEffect(() => {
    jsCookie.set("chatId", chatId || "");
  }, [chatId]);

  const questionList = [
    {
      questionId: 1,
      question: `What is the full name of the company developing the ${keywords}?`,
      usecase: "ip-validity-analysis",
    },
    {
      questionId: 2,
      question: `Please provide a concise description of the ${keywords}`,
      usecase: "ip-validity-analysis",
    },
    {
      questionId: 3,
      question: `Describe the technical aspects and unique features of the ${keywords}`,
      usecase: "ip-validity-analysis",
    },
    {
      questionId: 4,
      question: `Can you tell me more about the specific patents or prior art you may have encountered during your research? What similarities or differences did you find? `,
      usecase: "ip-validity-analysis",
    },
    {
      questionId: 5,
      question: `How does the ${keywords} meet the criteria of novelty in its
      field?`,
      usecase: "ip-validity-analysis",
    },
    {
      questionId: 6,
      question: `Can you explain why the features of the ${keywords} are considered non-obvious to someone skilled in the field?`,
      usecase: "ip-validity-analysis",
    },
    {
      questionId: 7,
      question: `How is the ${keywords} applicable to industrial needs in its
      domain?`,
      usecase: "ip-validity-analysis",
    },
    {
      questionId: 8,
      question: `What is your strategy for patent filing, including geographies and patent offices?`,
      usecase: "ip-validity-analysis",
    },
    {
      questionId: 9,
      question: `How have you ensured enablement in the patent application for the ${keywords}`,
      usecase: "ip-validity-analysis",
    },
    {
      questionId: 10,
      question: `How have you ensured the definiteness of claims in your patent application for the ${keywords}`,
      usecase: "ip-validity-analysis",
    },
    {
      questionId: 11,
      question: `Can you provide the exact claims that will be present in the patent application for your ${keywords} solution`,
      usecase: "ip-validity-analysis",
    },
    // Ip licensing strategy
    // {
    //   questionId: 12,
    //   question: `What specific technologies or innovations within ${keywords} are you looking to license, and what makes these aspects unique and valuable for potential licensees?`,
    //   usecase: "ip-licensing-opportunity"
    // },
    // {
    //   questionId: 13,
    //   question: `Who are your ideal licensees for ${keywords}'s technology, and in which industries or sectors do they primarily operate?`,
    //   usecase: "ip-licensing-opportunity"
    // },
    // {
    //   questionId: 14,
    //   question: `What business goals are you aiming to achieve through IP licensing?`,
    //   usecase: "ip-licensing-opportunity"
    // },
    // {
    //   questionId: 15,
    //   question: `What is your preferred licensing model for ${keywords}, and how does this preference align with your strategic objectives?`,
    //   usecase: "ip-licensing-opportunity"
    // },
    // {
    //   questionId: 16,
    //   question: `Are there specific geographic regions you are targeting for licensing ${keywords}'s technology?`,
    //   usecase: "ip-licensing-opportunity"
    // },
    // {
    //   questionId: 17,
    //   question: `What are your financial expectations from licensing agreements?`,
    //   usecase: "ip-licensing-opportunity"
    // },
    // {
    //   questionId: 18,
    //   question: `How prepared are you to negotiate and manage complex licensing agreements?`,
    //   usecase: "ip-licensing-opportunity"
    // },
    // {
    //   questionId: 19,
    //   question: `What key terms and conditions are you prioritizing in your licensing agreements?`,
    //   usecase: "ip-licensing-opportunity"
    // },
    // {
    //   questionId: 20,
    //   question: `Are you open to exploring strategic partnerships or cross-licensing opportunities?`,
    //   usecase: "ip-licensing-opportunity"
    // },
    // {
    //   questionId: 21,
    //   question: `What metrics and KPIs will you use to evaluate the success of your licensing strategy?`,
    //   usecase: "ip-licensing-opportunity"
    // },
    // {
    //   questionId: 22,
    //   question: `Do you have any performance requirements or specific expectations from licensees to ensure they contribute effectively to the licensed technology's success?`,
    //   usecase: "ip-licensing-opportunity"
    // },
    // {
    //   questionId: 23,
    //   question: `How do you plan to handle sublicensing rights, audit rights, and quality control provisions to safeguard the integrity and value of your licensed IP?`,
    //   usecase: "ip-licensing-opportunity"
    // },
    // {
    //   questionId: 24,
    //   question: `Are there any particular fields of use you are considering for ${keywords}'s licensing agreements, and how do these choices reflect market demands and opportunities?`,
    //   usecase: "ip-licensing-opportunity"
    // },
    // {
    //   questionId: 25,
    //   question: `What is the pricing strategy for your product or service?`,
    //   usecase: "ip-landscaping&fto"
    // },
    // {
    //   questionId: 26,
    //   question: `How do you calculate the gross margin for your offerings?`,
    //   usecase: "ip-landscaping&fto"
    // },
    // {
    //   questionId: 27,
    //   question: `What are the total development costs incurred for your product or service?`,
    //   usecase: "ip-landscaping&fto"
    // },
    // {
    //   questionId: 28,
    //   question: `What future costs do you anticipate for full development and market launch?`,
    //   usecase: "ip-landscaping&fto"
    // },
    // {
    //   questionId: 29,
    //   question: `What discount rate do you apply to future cash flows and why?`,
    //   usecase: "ip-landscaping&fto"
    // },
    // {
    //   questionId: 30,
    //   question: `What is the projected annual revenue growth rate, and how did you arrive at this figure?`,
    //   usecase: "ip-landscaping&fto"
    // },
    // {
    //   questionId: 31,
    //   question: `What are the anticipated operating expenses, and how are they allocated?`,
    //   usecase: "ip-landscaping&fto"
    // },
    // {
    //   questionId: 32,
    //   question: `How do you project sales revenue for your products or services over the next 5 years?`,
    //   usecase: "ip-landscaping&fto"
    // },
    // {
    //   questionId: 33,
    //   question: `What market and competitive analysis data have you gathered, and how does it influence your strategy?`,
    //   usecase: "ip-landscaping&fto"
    // },
  ];

  // const questionWithUsecase = questionList.filter((q) => (useCases.includes(q.usecase)))

  const question = questionList.find((q) => {
    return q.questionId === Number(questionId);
  }) || { questionId: Number(questionId), question: "", usecase: "" };

  const steps = [
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
      component: <NewQuestion changeActiveStep={changeActiveStep} activeStep={activeStep} />,
    },
    {
      label: "",
      value: 3,
      component: (
        <ChatQuestionAnswer
          changeActiveStep={changeActiveStep}
          activeStep={activeStep}
          question={question}
        />
      ),
    },
    {
      label: "",
      value: 4,
      component: (
        <ChatQuestionAnswer2
          changeActiveStep={changeActiveStep}
          activeStep={activeStep}
          question={question}
        />
      ),
    },
    // {
    //   label: "",
    //   value: 5,
    //   component: <ChatThirdQuestion changeActiveStep={changeActiveStep} />,
    // },
    // {
    //   label: "",
    //   value: 6,
    //   component: <ChatFourthQuestion changeActiveStep={changeActiveStep} />,
    // },
    // {
    //   label: "",
    //   value: 7,
    //   component: <ChatFifthQuestion changeActiveStep={changeActiveStep} />,
    // },
    // {
    //   label: "",
    //   value: 8,
    //   component: <ChatSixthQuestion changeActiveStep={changeActiveStep} />,
    // },
    // {
    //   label: "",
    //   value: 9,
    //   component: <ChatSeventhQuestion changeActiveStep={changeActiveStep} />,
    // },
    // {
    //   label: "",
    //   value: 10,
    //   component: <ChatEightQuestion changeActiveStep={changeActiveStep} />,
    // },
    // {
    //   label: "",
    //   value: 11,
    //   component: <ChatNinthQuestion changeActiveStep={changeActiveStep} />,
    // },
    // {
    //   label: "",
    //   value: 12,
    //   component: <ChatTenthQuestion changeActiveStep={changeActiveStep} />,
    // },
    // {
    //   label: "",
    //   value: 13,
    //   component: <ChatEleventhQuestion changeActiveStep={changeActiveStep} />,
    // },

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
                  // activeStep === 9 && "h-full",
                )}
              >
                {step.component}
              </div>
            ))}
          </div>
          {activeStep > 1 && (
            <div className="absolute bottom-0 left-0 right-0 w-full">
              <IPStepper steps={questionList} activeStep={Number(questionId)} />
            </div>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 w-[200px]" />
    </>
  );
}
