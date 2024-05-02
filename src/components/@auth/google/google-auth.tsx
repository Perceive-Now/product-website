import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../../hooks/redux";
import { loginUser, signUpUser } from "../../../stores/auth";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../reusable/button";
import GoogleIcon from "../../icons/social/google";
import axios from "axios";

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
  // const [userDetail, setUserDetail] = useState<IGoogleDetail>();
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
        // setUserDetail(res.data)
        const params = {
          username: "user",
          email: userDetail?.email || "",
          password: "pasword",
          first_name: userDetail?.given_name,
          last_name: userDetail?.family_name,
          company_id: "",
          accept_terms: true,
          two_fa: false,
          phone_number: "",
          profile_photo: "",
          about_me: "",
          topics_of_interest: "",
        };
        // App API
        const apiLogin = await dispatch(loginUser(params)).unwrap();
        // const response = await dispatch(signUpUser(params)).unwrap();
        setIsSubmitting(false);
        if (apiLogin.success) {
          if (callbackPath) {
            navigate(callbackPath);
          } else {
            if (type === "signin") {
              navigate("/");
            }
            if (type === "signup") {
              navigate("/user-registration");
            }
          }
        } else {
          toast.error(apiLogin.message);
        }
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
