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

import IPStepper from "../../../../components/@report-chat/ip-analysis/stepper";
import IPReview from "../../../../components/@report-chat/ip-analysis/use-case/ip-validity-analysis/review/review";
import NewQuestion from "../../../../components/@report-chat/ip-analysis/use-case/ip-validity-analysis/new-question";
import Thankyou from "../../../../components/@report-chat/ip-analysis/use-case/ip-validity-analysis/thank-you";
import DefaultStep from "../../../../components/@report-chat/ip-analysis/ip-analysis-steps/DefaultStep";
import KeywordSelection from "../../../../components/@report-chat/ip-analysis/ip-analysis-steps/keyword-selection";
import IPFinal from "../../../../components/@report-chat/ip-analysis/ip-analysis-steps/final";
import ChatQuestionAnswer from "../../../../components/@report-chat/ip-analysis/use-case/question/question-1";
import jsCookie from "js-cookie";
import ChatQuestionAnswer2 from "../../../../components/@report-chat/ip-analysis/use-case/question/question-2";
import { useAppSelector } from "../../../../hooks/redux";

/**
 *
 */
export default function IPAnalysis() {
  const [activeStep, setActiveStep] = useState(0);

  // const searchedKeywords = useAppSelector((state) => state.dashboard?.keywords) ?? [];
  const useCases = useAppSelector((state) => state.usecase.usecases) ?? [];
  //
  // const keywords = searchedKeywords.map((kwd) => kwd);

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
      question: "What is the full name of the company, and what is its core mission?",
      // question: `What is the full name of the company developing the ${keywords}?`,
      usecase: "ip-validity-analysis",
    },
    {
      questionId: 2,
      question:
        "Please provide a concise description of the technology or product your company has developed.",
      // question: `Please provide a concise description of the ${keywords}`,
      usecase: "ip-validity-analysis",
    },
    {
      questionId: 3,
      question:
        "Describe the technical aspects and unique features of the key product or technology      developed by the company. How does your product or technology introduce innovation or     novelty within its field?",
      // question: `Describe the technical aspects and unique features of the ${keywords}`,
      usecase: "ip-validity-analysis",
    },
    {
      questionId: 4,
      question:
        "Could you explain your company's business model and how it generates revenue? What are the different revenue streams for your company, including primary and potential ancillary streams?",
      // question: `Can you tell me more about the specific patents or prior art you may have encountered during your research? What similarities or differences did you find? `,
      usecase: "ip-validity-analysis",
    },
    {
      questionId: 5,
      question:
        "What is your strategy for protecting the intellectual property associated with your  product or technology? Are there specific patents or prior art that you have encountered during your research? What similarities or differences did you find?",
      // question: `How does the ${keywords} meet the criteria of novelty in its
      // field?`,
      usecase: "ip-validity-analysis",
    },
    {
      questionId: 6,
      question:
        "Can you tell me more about the specific patents or prior art you may have encountered during your research? What similarities or differences did you find?",
      // question: `Can you explain why the features of the ${keywords} are considered non-obvious to someone skilled in the field?`,
      usecase: "ip-validity-analysis",
    },
    {
      questionId: 7,
      question:
        "How does the key product or technology developed by the company meet the criteria of novelty in its field?",
      // question: `How is the ${keywords} applicable to industrial needs in its
      // domain?`,
      usecase: "ip-validity-analysis",
    },
    {
      questionId: 8,
      question:
        "Can you explain why the features of the key product or technology developed by the company are considered non-obvious to someone skilled in the field?",
      // question: `What is your strategy for patent filing, including geographies and patent offices?`,
      usecase: "ip-validity-analysis",
    },
    {
      questionId: 9,
      question:
        "How is the key product or technology developed by the company applicable to industrial needs in its domain?",
      // question: `How have you ensured enablement in the patent application for the ${keywords}`,
      usecase: "ip-validity-analysis",
    },
    {
      questionId: 10,
      question:
        "What is your strategy for patent filing, including geographies and patent offices?",
      // question: `How have you ensured the definiteness of claims in your patent application for the ${keywords}`,
      usecase: "ip-validity-analysis",
    },
    {
      questionId: 11,
      question:
        "How have you ensured enablement in the patent application for the key product or technology developed by the company?",
      // question: `Can you provide the exact claims that will be present in the patent application for your ${keywords} solution`,
      usecase: "ip-validity-analysis",
    },
    // Ip licensing strategy
    {
      questionId: 12,
      question:
        "How have you ensured the definiteness of claims in your patent application for the key product or technology developed by the company?",
      // question: `What specific technologies or innovations within ${keywords} are you looking to license, and what makes these aspects unique and valuable for potential licensees?`,
      usecase: "ip-licensing-opportunity",
    },
    {
      questionId: 13,
      question:
        "Can you provide the exact claims that will be present in the patent application for your key product or technology developed?",
      // question: `Who are your ideal licensees for ${keywords}'s technology, and in which industries or sectors do they primarily operate?`,
      usecase: "ip-licensing-opportunity",
    },
    {
      questionId: 14,
      question:
        "What specific technologies or innovations within NeuraWear are you looking to license, and what makes these aspects unique and valuable for potential licensees?",
      // question: `What business goals are you aiming to achieve through IP licensing?`,
      usecase: "ip-licensing-opportunity",
    },
    {
      questionId: 15,
      question:
        "Who are your ideal licensees for NeuraWear's technology, and in which industries or sectors do they primarily operate?",
      // question: `What is your preferred licensing model for ${keywords}, and how does this preference align with your strategic objectives?`,
      usecase: "ip-licensing-opportunity",
    },
    {
      questionId: 16,
      question: "What business goals are you aiming to achieve through IP licensing?",
      // question: `Are there specific geographic regions you are targeting for licensing ${keywords}'s technology?`,
      usecase: "ip-licensing-opportunity",
    },
    {
      questionId: 17,
      question:
        "What is your preferred licensing model for NeuraWear, and how does this preference align with your strategic objectives?",
      // question: `What are your financial expectations from licensing agreements?`,
      usecase: "ip-licensing-opportunity",
    },
    {
      questionId: 18,
      question:
        "Are there specific geographic regions you are targeting for licensing NeuraWear's technology?",
      // question: `How prepared are you to negotiate and manage complex licensing agreements?`,
      usecase: "ip-licensing-opportunity",
    },
    {
      questionId: 19,
      question: "What are your financial expectations from licensing agreements?",
      // question: `What key terms and conditions are you prioritizing in your licensing agreements?`,
      usecase: "ip-licensing-opportunity",
    },
    {
      questionId: 20,
      question: "How prepared are you to negotiate and manage complex licensing agreements?",
      // question: `Are you open to exploring strategic partnerships or cross-licensing opportunities?`,
      usecase: "ip-licensing-opportunity",
    },
    {
      questionId: 21,
      question: "What key terms and conditions are you prioritizing in your licensing agreements?",
      // question: `What metrics and KPIs will you use to evaluate the success of your licensing strategy?`,
      usecase: "ip-licensing-opportunity",
    },
    {
      questionId: 22,
      question:
        "Are you open to exploring strategic partnerships or cross-licensing opportunities?",
      // question: `Do you have any performance requirements or specific expectations from licensees to ensure they contribute effectively to the licensed technology's success?`,
      usecase: "ip-licensing-opportunity",
    },
    {
      questionId: 23,
      question:
        "What metrics and KPIs will you use to evaluate the success of your licensing strategy?",
      // question: `How do you plan to handle sublicensing rights, audit rights, and quality control provisions to safeguard the integrity and value of your licensed IP?`,
      usecase: "ip-licensing-opportunity",
    },
    {
      questionId: 24,
      question:
        "Do you have any performance requirements or specific expectations from licensees to ensure they contribute effectively to the licensed technology's success?",
      // question: `Are there any particular fields of use you are considering for ${keywords}'s licensing agreements, and how do these choices reflect market demands and opportunities?`,
      usecase: "ip-licensing-opportunity",
    },
    // IP landscaping and FTO
    {
      questionId: 25,
      question:
        "How do you plan to handle sublicensing rights, audit rights, and quality control provisions to safeguard the integrity and value of your licensed IP?",
      // question: `What is the pricing strategy for your product or service?`,
      usecase: "ip-valuation",
    },
    {
      questionId: 26,
      question:
        "Are there any particular fields of use you are considering for NeuraWear's licensing agreements, and how do these choices reflect market demands and opportunities?",
      // question: `How do you calculate the gross margin for your offerings?`,
      usecase: "ip-valuation",
    },
    {
      questionId: 27,
      question: "What is the pricing strategy for your product or service?",
      // question: `What are the total development costs incurred for your product or service?`,
      usecase: "ip-valuation",
    },
    {
      questionId: 28,
      question: "How do you calculate the gross margin for your offerings?",
      // question: `What future costs do you anticipate for full development and market launch?`,
      usecase: "ip-valuation",
    },
    {
      questionId: 29,
      question: "What are the total development costs incurred for your product or service?",
      // question: `What discount rate do you apply to future cash flows and why?`,
      usecase: "ip-valuation",
    },
    {
      questionId: 30,
      question: "What future costs do you anticipate for full development and market launch?",
      // question: `What is the projected annual revenue growth rate, and how did you arrive at this figure?`,
      usecase: "ip-valuation",
    },
    {
      questionId: 31,
      question: "What discount rate do you apply to future cash flows and why?",
      // question: `What are the anticipated operating expenses, and how are they allocated?`,
      usecase: "ip-valuation",
    },
    {
      questionId: 32,
      question:
        "What is the projected annual revenue growth rate, and how did you arrive at this figure?",
      // question: `How do you project sales revenue for your products or services over the next 5 years?`,
      usecase: "ip-valuation",
    },
    {
      questionId: 33,
      question: "What are the anticipated operating expenses, and how are they allocated?",
      // question: `What market and competitive analysis data have you gathered, and how does it influence your strategy?`,
      usecase: "ip-valuation",
    },
    // Infringement Analysis
    {
      questionId: 34,
      question:
        "How do you project sales revenue for your products or services over the next 5 years?",
      // question: `What is the full legal name of your company, and what is its primary mission?`,
      usecase: "infringement-analysis",
    },
    {
      questionId: 35,
      question:
        "What market and competitive analysis data have you gathered, and how does it influence your strategy?",
      // question: `Can you describe the key product or technology your company has developed`,
      usecase: "infringement-analysis",
    },
    {
      questionId: 36,
      question:
        "What specific problem does your product or service solve for your target audience?",
      // question: `Who is the target audience for your product or service?
      usecase: "infringement-analysis",
    },
    {
      questionId: 37,
      question: "How does your product or service stand out from existing market offerings?",
      // question: `What specific problem does your product or service solve for your target audience?`,
      usecase: "infringement-analysis",
    },
    {
      questionId: 38,
      question: "What pricing strategy has your company adopted for its product or service?",
      // question: `How does your product or service stand out from existing market offerings?`,
      usecase: "infringement-analysis",
    },
    {
      questionId: 39,
      question: "What are the primary and potential secondary revenue streams for your company?",
      // question: `What pricing strategy has your company adopted for its product or service?`,
      usecase: "infringement-analysis",
    },
    {
      questionId: 40,
      question:
        "How is your company's cost structure organized, and what impact does it have on pricing and profitability?",
      // question: `Could you explain your company's business model and how it generates revenue`,
      usecase: "infringement-analysis",
    },
    {
      questionId: 41,
      question: "Which sales and distribution channels is your company planning to use?",
      // question: `What are the primary and potential secondary revenue streams for your company?`,
      usecase: "infringement-analysis",
    },
    {
      questionId: 42,
      question:
        "Who are your main competitors, and what differentiates your product or service from theirs?",
      // question: `How is your company's cost structure organized, and what impact does it have on pricing and
      // profitability?`,
      usecase: "infringement-analysis",
    },
    // {
    //   questionId: 43,
    //   question: `Which sales and distribution channels is your company planning to use?`,
    //   usecase: "infringement-analysis",
    // },
    // {
    //   questionId: 44,
    //   question: `Who are your main competitors, and what differentiates your product or service from theirs?`,
    //   usecase: "infringement-analysis",
    // },
  ];

  const questionWithUsecase = questionList.filter((q) => useCases.includes(q.usecase));

  const question = questionWithUsecase.find((q) => {
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
              <IPStepper steps={questionWithUsecase} activeStep={Number(questionId)} />
            </div>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 w-[200px]" />
    </>
  );
}
