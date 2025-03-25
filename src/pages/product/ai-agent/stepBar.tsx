import React, { useState, useEffect } from "react";
import IconCheck from "src/components/icons/side-bar/icon-check";
import { useAppSelector } from "src/hooks/redux";

const StepBar: React.FC = () => {
  const { Step } = useAppSelector((state) => state.VSProduct);
  const [currentStep, setCurrentStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const totalSteps = 7;

  const stepDescriptions = [
    "Collect Objectives",
    "Collect Key Issues",
    "Request Document Attachments",
    "Gather Short and Long Term Goals",
    "Collect Questions to be Answered",
    "Showcase Data Sources",
    "Recommend Report Template",
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
                ? "bg-secondary-500 border-secondary-500"
                : index === currentStep
                ? "border-secondary-500"
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
                className={`text-secondary-500 text-base font-semibold ${
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

          {hoveredStep === index && (
            <div className="absolute left-[110%] top-0 text-nowrap text-center w-auto max-w-xs text-[12px] px-[15px] py-1 bg-[#FFA300] text-white rounded-lg shadow-hoverbox z-10 leading-none">
              {stepDescriptions[index]}
            </div>
          )}

          <div
            className={`absolute right-[110%] lg:block hidden top-0 max-w-xs text-nowrap font-semibold text-right w-auto text-[12px] px-[15px] py-1 text-[#373D3F] rounded-lg z-10 leading-none font-nunito`}
          >
            {stepDescriptions[index]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepBar;
