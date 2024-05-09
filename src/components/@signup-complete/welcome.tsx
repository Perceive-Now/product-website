import { useNavigate } from "react-router-dom";

import WelcomePerceiveLogo from "../../assets/images/logo-small.svg";
import Button from "../reusable/button";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setUser } from "../../stores/auth";

/**
 *
 */
export default function WelcomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userDetail = useAppSelector((state) => state.auth.user);

  const handleBtnClick = () => {
    dispatch(setUser({ ...userDetail, registration_completed: true }));
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
        <Button type="primary" handleClick={handleBtnClick}>
          Start Innovating
        </Button>
      </div>
    </div>
  );
}
