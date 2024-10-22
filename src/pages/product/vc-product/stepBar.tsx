import React, { useState, useEffect } from "react";
import IconCheck from "src/components/icons/side-bar/icon-check";
import { useAppSelector } from "src/hooks/redux";
const StepBar: React.FC = () => {
  const { Step } = useAppSelector((state) => state.VSProduct);
  const [currentStep, setCurrentStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const totalSteps = 8;

  const stepDescriptions = [
    "Pitch Deck Upload",
    "AI-Driven Summary and Validation",
    "Company Stage",
    "Diligence Level Selection",
    "Insufficiency-Based Questions",
    "Data Source Suggestions",
    "Final Template Validation",
    "Final Report Generation",
  ];


  useEffect(() => {
    setCurrentStep(Step);
  }, [Step]);

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  if (currentStep <= 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-start">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div key={index} className="flex flex-col items-center relative">
          <div
            className={`w-4 h-4 border rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 group ${
              index < currentStep
                ? "bg-primary-900 border-primary-900"
                : index === currentStep
                ? "border-primary-900"
                : "border-transparent hover:bg-[#FFA300]"
            }`}
            onClick={() => setCurrentStep(index)}
            onMouseEnter={() => setHoveredStep(index)}
            onMouseLeave={() => setHoveredStep(null)}
          >
            {index < currentStep ? (
              <span className="text-white text-xl">
                <IconCheck />
              </span>
            ) : (
              <span className={`text-primary-900 text-base font-semibold ${currentStep === index ? '' : 'group-hover:text-white'}`}>{index + 1}</span>
            )}
          </div>

          {index < totalSteps - 1 && <div className="w-[1px] h-[18px] border border-gray-200"></div>}
          {hoveredStep === index && (
            <div className="absolute left-[110%] top-[0] text-nowrap text-center w-auto max-w-xs text-sm px-[20px] py-1 bg-[#FFA300] text-white rounded-lg shadow-hoverbox z-10 leading-none">
              {stepDescriptions[index]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepBar;
