import { Link } from "react-router-dom";

import WelcomePerceiveLogo from "../../assets/images/logo-small.svg";
import Button from "../reusable/button";

/**
 *
 */

const StayTuned = () => {
  return (
    <div className=" bg-white">
      <div className="py-5 mt-8 flex flex-col justify-center items-center bg-white">
        <div className="">
          <img src={WelcomePerceiveLogo} alt="welcome to perceive now" />
        </div>
        <div className="w-[425px] h-[1px] bg-primary-900 my-5" />
        <div className="font-extrabold text-5xl mb-1 text-primary-900">Stay tuned</div>

        <div className="max-w-[750px] text-secondary-800 text-center mb-4">
          Your report will be available in just 48 hours. We're here to assist you if you have any
          questions or need further help in the meantime.
        </div>
        <div className="flex justify-center gap-2">
          <Link to="/">
            <Button type="secondary" size="small">
              Go home
            </Button>
          </Link>
          <Link to="/">
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
