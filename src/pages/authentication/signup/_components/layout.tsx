import React, { PropsWithChildren } from "react";
import SideBar from "./sidebar";

interface SignUpLayoutProps extends PropsWithChildren {
  currentStep: number; // Current active step index
  completedSteps: number[]; // Indices of completed steps
}

const SignUpLayout: React.FC<SignUpLayoutProps> = ({
  children,
  currentStep,
  completedSteps,
}) => {
  return (
    <div className="flex">
      {/* Pass currentStep and completedSteps to the SideBar */}
      <SideBar currentStep={currentStep} completedSteps={completedSteps} />
      <div className="flex-1 p-2">{children}</div>
    </div>
  );
};

export default SignUpLayout;
