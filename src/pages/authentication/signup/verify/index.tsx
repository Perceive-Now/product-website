import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { NEW_BACKEND_URL } from "../env";
import { getUserProfile } from "src/utils/api/userProfile";

const SignupVerify = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const verifyToken = async (token: string) => {
    // check if already is verified
    const user = await getUserProfile();
    if (user?.registration_completed) {
        toast.success("Email is already verified", { position: "top-right" });
        navigate("/signup/success");
    }

    // if not verified, verify the token
    if (!token || !token.includes("-")) {
      setErrorMessage("Invalid token provided.");
      return;
    }

    try {   
      setIsVerifying(true);
      setErrorMessage(null);
      const res = await fetch(`${NEW_BACKEND_URL}/verify/${token}`);
      const result = await res.json();

      if (result.status === 200) {
        toast.success("Email verified successfully", { position: "top-right" });
        navigate("/signup/success");
      } else {
        setErrorMessage("The token is invalid or expired.");
        if (user?.registration_completed) {
          toast.success("Email is already verified", { position: "top-right" });
          navigate("/signup/success");
        }
      }
    } catch (error) {
      setErrorMessage("An error occurred while verifying your token. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    if (token && !isVerifying) {
      verifyToken(token);
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {isVerifying ? (
        <div className="text-center flex items-center flex-col">
          <p className="text-lg font-medium text-gray-700">Verifying your email...</p>
          {/* Loader */}
          <div className="mt-4 h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : errorMessage ? (
        <div className="text-center">
          <p className="text-2xl font-bold text-red-500">{errorMessage}</p>
        </div>
      ) : (
        <p className="text-lg font-medium text-gray-700">Your email verification is in progress.</p>
      )}
    </div>
  );
};

export default SignupVerify;
