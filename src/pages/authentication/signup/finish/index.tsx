import React, { useCallback, useState } from "react";
import Button from "../../../../components/reusable/button";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../../stores/auth";
import { useAppDispatch } from "../../../../hooks/redux";

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
    <div className="h-[calc(100vh-400px)] flex flex-col items-center justify-center space-y-4">
      <div className="space-y-1">
        <p className="text-center text-primary-900 text-3xl font-bold">
          Thank You! Your Registration is Completed
        </p>
        <p className="text-center">Please login to continue</p>
      </div>
      <Button size="small" handleClick={onContinue}>
        Login
      </Button>
    </div>
  );
};

export default Finish;
