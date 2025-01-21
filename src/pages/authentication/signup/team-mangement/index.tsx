import { useEffect, useState } from "react";
import SignUpLayout from "../_components/layout";
import Button from "src/components/reusable/button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getUserProfile } from "src/utils/api/userProfile";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { NEW_BACKEND_URL } from "../env";
import { roles } from "../../invite/profile-setup/_constants/roles";
import { addTeamMember } from "src/stores/auth";
import EmailChipInput from "src/components/reusable/input/EmailInput";

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
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");
  const [note, setNote] = useState("");
  const [teamMembers, setTeamMembers] = useState<{ email: string; role: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const team = useAppSelector((state) => state.auth.team);
  const session = useAppSelector((state) => state.sessionDetail.session);

  useEffect(() => {
    const fetchUser = async () => {
      // Mock API call
      const user = await getUserProfile();

      if (user?.job_position !== "Admin") {
        navigate("/signup/review");
      }
    };
    fetchUser();
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [error, setError] = useState("")

  const handleInvite = async () => {



    if (error) {
      return
    }
    if (!emails.length && !inputValue) {
      setError("Please enter email")
      return
    }
    setIsSubmitting(true);

    try {
      const user_id = session?.user_id;
      if (!user_id) {
        toast.error("Failed to add team members. Please try again.", {
          position: "top-right",
        });
        return;
      }

      setIsSubmitting(true);

      const finalEmailList = emails;
      if (inputValue) {
        finalEmailList.push(inputValue)
      }

      // Map each email to a promise for API call
      const emailPromises = finalEmailList.map((email) => {
        const data = {
          email,
          role: "User",
          permissions: ["read"],
        };

        return fetch(`${NEW_BACKEND_URL}/team/invite?user_id=${user_id}`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then(async (res) => {
            if (res.status === 200) {
              toast.success(`Invitation sent to ${email}.`, {
                position: "top-right",
              });
              return { success: true, email };
            } else {
              throw new Error(`Failed to send invite to ${email}`);
            }
          })
          .catch((error) => {
            toast.error(`Failed to add team member ${email}. Please try again.`, {
              position: "top-right",
            });
            return { success: false, email };
          });
      });

      // Wait for all promises to resolve
      const results = await Promise.all(emailPromises);

      // Process successful invitations
      const successfulInvites = results.filter((result) => result.success);
      if (successfulInvites.length > 0) {
        setEmails([])
        setInputValue("")
        setTeamMembers((prev) =>
          prev.concat(successfulInvites.map((invite) => ({ email: invite.email, role: "User" })))
        );
        successfulInvites.forEach((invite) => {
          dispatch(addTeamMember(invite.email));
        });
      }

      // Optional: Handle overall success/failure
      const failedInvites = results.filter((result) => !result.success);
      if (failedInvites.length > 0) {
        console.error("Failed invites:", failedInvites);
      }
    } catch (error) {
      console.error("Error inviting emails:", error);
      toast.error("Failed to add team members. Please try again.", {
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <SignUpLayout currentStep={2} completedSteps={[0, 1]}>
      <div className="max-w-[1000px] p-7 space-y-[40px]">
        {/* Title */}
        <h1 className="text-[20px] font-semibold text-[#373D3F]">Team Management</h1>

        {/* Invite Section */}
        <div className="space-y-[16px]">
          <p className="text-[#4F4F4F]">Let’s invite some team members.</p>
          <div className="bg-[#F5F7FF66] p-3 rounded-xl max-w-[90%]">
            <div className="w-full">
              <div>
                <label htmlFor="email" className="text-[16px] text-[#4F4F4F] block mb-2">
                  Who would you like to invite to join your team?
                </label>
                <EmailChipInput emails={emails} setEmails={setEmails} setError={setError} teamMembers={teamMembers.map((mem) => mem.email)} inputValue={inputValue} setInputValue={setInputValue} />
                <p className="text-red-500 text-sm mt-2">{error}</p>
              </div>
              {/* <div>
                <label htmlFor="role" className="text-[16px] text-[#4F4F4F] block mb-2">
                  What role would they have in the organization?
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-[48px] border-[1px] border-[#87888C] rounded-lg px-[12px] text-[16px] bg-[#FCFCFC] text-[#4F4F4F] outline-none"
                >
                  {roles
                    .filter((role) => role !== "Admin" && role !== "Other")
                    .map((role, index) => (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    ))}
                </select>
              </div> */}
            </div>
            {/* <div className="mt-2">
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
            </div> */}
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
              {team?.map((member, index) => (
                <div
                  key={index}
                  className="flex gap-x-1 justify-between items-center bg-[#F5F7FF66] p-2 my-2 rounded-md"
                >
                  <div className="flex items-center gap-4">
                    <p className="text-[16px] font-semibold text-[#373D3F]">{member || "User"}</p>
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
          ) : (
            <p className="text-gray-400">No team members added yet.</p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between space-x-[16px]">
          <div className="flex space-x-[16px]">
            <Button
              rounded="full"
              type="gray"
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

          <Button
            rounded="full"
            type="secondary"
            classname="w-[120px]"
            handleClick={() => navigate("/signup/review")}
          >
            Skip
          </Button>
        </div>
      </div>
    </SignUpLayout>
  );
};

export default TeamManagementScreen;
