import { useState } from "react";
import SignUpLayout from "../_components/layout";
import Button from "src/components/reusable/button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const mockApiCall = async (data: { email: string; role: string }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock API called with:", data);
      resolve("Success");
    }, 1000);
  });
};

const TeamManagementScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Co-founder");
  const [note, setNote] = useState("");
  const [teamMembers, setTeamMembers] = useState<{ email: string; role: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInvite = async () => {
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-right",
      });
      return;
    }

    if (note.length > 200) {
      toast.error("The note cannot exceed 200 characters.", {
        position: "top-right",
      });
      return;
    }

    // Check if the email already exists in the team members list
    const isDuplicate = teamMembers.some((member) => member.email === email);
    if (isDuplicate) {
      toast.error("This email is already in your team.", {
        position: "top-right",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call
      await mockApiCall({ email, role });
      setTeamMembers([...teamMembers, { email, role }]);
      setEmail("");
      setNote("");
      toast.success("Team member invitation sent!", {
        position: "top-right",
      });
    } catch (error) {
      toast.error("Failed to add team member. Please try again.", {
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SignUpLayout currentStep={2} completedSteps={[0, 1]}>
      <div className="max-w-[1000px] p-7 space-y-[40px]">
        {/* Title */}
        <h1 className="text-[20px] font-semibold text-[#373D3F]">Team Management</h1>

        {/* Invite Section */}
        <div className="space-y-[16px]">
          <p className="text-[#4F4F4F]">Let’s invite some team members.</p>
          <div className="bg-[#F5F7FF66] p-3 rounded-xl max-w-[90%]">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="email" className="text-[16px] text-[#4F4F4F] block mb-2">
                  Who would you like to invite to join your team?
                </label>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full flex-1 h-[48px] border-[1px] border-[#87888C] rounded-lg px-[12px] text-[16px] bg-[#FCFCFC] text-[#4F4F4F] outline-none"
                />
              </div>
              <div>
                <label htmlFor="role" className="text-[16px] text-[#4F4F4F] block mb-2">
                  What role would they have in the organization?
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-[48px] border-[1px] border-[#87888C] rounded-lg px-[12px] text-[16px] bg-[#FCFCFC] text-[#4F4F4F] outline-none"
                >
                  <option value="Co-founder">Co-founder</option>
                  <option value="Manager">Manager</option>
                  <option value="Contributor">Contributor</option>
                </select>
              </div>
            </div>
            <div className="mt-2">
              <label htmlFor="note" className="text-[16px] text-[#4F4F4F] block mb-2">
                Would you like to include a personalized message in the invitation? (Optional)
              </label>
              <textarea
                placeholder="Optional note (max 200 characters)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-[60%] h-[120px] border-[1px] border-[#87888C] rounded-lg px-[12px] py-[8px] text-[16px] bg-[#FCFCFC] text-[#4F4F4F] outline-none"
                maxLength={200}
              />
            </div>
            <Button
              rounded="full"
              classname="w-[120px] mt-2"
              disabled={isSubmitting}
              handleClick={handleInvite}
              loading={isSubmitting}
            >
              Add
            </Button>
          </div>
        </div>

        {/* Team List */}
        <div className="mt-[40px]">
          <p className="text-[#4F4F4F] mb-2">Your team</p>
          {teamMembers.length > 0 ? (
            <div className="border-gray-200">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex gap-x-1 justify-between items-center bg-[#F5F7FF66] p-2 my-2 rounded-md"
                >
                  <div className="flex items-center gap-4">
                    <p className="text-[16px] font-semibold text-[#373D3F]">{member.role}</p>
                    <p className="text-[16px] text-[#4F4F4F]">{member.email}</p>
                    <span className="text-[#373D3F] text-xs bg-[#E8EAF2] p-1 rounded-md">
                      Pending
                    </span>
                  </div>
                  <p
                    className="text-xs text-[#373D3F] cursor-pointer"
                    onClick={() => setTeamMembers(teamMembers.filter((_, i) => i !== index))}
                  >
                    Cancel
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No team members added yet.</p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-start space-x-[16px]">
          <Button
            rounded="full"
            type="secondary"
            classname="w-[120px]"
            handleClick={() => navigate("/signup/profile")}
          >
            Back
          </Button>
          <Button
            rounded="full"
            classname="w-[120px]"
            handleClick={() => navigate("/signup/review")}
          >
            Next
          </Button>
        </div>
      </div>
    </SignUpLayout>
  );
};

export default TeamManagementScreen;
