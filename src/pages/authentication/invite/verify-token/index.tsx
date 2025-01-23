import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { NEW_BACKEND_URL } from "../../signup/env";
import { useAppDispatch } from "src/hooks/redux";
import { setInvitedUserToken } from "src/stores/auth";

const VerifyInviteToken = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const verifyToken = async (token: string) => {
    try {
      const res = await fetch(`${NEW_BACKEND_URL}/team/validate-invite/${token}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const result = await res.json();

      if (res.status === 200) {
        dispatch(setInvitedUserToken(token));
        toast.success("Token verified", {
          position: "top-right",
        });
        navigate("/invite/organization-setting", {
          replace: true,
        });
      } else if (
        res.status === 400 &&
        result?.detail === "You need to create an account first before accepting the invitation."
      ) {
        dispatch(setInvitedUserToken(token));
        toast.error("You need to create an account first before accepting the invitation.", {
          position: "top-right",
        });

        navigate("/signup", {
          replace: true,
        });
      } else {
        toast.error("Failed to verify token", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Failed to verify token", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    // verify the token
    if (!token?.includes("-")) {
      toast.error("Invalid token", {
        position: "top-right",
      });
      navigate("/login", {
        replace: true,
      });
    }

    if (token) {
      verifyToken(token);
    }
  }, [token]);

  return <div>Verifying token...</div>;
};
export default VerifyInviteToken;
