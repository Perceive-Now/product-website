import React, { useState, useEffect } from "react";
import IconCheck from "src/components/icons/side-bar/icon-check";
import { useAppSelector } from "src/hooks/redux";
const StepBar: React.FC = () => {
  const { Step } = useAppSelector((state) => state.VSProduct);
  const [currentStep, setCurrentStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const totalSteps = 5;

  const stepDescriptions = [
    "Startup Info",
    "Upload Deck",
    "Summary & Diligence Level",
    "Data Source Input",
    "Finalize Report",
    "Finalize Report",
  ];

  const stepDescriptionsTwo = [
    "Startup Info",
    "Upload Deck",
    "Summary & Diligence Level",
    ["Data Source Input"],
    "Finalize Report",
    ["Finalize Report"],
  ];

  useEffect(() => {
    setCurrentStep(Step);
  }, [Step]);

  if (currentStep < 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-start">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div key={index} className="flex flex-col items-center relative">
          <div
            className={`w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] shadow-md md:w-[24px] md:h-[24px] lg:w-4 lg:h-4 border rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 group ${
              index < currentStep
                ? "bg-primary-900 border-primary-900"
                : index === currentStep
                ? "border-primary-900"
                : "border-transparent hover:bg-[#FFA300]"
            }`}
            onMouseEnter={() => setHoveredStep(index)}
            onMouseLeave={() => setHoveredStep(null)}
          >
            {index < currentStep ? (
              <span className="text-white lg:text-xl">
                <IconCheck />
              </span>
            ) : (
              <span
                className={`text-primary-900 text-base font-semibold ${
                  currentStep === index ? "" : "group-hover:text-white"
                }`}
              >
                {index + 1}
              </span>
            )}
          </div>

          {index < totalSteps - 1 && (
            <div className="w-[1px] h-[18px] border border-gray-200"></div>
          )}
          {/* {hoveredStep === index && (
              <div
                className="absolute left-[110%] 2xl:left-auto 2xl:right-[110%] 4xl:left-[110%] 4xl:right-auto top-0 text-nowrap text-center w-auto max-w-xs text-[12px] px-[15px] py-1 bg-[#FFA300] text-white rounded-lg shadow-hoverbox z-10 leading-none"
              >
                {stepDescriptions[index]}
              </div>
            )} */}
          {hoveredStep === index && (
            <div className="absolute left-[110%] top-0 text-nowrap text-center w-auto max-w-xs text-[12px] px-[15px] py-1 bg-[#FFA300] text-white rounded-lg shadow-hoverbox z-10 leading-none">
              {stepDescriptions[index]}
            </div>
          )}

          {!(Step == 3 || Step == 4 || Step == 5) && (
            <div
              className={`absolute right-[110%] lg:block hidden top-0 max-w-xs text-nowrap font-semibold text-right w-auto text-[12px] px-[15px] py-1 text-[#373D3F] rounded-lg z-10 leading-none font-nunito`}
            >
              {Array.isArray(stepDescriptionsTwo[index]) ? (
                (stepDescriptionsTwo[index] as string[]).map((line: string, i: number) => (
                  <div key={i}>{line}</div>
                ))
              ) : (
                <div>{stepDescriptionsTwo[index] as string}</div>
              )}
            </div>
          )}
          {/* <div
            className="absolute right-[110%] lg:block hidden top-0 w-auto text-nowrap pl-[50%] text-center max-w-xs text-[12px] px-[15px] py-1 text-[#373D3F] rounded-lg shadow-hoverbox z-10 leading-none"
          >
            {stepDescriptions[index]}
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default StepBar;
