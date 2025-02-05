import React from "react";
import perceiveNowImage from "../../../../assets/images/logo.svg";
import {
  organizationSettingSVG,
  profileSetupSVG,
  planSelectionSVG,
  paymentSVG,
  teamManagementSVG,
  reviewConfirmationSVG,
} from "../_assets"; // Add SVG imports for all steps
import { InvitedData } from "./layout";
import { useLocation } from "react-router-dom";

interface Steps {
  label: string;
  logo: string; // Add a logo property
}

interface SideBarProps {
  currentStep: number;
  completedSteps: number[];
  invitedData?: InvitedData | null;
}

// Sidebar steps with specific logos
const sidebarSteps: Steps[] = [
  { label: "Organization Settings", logo: organizationSettingSVG },
  { label: "Profile Setup", logo: profileSetupSVG },
  { label: "Solution Overview", logo: planSelectionSVG },
  // { label: "Payment", logo: paymentSVG },
  { label: "Team Management", logo: teamManagementSVG },
  { label: "Review & Confirmation", logo: reviewConfirmationSVG },
];

const invitedSteps: Steps[] = [
  { label: "Organization Settings", logo: organizationSettingSVG },
  { label: "Profile Setup", logo: profileSetupSVG },
  { label: "Review & Confirmation", logo: reviewConfirmationSVG },
];

const SideBar: React.FC<SideBarProps> = ({ currentStep, completedSteps, invitedData }) => {
  const pathname = useLocation().pathname;
  const steps = pathname.includes("/invite/") ? invitedSteps : sidebarSteps;

  return (
    <div className="max-w-[300px] bg-[#FFA300] min-h-screen p-3 flex flex-col gap-y-2 items-start">
      {/* Logo at the top */}
      <div className="pt-7">
        <img src={perceiveNowImage} alt="Perceive Now" className="w-20 mx-auto" />
      </div>

      {/* Steps */}
      <div className="mt-2">
        <div className="flex flex-col items-start">
          {steps.map((step, index) => (
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
                  <img
                    src={step.logo} // Use the manual logo for each step
                    alt={step.label}
                    className="w-[0.8rem] h-[0.8rem]"
                  />
                ) : (
                  <div
                    className={`w-[0.5rem] h-[0.5rem] rounded-full ${
                      index === currentStep && "bg-[#fff] animate-pulse"
                    }`}
                  />
                )}
              </div>
              {/* Step Label */}
              <span className={`text-base text-[#373D3F]`}>{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
