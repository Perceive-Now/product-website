import { useEffect, useState } from "react";
import InviteLayout from "../_components/InviteLayout";
import { inputArrow } from "../../signup/_assets"; // Replace with your arrow asset path
import Button from "src/components/reusable/button";
import { useLocation, useNavigate } from "react-router-dom";

type ExpandedSections = {
  organizationSettings: boolean;
};

const InviteReviewConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData; // Accessing formData from location.state
  const invitedData = location.state?.invitedData;

  console.log(invitedData, "hello");
  console.log(formData);
  console.log("from review and confirmation");

  const [expanded, setExpanded] = useState<ExpandedSections>({
    organizationSettings: false,
  });

  const toggleSection = (section: keyof ExpandedSections) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <InviteLayout currentStep={5} completedSteps={[0, 1, 2, 3, 4]}>
      <div className="max-w-[800px] p-7 space-y-[40px]">
        {/* Title */}
        <h1 className="text-[20px] font-semibold text-[#373D3F]">Review & Confirmation</h1>
        <p className="text-[#4F4F4F]">Here’s a summary of your setup:</p>

        {/* User Information */}
        <div className="flex items-center justify-between bg-[#F5F7FF66] p-2 rounded-md">
          <div className="flex gap-3 items-center">
            <span className="px-3 py-1 bg-[#F3F2F7] text-[#4F4F4F] rounded-lg text-sm font-medium">
              {invitedData?.role || "Member"}
            </span>
            <p className="text-[16px] font-medium text-[#4F4F4F]">
              {`${formData?.first_name || ""} ${formData.last_name || ""}` || "John Doe"}
            </p>
          </div>
          <button
            className="text-[#4F4F4F] text-xs"
            onClick={() => navigate("/signup/profile", { state: { formData } })}
          >
            Edit
          </button>
        </div>

        {/* Organization Settings - Expandable */}
        <div
          className={`cursor-pointer bg-[#F5F7FF66] rounded-md p-2 ${
            expanded.organizationSettings && "bg-[#F5F7FF66]"
          }`}
        >
          <div
            className="flex items-center justify-between"
            onClick={() => toggleSection("organizationSettings")}
          >
            <h2 className="text-[#373D3F] text-[16px] font-semibold">Organization Settings</h2>
            <img
              src={inputArrow}
              alt="toggle-arrow"
              className={`w-4 h-4 transform transition-transform ${
                expanded.organizationSettings ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          {expanded.organizationSettings && (
            <div className="mt-3 space-y-2">
              <div className="max-w-[60%] flex flex-col gap-y-2">
                <div className="grid grid-cols-2 gap-x-1">
                  <p className="text-[#4F4F4F]">Organization Name</p>
                  <span className="px-3 py-1 bg-[#F3F2F7] text-[#4F4F4F] rounded-lg w-fit">
                    {invitedData?.organization_name || "Perceive Now"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-1">
                  <p className="text-[#4F4F4F]">Industry</p>
                  <span className="px-3 py-1 bg-[#F3F2F7] text-[#4F4F4F] rounded-lg w-fit">
                    {invitedData?.organization_industry || "Not Specified"}
                  </span>
                </div>
              </div>
              <div className="text-right hidden">
                <button className="text-[#4F4F4F] text-xs">Edit</button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-start space-x-[16px] mt-8">
          <Button
            rounded="full"
            type="secondary"
            classname="w-[120px]"
            handleClick={() => navigate("/invite/profile", { state: { formData } })}
          >
            Back
          </Button>
          <Button
            rounded="full"
            classname="w-[120px]"
            handleClick={() => navigate("/signup/finish")}
          >
            Confirm
          </Button>
        </div>
      </div>
    </InviteLayout>
  );
};

export default InviteReviewConfirmation;
