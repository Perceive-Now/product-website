import React, { useCallback, useState } from "react";
import UserProfile from "../user-profile/profile";
import classNames from "classnames";
import Stepper from "../../../../components/reusable/Stepper";
import CompanyProfile from "../company-details";
// import SubscriptionPlan from "../subscription-plan";
// import Prcing1 from "../subscription-plan/subcription-demo";
// import Finish from "../finish";
import { WelcomePage } from "../../../../components/@signup-complete";
import { useAppSelector } from "../../../../hooks/redux";
import Prcing1 from "../subscription-plan/subcription-demo";
import SubscriptionPlan from "../subscription-plan";

const UserDetails = () => {
  const [activeStep, setActiveStep] = useState(3);

  const userDetail = useAppSelector((state) => state.auth.user);
  //
  const changeActiveStep = useCallback((stepValue: number) => {
    if (stepValue < steps.length && stepValue >= 0) {
      setActiveStep(stepValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = [
    {
      label: "Email verified",
      value: 0,
      component: <></>,
    },
    {
      label: "User Profile",
      value: 1,
      component: <UserProfile changeActiveStep={changeActiveStep} userDetail={userDetail} />,
    },
    {
      label: "Company Details",
      value: 2,
      component: <CompanyProfile changeActiveStep={changeActiveStep} userDetail={userDetail} />,
    },
    {
      label: "Plan",
      value: 3,
      component: <SubscriptionPlan changeActiveStep={changeActiveStep} />,
    },
    {
      label: "Finish",
      value: 4,
      component: <WelcomePage />,
    },
  ];

  return (
    <div className="w-[927px] mx-auto p-5">
      <div className="sticky top-0 bg-white pt-2 pb-8 z-10">
        <Stepper steps={steps} activeStep={activeStep} />
      </div>
      {steps.map((step, idx) => (
        <div
          key={idx}
          className={classNames(activeStep !== step.value && "hidden", "px-1 h-full w-full")}
        >
          {step.component}
        </div>
      ))}
    </div>
  );
};

export default UserDetails;
