import { useNavigate, useSearchParams } from "react-router-dom";
import perceiveNowImage from "src/assets/images/pn.svg";
import Button from "src/components/reusable/button";

const InviteWelcome = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const invitedData = {
    invited: searchParams.get("invited"),
    email: searchParams.get("email"),
    organization_name: searchParams.get("organization_name"),
    role: searchParams.get("role"),
    organization_industry: searchParams.get("organization_industry"),
  };

  console.log(invitedData);

  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-b from-white to-[#F7F5FF] p-2">
      <div className="flex flex-col gap-y-2 max-w-[400px] mt-[30vh] 2xl:mt-[20vh]">
        <img src={perceiveNowImage} alt="welcome" className="w-[3rem] h-[3rem]" />
        <h2 className="text-2xl font-semibold text-[#373D3F] text-left">Welcome! 🎉</h2>
        <p className="text-left text-[#373D3F] font-semibold">
          We're excited to get you started. This is the first step in setting up your account.
          You'll be guided through a few simple steps to personalize your experience.
        </p>
        <div className="mt-3">
          <Button
            type="primary"
            rounded="full"
            handleClick={() => navigate("/invite/organization-setting", {
                state: { invitedData },
            })}
          >
            <span className="font-light text-[15px]">Let&apos;s get started</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default InviteWelcome;
