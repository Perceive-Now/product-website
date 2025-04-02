import React, { useState, useEffect } from "react";
import "./loading.scss"; // We'll use a custom CSS animation for the shine effect
import DotLoader from "src/components/reusable/dot-loader";

interface Props {
  uploadingFile: boolean;
  analyzing: boolean;
}

const LoadingUI = (props: Props) => {
  const { uploadingFile, analyzing } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Analyzing file", "Summarizing file", "Finalizing"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
    }, 2000); // Change step every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-start justify-center mt-2">
      <div className="bg-white  rounded-lg p-4 max-w-xs relative shine-effect chat-bubble">
        <p className="text-md font-medium text-gray-800">
          {uploadingFile ? "Analyzing the file" : "Summarizing"}...
        </p>
        <div className="flex items-center justify-center p-1 h-full">
          <DotLoader />
        </div>
      </div>
    </div>
  );
};

export default LoadingUI;
