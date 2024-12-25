import Button from "src/components/reusable/button";
import perceiveNowImage from "../../../../assets/images/pn.svg";
import { useLocation, useNavigate } from "react-router-dom";

const VerificationSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // get the state from navigate(, {state: {}})
  const invitedData = location.state?.invitedData;
  console.log(invitedData)

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
          <Button type="primary" rounded="full" handleClick={() => navigate("/signup/organization-setting", {
            state: { invitedData }
          })}>
            <span className="font-light text-[15px]">Let&apos;s get started</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccess;
