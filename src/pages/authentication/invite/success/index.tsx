import { useCallback, useState } from "react";
import Button from "../../../../components/reusable/button";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../../stores/auth";
import { useAppDispatch } from "../../../../hooks/redux";

// image
import perceiveNowImage from "../../../../assets/images/pn.svg";

const InviteFinish = () => {
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
    <div className="flex justify-center min-h-screen bg-gradient-to-b from-white to-[#F7F5FF] p-2">
      <div className="flex flex-col gap-y-2 max-w-[400px] mt-[30vh] 2xl:mt-[20vh]">
        <img src={perceiveNowImage} alt="welcome" className="w-[3rem] h-[3rem]" />
        <h2 className="text-2xl font-semibold text-[#373D3F] text-left">You’re All Set! 🚀</h2>
        <p className="text-left text-[#373D3F] font-semibold">
          Great job completing your setup! Now, let’s get to work and start making things happen.
          Click below to dive right in and explore what’s next.
        </p>
        <div className="mt-3">
          <Button
            type="primary"
            rounded="full"
            handleClick={() =>
              navigate("/", {
                replace: true,
              })
            }
          >
            <span className="font-light text-[15px]">Let&apos;s Get to Work!</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InviteFinish;
