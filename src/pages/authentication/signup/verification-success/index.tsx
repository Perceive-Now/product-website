import Button from "src/components/reusable/button";
import perceiveNowImage from "../../../../assets/images/pn.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "src/hooks/redux";
import { useEffect, useState } from "react";
import RightArrow from "src/components/icons/common/right-arrow";

import testimonialOne from "./_assets/testimonial-first.svg";
import testimonialSecond from "./_assets/testimonial-second.svg";
import testimonialThird from "./_assets/testimonail-third.svg";

const VerificationSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInvited = useAppSelector((state) => state.auth.invitedUser);

  // Array of testimonial images
  const testimonials = [testimonialOne, testimonialSecond, testimonialThird];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // get the state from navigate(, {state: {}})
  const invitedData = location.state?.invitedData;
  console.log(invitedData);

  useEffect(() => {
    if (userInvited?.token) {
      // redirect the user to the /invite-link/${token} but using window
      window.location.href = `/invite-link/${userInvited.token}`;
    }
  }, [userInvited]);

  // Change image every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true); // Start fade out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        setIsFading(false); // Start fade in
      }, 500); // Halfway through the interval, change the image
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-between min-h-screen bg-gradient-to-b from-white to-[#F7F5FF] p-2">
      <div className="flex flex-[1] flex-col gap-y-2 mt-[30vh] 2xl:mt-[20vh] p-5">
        <h2 className="text-6xl mb-4 font-semibold text-[#373D3F] text-left">Welcome! 🎉</h2>
        <p className="text-left mb-4 text-[#373D3F] font-medium text-[18px]">
          We're excited to get you started.
        </p>
        <p className="text-left text-[#373D3F] font-medium text-[18px]">
          This is the first step in setting up your account. You'll be guided through a few simple
          steps to personalize your experience.
        </p>
        <div className="mt-3">
          {/* <Button
            type="primary"
            rounded="full"
            handleClick={() =>
              navigate("/signup/organization-setting", {
                state: { invitedData },
              })
            }
          >
            <span className="font-light text-[15px]">Let&apos;s get started</span>
          </Button> */}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => navigate("/signup/organization-setting", { state: { invitedData } })}
              type="submit"
              className="flex items-center justify-center border-4 bg-secondary-500  border-[#442873] rounded-[32px] py-1 px-2 text-lg text-white"
            >
              Let&apos;s get started
              <RightArrow className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Image with fade animation */}
      <div className="flex-[1.5] hidden lg:flex justify-center items-center">
        <img
          src={testimonials[currentIndex]}
          alt="welcome"
          className={`transition-opacity duration-500 ${isFading ? "opacity-0" : "opacity-100"}`}
        />
      </div>
    </div>
  );
};

export default VerificationSuccess;
