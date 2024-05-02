import { Link, useNavigate } from "react-router-dom";

import WelcomePerceiveLogo from "../../assets/images/logo-small.svg";
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
    <div className=" bg-white">
      <div className="py-5 mt-8 flex flex-col justify-center items-center bg-white">
        <div className="mb-5">
          <img src={WelcomePerceiveLogo} alt="welcome to perceive now" />
        </div>
        <div className="font-extrabold text-5xl mb-1 text-primary-900">Welcome to Perceive Now</div>

        <div className="max-w-[750px] text-secondary-800 text-center mb-4">
          We're excited to have you join the PerceiveNow family! <br />
          You're now a part of a community of innovative businesses harnessing the power of AI
          technology.
        </div>
        <Link to="/">
          <Button type="primary" handleClick={handleBtnClick}>
            Start Innovating
          </Button>
        </Link>
      </div>
    </div>
  );
}
