import { useCallback, useState } from "react";
import Button from "../../../../components/reusable/button";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../../stores/auth";
import { useAppDispatch } from "../../../../hooks/redux";

// image
import perceiveNowImage from "../../../../assets/images/pn.svg";
import PrimaryButton from "src/components/reusable/button/primary-button";
import backgroundImage from "../_assets/background.png";

import RightArrow from "src/components/icons/common/right-arrow";

const Finish = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const onContinue = useCallback(async () => {
    // navigate("/login")
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    await dispatch(logoutUser()).unwrap();
    navigate("/login");

    setIsLoggingOut(false);
  }, [dispatch, isLoggingOut, navigate]);

  return (
    <div className="flex justify-between min-h-screen bg-gradient-to-b from-white to-[#F7F5FF]">
      <div className="flex flex-col mx-auto gap-y-2 flex-[1] max-w-[550px] mt-[30vh] 2xl:mt-[20vh]">
        <h2 className="text-5xl mb-4 font-semibold text-[#373D3F] text-left">
          You’re Ready to Elevate Your Decisions! 🚀
        </h2>
        <p className="text-left text-[#373D3F] font-normal">
          Great job setting everything up! Your account is ready, and the power to make confident,
          data-driven decisions is now at your fingertips. Start exploring tailored insights,
          smarter tools, and endless opportunities.
        </p>
        <div className="flex justify-end mt-3">
          {/* <Button
            type="primary"
            rounded="full"
            handleClick={() =>
              navigate("/", {
                replace: true,
              })
            }
            >
            <span className="font-light text-[15px]">Let&apos;s Get to Work!</span>
            </Button> */}
          <PrimaryButton
            onClick={() => {
              navigate("/", {
                replace: true,
              });
            }}
            text="Make it happen"
            icon={<RightArrow />}
            variant="primary"
          />
        </div>
      </div>
      <div className="hidden md:flex md:flex-[0.5]">
        <img src={backgroundImage} alt="Perceive Now" />
      </div>
    </div>
  );
};

export default Finish;
