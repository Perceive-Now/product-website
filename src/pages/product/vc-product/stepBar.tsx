import React, { useState, useEffect } from "react";
import IconCheck from "src/components/icons/side-bar/icon-check";
import { useAppSelector } from "src/hooks/redux";
const StepBar: React.FC = () => {
  const { Step } = useAppSelector((state) => state.VSProduct);
  const [currentStep, setCurrentStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const totalSteps = 5;

  // const stepDescriptions = [
  //   "Startup Name and Stage",
  //   "Pitch Deck Upload",
  //   "AI-Driven Summary and Diligence Level Selection",
  //   "Data Source Suggestions",
  //   "Final Template Validation & Report Generation",
  // ];

  const stepDescriptions = [
    "Startup Name and Stage",
    "Pitch Deck Upload",
    ["AI-Driven Summary", "and Diligence Level Selection"],
    "Data Source Suggestions",
    ["Final Template Validation", "& Report Generation"],
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
            className={`w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] shadow-md md:w-[24px] md:h-[24px] lg:w-4 lg:h-4 border rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 group ${index < currentStep
              ? "bg-primary-900 border-primary-900"
              : index === currentStep
                ? "border-primary-900"
                : "border-transparent"
              }`}
          // onMouseEnter={() => setHoveredStep(index)}
          // onMouseLeave={() => setHoveredStep(null)}
          >
            {index < currentStep ? (
              <span className="text-white lg:text-xl">
                <IconCheck />
              </span>
            ) : (
              <span className='text-primary-900 text-base font-semibold'>{index + 1}</span>
            )}
          </div>

          {index < totalSteps - 1 && <div className="w-[1px] h-[18px] border border-gray-200"></div>}

          {/* <div
            className="absolute left-[110%] 2xl:left-auto 2xl:right-[110%] 4xl:left-[110%] 4xl:right-auto top-0 text-nowrap text-center w-auto max-w-xs text-[12px] px-[15px] py-1 bg-[#FFA300] text-white rounded-lg shadow-hoverbox z-10 leading-none"
          >
            {stepDescriptions[index]}
          </div> */}
          <div className={`absolute left-[110%] 2xl:left-auto 2xl:right-[110%] 4xl:left-[110%] 4xl:right-auto top-0 max-w-xs text-nowrap font-semibold text-right w-auto text-[14px] px-[15px] py-1 text-[#373D3F] rounded-lg z-10 leading-none font-nunito`}>
            {Array.isArray(stepDescriptions[index]) ? (
              (stepDescriptions[index] as string[]).map((line: string, i: number) => (
                <div key={i}>{line}</div>
              ))
            ) : (
              <div>{stepDescriptions[index] as string}</div>
            )}
          </div>

        </div>
      ))}
    </div>
  );
};

export default StepBar;
