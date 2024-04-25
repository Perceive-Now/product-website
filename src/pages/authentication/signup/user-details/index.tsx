import React, { useCallback, useState } from "react";
import UserProfile from "../user-profile/profile";
import classNames from "classnames";
import Stepper from "../../../../components/reusable/Stepper";
import CompanyProfile from "../company-details";
// import SubscriptionPlan from "../subscription-plan";
// import Prcing1 from "../subscription-plan/subcription-demo";
import Finish from "../finish";

const UserDetails = () => {
  const [activeStep, setActiveStep] = useState(1);
  //
  const changeActiveStep = useCallback((stepValue: number) => {
    if (stepValue < steps.length && stepValue >= 0) {
      setActiveStep(stepValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   // Create an instance of universal-cookie
  //   const cookies = new Cookies();

  //   // Retrieve session ID and user ID from cookies
  //   const sessionID = cookies.get('sessionID');
  //   const userID = cookies.get('userID');
  //   const token = cookies.get('token');

  //   // jsCookie.set("pn_refresh", token);
  //   // sessionStorage.setItem("pn_access", token);

  //   // Use session ID and user ID as needed
  //   console.log('Session ID:', sessionID);
  //   console.log('User ID:', userID);
  //   console.log('token:', token);

  //   // Your code logic here
  // }, []);

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
    // {
    //   label: "Plan",
    //   value: 3,
    //   component: <Prcing1 changeActiveStep={changeActiveStep} />,
    // },
    {
      label: "Finish",
      value: 3,
      component: <Finish />,
    },
  ];

  return (
    <div className="w-[927px] mx-auto p-5">
      <Stepper steps={steps} activeStep={activeStep} />
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
