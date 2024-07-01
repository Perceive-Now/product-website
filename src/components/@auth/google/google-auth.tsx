import { useNavigate, useSearchParams } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

import { useAppDispatch } from "../../../hooks/redux";
import { loginUser, signUpUser } from "../../../stores/auth";

import Button from "../../reusable/button";
import GoogleIcon from "../../icons/social/google";

interface IGoogleDetail {
  email: string;
  family_name: string;
  given_name: string;
  picture: string;
  name: string;
}

interface Props {
  title: string;
  isAgree?: boolean;
  type: "signin" | "signup";
}

export default function GoogleAuth({ title, isAgree, type }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const callbackPath = searchParams.get("callback_path");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      setIsSubmitting(true);
      try {
        const res = await axios.get(" https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        });
        const userDetail = res.data as IGoogleDetail;

        const params = {
          username: userDetail?.email || "user",
          email: userDetail?.email || "",
          password: "",
          first_name: userDetail?.given_name || "user",
          last_name: userDetail?.family_name || "user",
          company_id: "",
          accept_terms: true,
          two_fa: false,
          phone_number: "",
          profile_photo: "",
          about_me: "",
          topics_of_interest: "",
        };

        if (type === "signin") {
          const apiLogin = await dispatch(loginUser(params)).unwrap();

          if (apiLogin.success) {
            if (callbackPath) {
              navigate(callbackPath);
            } else {
              navigate("/");
            }
          } else {
            toast.error(apiLogin.message);
          }
        }
        if (type === "signup") {
          const response = await dispatch(signUpUser(params)).unwrap();
          if (response.success) {
            if (callbackPath) {
              navigate(callbackPath);
            } else {
              navigate("/user-registration");
            }
          } else {
            toast.error(response.message);
          }
        }
        setIsSubmitting(false);
      } catch (error: unknown) {
        toast.error("Google authentication is failed");
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Button
      loading={isSubmitting}
      handleClick={() => login()}
      classname="w-full"
      htmlType="button"
      type="gray"
      disabled={!isAgree}
      startIcon={<GoogleIcon />}
    >
      {title}
    </Button>
  );
}
