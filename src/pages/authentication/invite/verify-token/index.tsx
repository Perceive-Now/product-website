import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { NEW_BACKEND_URL } from "../../signup/env";

const VerifyInviteToken = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const verifyTokne = async (token: string) => {
    try {
      const res = await fetch(`${NEW_BACKEND_URL}/team/validate-invite/${token}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const result = await res.json();

      if (res.status === 200) {
        toast.success("Token verified", {
          position: "top-right",
        });
        navigate("/invite/organization-setting", {
          replace: true
        });
      } else if (
        res.status === 400 &&
        result?.detail === "You need to create an account first before accepting the invitation."
      ) {
        toast.error("You need to create an account first before accepting the invitation.", {
          position: "top-right",
        });

        navigate("/signup", {
          replace: true,
          state: {
            invited: {
              invited: true,
              token,
            },
          },
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
      verifyTokne(token);
    }
  }, [token]);

  return <div>Verifying token...</div>;
};
export default VerifyInviteToken;
