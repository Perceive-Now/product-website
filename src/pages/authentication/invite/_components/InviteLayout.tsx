import React, { PropsWithChildren } from "react";
import SideBar from "../../signup/_components/sidebar";

export interface InvitedData {
  invited: string;
  email: string;
  organization_name: string;
  role: string;
  organization_industry: string;
}

interface InviteLayoutProps extends PropsWithChildren {
  currentStep: number; // Current active step index
  completedSteps: number[]; // Indices of completed steps
  invitedData?: InvitedData;
}

const InviteLayout: React.FC<InviteLayoutProps> = ({
  children,
  currentStep,
  completedSteps,
  invitedData = null,
}) => {
  return (
    <div className="flex">
      {/* Pass currentStep and completedSteps to the SideBar */}
      <SideBar
        invitedData={invitedData || null}
        currentStep={currentStep}
        completedSteps={completedSteps}
      />
      <div className="flex-1 p-2">{children}</div>
    </div>
  );
};

export default InviteLayout;
