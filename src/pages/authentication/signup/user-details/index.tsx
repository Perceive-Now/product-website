import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";

import UserProfile from "../user-profile/profile";

import Stepper from "../../../../components/reusable/Stepper";

import { WelcomePage } from "../../../../components/@signup-complete";
import { useAppSelector } from "../../../../hooks/redux";
import { useNavigate } from "react-router-dom";
import SignUpLayout from "../_components/layout";

const UserDetails = () => {
  const [activeStep, setActiveStep] = useState(1);
  const navigate = useNavigate();

  const userDetail = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (userDetail) {
      if (userDetail.registration_completed) {
        navigate("/");
      }
    }
  }, [navigate, userDetail]);

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
      label: "Finish",
      value: 2,
      component: <WelcomePage />,
    },
  ];

  return (
    <SignUpLayout
      currentStep={0}
      completedSteps={[0]}
    >
      <div className="w-[927px] mx-auto p-5">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={classNames(activeStep !== step.value && "hidden", "px-1 h-full w-full")}
          >
            {step.component}
          </div>
        ))}
      </div>
    </SignUpLayout>
  );
};

export default UserDetails;
