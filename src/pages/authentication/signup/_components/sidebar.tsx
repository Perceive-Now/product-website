import React from "react";
import perceiveNowImage from "../../../../assets/images/logo.svg";
import { organizationSettingSVG } from "../_assets";

interface Steps {
  label: string;
  logo?: React.ReactNode;
}

interface SideBarProps {
  currentStep: number;
  completedSteps: number[];
}

const sidebarSteps: Steps[] = [
  { label: "Organization Settings" },
  { label: "Profile Setup" },
  { label: "Plan Selection" },
  { label: "Payment" },
  { label: "Team Management" },
  { label: "Review & Confirmation" },
];

const SideBar: React.FC<SideBarProps> = ({ currentStep, completedSteps }) => {
  return (
    <div className="max-w-[300px] bg-[#F5F7FF] min-h-screen p-3 flex flex-col gap-y-2 items-start">
      <div className="pt-7">
        <img src={perceiveNowImage} alt="Perceive Now" className="w-20 mx-auto" />
      </div>
      <div className="mt-2">
        <div className="flex flex-col items-start">
          {sidebarSteps.map((step, index) => (
            <div key={step.label} className="flex items-center gap-x-1 my-[4px]">
              {/* Step Indicator */}
              <div
                className={`w-[1.1rem] h-[1.1rem] flex items-center justify-center rounded-full ${
                  completedSteps.includes(index)
                    ? "bg-[#533F73]" // Completed step
                    : index === currentStep
                    ? "bg-[#533F73]" // Active step
                    : "bg-[#533F7380]" // Default step
                }`}
              >
                {completedSteps.includes(index) ? (
                  <img src={organizationSettingSVG} alt="Organization Settings" />
                ) : (
                  <div
                    className={`w-[0.5rem] h-[0.5rem] rounded-full ${
                      index === currentStep && "bg-[#fff]"
                    }`}
                  />
                )}
              </div>
              {/* Step Label */}
              <span
                className={`text-sm text-[#373D3F]`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
