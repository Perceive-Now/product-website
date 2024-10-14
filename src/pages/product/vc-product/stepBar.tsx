import React, { useState } from 'react';
import IconCheck from 'src/components/icons/side-bar/icon-check';

const StepBar: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(2);
    const totalSteps = 8;

    const handleNextStep = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    return (
        <div className="flex flex-col items-start">
            {Array.from({ length: totalSteps }, (_, index) => (
                <div key={index} className="flex flex-col items-center">
                    <div
                        className={`w-4 h-4 border-1 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                            index < currentStep
                                ? 'bg-primary-900 border-primary-900'
                                : index === currentStep
                                ? 'border-primary-900'
                                : 'border-transparent'
                        }`}
                        onClick={() => setCurrentStep(index)}
                    >
                        {index < currentStep ? (
                            <span className="text-white text-xl"><IconCheck/></span>
                        ) : (
                            <span className="text-primary-900 text-base font-semibold">{index + 1}</span>
                        )}
                    </div>

                    {index < totalSteps - 1 && (
                        <div className="w-[1px] h-4 border border-gray-200"></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default StepBar;
