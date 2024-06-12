import { Link } from "react-router-dom";

import WelcomePerceiveLogo from "../../assets/images/logo-small.svg";
import Button from "../reusable/button";

/**
 *
 */

const StayTuned = () => {
  return (
    <div
      className=" bg-white h-[584px] w-[932px] mx-auto rounded-lg"
      style={{ boxShadow: "0px 0px 12px 0px rgba(36, 39, 43, 0.08)" }}
    >
      <div className="py-5 flex flex-col justify-center items-center bg-white h-full w-full">
        <div className="">
          <img src={WelcomePerceiveLogo} alt="welcome to perceive now" />
        </div>
        <div className="w-[425px] h-[1px] bg-[#442873] my-5" />
        <div className="font-extrabold text-5xl mb-1 text-primary-900">Stay tuned</div>

        <div className="max-w-[750px] text-secondary-800 text-center mb-4">
          Your report will be available in just 48 hours. We're here to assist you if you have any
          questions or need further help in the meantime.
        </div>
        <div className="flex justify-center gap-2">
          <Link to="/my-reports">
            <Button type="secondary" size="small">
              See all your reports
            </Button>
          </Link>
          <Link to="/new-report">
            <Button type="primary" size="small" classname="border border-primary-900">
              Start new report
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StayTuned;
