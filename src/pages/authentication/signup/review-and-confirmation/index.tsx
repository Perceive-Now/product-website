import { useEffect, useState } from "react";
import SignUpLayout from "../_components/layout";
import { inputArrow } from "../_assets"; // Replace with your arrow asset path
import Button from "src/components/reusable/button";
import { useLocation, useNavigate } from "react-router-dom";
import { getCompanies, getUserProfile } from "src/utils/api/userProfile";
import Loading from "src/components/reusable/loading";
import { useAppSelector } from "src/hooks/redux";

type ExpandedSections = {
  organizationSettings: boolean;
  teamMembers: boolean;
};

const ReviewConfirmationScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const invitedData = location.state?.invitedData;
  const profileData = location.state?.profileData;

  const [expanded, setExpanded] = useState<ExpandedSections>({
    organizationSettings: false,
    teamMembers: false,
  });
  const [user, setUser] = useState<any | null>(null);
  const [company, setCompany] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const team = useAppSelector((state) => state.auth.team);

  const toggleSection = (section: keyof ExpandedSections) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const [user, companies] = await Promise.all([getUserProfile(), getCompanies()]);
        const user_company = await companies.find((company) => company.id === user.company_id);

        setUser(user);
        setCompany(user_company);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <SignUpLayout invitedData={invitedData} currentStep={5} completedSteps={[0, 1, 2, 3, 4]}>
      {loading ? (
        <Loading width="50px" height="50px" 
          isLoading={loading}
        />
      ) : (
        <div className="max-w-[800px] p-7 space-y-[40px]">
          {/* Title */}
          <h1 className="text-[20px] font-semibold text-[#373D3F]">Review & Confirmation</h1>
          <p className="text-[#4F4F4F]">Here’s a summary of your setup:</p>

          {/* Team Member */}
          <div className="flex items-center justify-between bg-[#F5F7FF66] p-2 rounded-md">
            <div className="flex gap-3 items-center">
              <span className="px-3 py-1 bg-[#F3F2F7] text-[#4F4F4F] rounded-lg text-sm font-medium">
                {user?.job_position || invitedData?.role || "Member"}
              </span>
              <p className="text-[16px] font-medium text-[#4F4F4F]">
                {(user && user?.first_name + " " + user?.last_name) ||
                  profileData?.fullName ||
                  "John Doe"}
              </p>
            </div>
            <button
              className="text-[#4F4F4F] text-xs"
              onClick={() => {
                if (invitedData) {
                  navigate("/signup/profile", { state: { invitedData } });
                } else {
                  navigate("/signup/profile");
                }
              }}
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
                <div className=" max-w-[60%] flex flex-col gap-y-2">
                  <div className="grid grid-cols-2 gap-x-1">
                    <p className="text-[#4F4F4F]">Organization Name</p>
                    <span className="px-3 py-1 bg-[#F3F2F7] text-[#4F4F4F] rounded-lg w-fit">
                      {(company && company?.name) ||
                        invitedData?.organization_name ||
                        "Perceive Now"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-1">
                    <p className="text-[#4F4F4F]">Industry</p>
                    <span className="px-3 py-1 bg-[#F3F2F7] text-[#4F4F4F] rounded-lg w-fit">
                      {invitedData?.organization_industry || user?.about_me || "Not Specified"}
                    </span>
                  </div>
                  <div className="hidden">
                    <p className="text-[#4F4F4F]">Default Agent</p>
                    <span className="px-3 py-1 bg-[#F3F2F7] text-[#4F4F4F] rounded-lg w-fit">
                      Market Fit Agent
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <button
                    className="text-[#4F4F4F] text-xs"
                    onClick={() => {
                      if (invitedData) {
                        navigate("/signup/organization-setting", { state: { invitedData } });
                      } else {
                        navigate("/signup/organization-setting");
                      }
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Team Members - Expandable */}
          <div
            className={`cursor-pointer bg-[#F5F7FF66] rounded-md p-2 ${
              expanded.teamMembers && "bg-[#F5F7FF66]"
            }
          ${invitedData && "hidden"}
          `}
          >
            <div
              className="flex items-center justify-between"
              onClick={() => toggleSection("teamMembers")}
            >
              <h2 className="text-[#373D3F] text-[16px] font-semibold">Team Members</h2>
              <img
                src={inputArrow}
                alt="toggle-arrow"
                className={`w-4 h-4 transform transition-transform ${
                  expanded.teamMembers ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            {expanded.teamMembers && (
              <div className="mt-3 border-t border-gray-200 pt-2">
                {team?.map((member, index) => (
                  <div
                    key={index}
                    className="flex gap-x-1 justify-between items-center bg-[#F5F7FF66] p-2 my-2 rounded-md"
                  >
                    <div className="flex items-center gap-4">
                      <p className="text-[16px] font-semibold text-[#373D3F] bg-gray-200 p-1 rounded-md">
                        {"User"}
                      </p>
                      <p className="text-[16px] text-[#4F4F4F]">{member}</p>
                      <span className="text-[#373D3F] text-xs bg-[#E8EAF2] p-1 rounded-md">
                        Pending
                      </span>
                    </div>
                    {/* <p
                      className="text-xs text-[#373D3F] cursor-pointer"
                      onClick={() => setTeamMembers(teamMembers.filter((_, i) => i !== index))}
                    >
                      Cancel
                    </p> */}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-start space-x-[16px] mt-8">
            <Button
              rounded="full"
              type="secondary"
              classname="w-[120px]"
              handleClick={() => {
                if (invitedData) {
                  navigate("/signup/profile", { state: { invitedData } });
                } else {
                  navigate("/signup/team");
                }
              }}
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
      )}
    </SignUpLayout>
  );
};

export default ReviewConfirmationScreen;
