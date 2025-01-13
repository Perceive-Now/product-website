import { useEffect, useState } from "react";
import InviteLayout from "../_components/InviteLayout";
import { inputArrow } from "../../signup/_assets"; // Replace with your arrow asset path
import Button from "src/components/reusable/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "src/hooks/redux"; // Assuming you're using Redux to manage the session state
import { NEW_BACKEND_URL } from "../../signup/env"; // Your backend URL
import { AppConfig } from "src/config/app.config"; // Configuration for organization secret

type ExpandedSections = {
  organizationSettings: boolean;
};

const InviteReviewConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData; // Accessing formData from location.state
  const invitedData = location.state?.invitedData;
  const session = useAppSelector((state) => state.sessionDetail.session); // Getting the session from Redux state
  const user = useAppSelector((state) => state.auth.user);

  // User details state
  const [userDetails, setUserDetails] = useState<any>(null); // State to hold the fetched user details
  const [expanded, setExpanded] = useState<ExpandedSections>({
    organizationSettings: false,
  });

  // Fetch user details from the backend
  const fetchUserDetails = async (sessionId: number) => {
    try {
      const res = await fetch(`${NEW_BACKEND_URL}/user/details/${sessionId}`, {
        headers: {
          Accept: "application/json",
          "secret-code": AppConfig.ORGANIZATION_SECRET as string, // Use secret code as required
        },
      });
      const data = await res.json();

      if (data?.user_details) {
        setUserDetails(data.user_details); // Populate user details state
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  // Fetch user details when the session is available
  useEffect(() => {
    if (session?.user_id) {
      fetchUserDetails(session?.user_id);
    }
  }, [session]);

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
              {userDetails?.role || "Member"}
            </span>
            <p className="text-[16px] font-medium text-[#4F4F4F]">
              {`${user?.first_name || "John"} ${user?.last_name || "Doe"}`}
            </p>
          </div>
          <button className="text-[#4F4F4F] text-xs" onClick={() => navigate("/invite/profile")}>
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
                    {user?.company_name || "Perceive Now"}
                  </span>
                </div>
                {/* <div className="grid grid-cols-2 gap-x-1">
                  <p className="text-[#4F4F4F]">Industry</p>
                  <span className="px-3 py-1 bg-[#F3F2F7] text-[#4F4F4F] rounded-lg w-fit">
                    {user?.organization_industry || "Not Specified"}
                  </span>
                </div> */}
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
