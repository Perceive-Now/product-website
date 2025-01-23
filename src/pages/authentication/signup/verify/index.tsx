import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { NEW_BACKEND_URL } from "../env";
import { getUserProfile } from "src/utils/api/userProfile";
import Button from "src/components/reusable/button";

const SignupVerify = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const verifyToken = async (token: string) => {
    if (!token || !token.includes("-")) {
      setErrorMessage("Invalid token provided.");
      return;
    }

    try {
      setIsVerifying(true);
      setErrorMessage(null);

      // First check if already verified
      try {
        const user = await getUserProfile();
        console.log(user);
        if (user?.registration_completed) {
          toast.success("Email is already verified", { position: "top-right" });
          navigate("/signup/success");
          return;
        }
      } catch (error) {
        console.error("Error checking user profile:", error);
      }

      // Proceed with verification
      const res = await fetch(`${NEW_BACKEND_URL}/verify/${token}`);

      // Handle 404 and other error status codes
      if (res.status === 404) {
        setErrorMessage("The verification token was not found or has expired.");
        return;
      }

      if (!res.ok) {
        throw new Error(`Verification failed with status: ${res.status}`);
      }

      const result = await res.json();

      // Only show success and navigate if we actually get a successful response
      if (result.success) {
        toast.success("Email verified successfully", { position: "top-right" });
        navigate("/signup/success");
      } else {
        // Handle case where HTTP status is ok but result indicates failure
        setErrorMessage(result.message || "Verification failed");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An error occurred during verification. Please try again.",
      );
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
          <div className="mt-4 h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : errorMessage ? (
        <div className="text-center">
          <p className="text-2xl font-bold text-red-500">{errorMessage}</p>
          <Button handleClick={() => window.location.reload()}>Try Again</Button>
        </div>
      ) : (
        <p className="text-lg font-medium text-gray-700">Your email verification is in progress.</p>
      )}
    </div>
  );
};

export default SignupVerify;
