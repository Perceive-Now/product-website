import { Link, useNavigate } from "react-router-dom";

//
import AppFooter from "../app/footer";

//
import PerceiveLogo from "../../assets/images/logo.svg";
import WelcomePerceiveLogo from "../../assets/images/welcome_perceive_now.svg";
import Button from "../reusable/button";

/**
 *
 */
export default function WelcomePage() {
  const navigate = useNavigate();

  const handleBtnClick = () => {
    navigate("/");
  };

  return (
    <div className="h-screen bg-gray-100">
      <div className="flex justify-between items-center pt-4 pb-5 px-6">
        <div className="flex justify-center">
          <Link to="/">
            <img src={PerceiveLogo} alt="PerceiveNow logo" />
          </Link>
        </div>
      </div>

      <div className="py-5 flex flex-col justify-center items-center bg-white">
        <div className="font-bold text-5xl mb-1">Welcome to Perceive Now</div>

        <div className="max-w-[600px] text-center mb-4">
          We're excited to have you join the PerceiveNow family! You're now a part of a community of
          innovative businesses harnessing the power of AI technology.
        </div>

        <div className="mb-5">
          <img src={WelcomePerceiveLogo} alt="welcome to perceive now" />
        </div>

        <Button type="optional" handleClick={handleBtnClick}>
          Start Innovating
        </Button>
      </div>

      <div className="pb-4 bg-gray-100">
        <AppFooter />
      </div>
    </div>
  );
}
