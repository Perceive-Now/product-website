import React, { useCallback, useState } from "react";
import UserProfile from "../user-profile/profile";
import classNames from "classnames";
import Stepper from "../../../../components/reusable/Stepper";
import CompanyProfile from "../company-details";
import SubscriptionPlan from "../subscription-plan";

const UserDetails = () => {
  const [activeStep, setActiveStep] = useState(1);
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
      component: <UserProfile changeActiveStep={changeActiveStep} />,
    },
    {
      label: "Company Details",
      value: 2,
      component: <CompanyProfile changeActiveStep={changeActiveStep} />,
    },
    {
      label: "Choose a plan",
      value: 3,
      component: <SubscriptionPlan changeActiveStep={changeActiveStep} />,
    },
    {
      label: "Finish",
      value: 4,
      component: <></>,
    },
  ];

  return (
    <div className="w-[927px] mx-auto p-5">
      <Stepper steps={steps} activeStep={activeStep} />
      {steps.map((step, idx) => (
        <div
          key={idx}
          className={classNames(
            activeStep !== step.value && "hidden",
            "px-1 h-full w-full overflow-y-auto overflow-x-hidden pn_scroller",
          )}
        >
          {step.component}
        </div>
      ))}
    </div>
  );
};

export default UserDetails;
