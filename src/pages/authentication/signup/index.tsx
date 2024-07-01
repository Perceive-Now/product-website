import { toast } from "react-hot-toast";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

//
import * as yup from "yup";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//
import Button from "../../../components/reusable/button";
import { EyeClosedIcon, EyeIcon } from "../../../components/icons";

//

// Store
import { useAppDispatch } from "../../../hooks/redux";
import { signUpUser } from "../../../stores/auth";
import CheckboxInput from "../../../components/reusable/check-box/checkbox";
import GoogleAuth from "../../../components/@auth/google";
import { WEBSITE_URL } from "../../../utils/constants";

/**
 *
 */

export default function SignupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const callbackPath = searchParams.get("callback_path");

  //
  const dispatch = useAppDispatch();

  //
  const [isAgree, setIsAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const formInitialValue: IRegisterForm = {
    email: "",
    password: "",
    agree: false,
  };

  const formResolver = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email address is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
      ),
    agree: yup.boolean().required(""),
  });

  const { watch, register, formState, handleSubmit } = useForm({
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });

  const { errors } = formState;

  const handleLogin = async (values: IRegisterForm) => {
    setIsSubmitting(true);

    const params = {
      username: values.email,
      email: values.email,
      password: values.password,
      first_name: "",
      last_name: "",
      accept_terms: true,
      two_fa: false,
      phone_number: "",
      profile_photo: "",
      about_me: "",
      topics_of_interest: "",
    };

    // Signup user
    const response = await dispatch(signUpUser(params)).unwrap();

    if (response.success) {
      if (callbackPath) {
        navigate(callbackPath);
      } else {
        toast.success("User is registered");
        navigate("/user-registration");
      }
    } else {
      toast.error(response.message);
    }

    setIsSubmitting(false);
  };

  const emailValue = watch("email");
  const passwordValue = watch("password");

  // if (!isGoogleSubmitting) {
  //   return (
  //     <div className="h-screen flex items-center justify-center opacity-50 absolute">
  //       <LoadingIcon />
  //     </div>
  //   )
  // }

  return (
    <div className="flex h-full 2xl:h-[calc(100vh-200px)] justify-center items-center px-2">
      <form onSubmit={handleSubmit(handleLogin)} className="">
        <div className="w-full md:w-[400px]">
          <h1 className="text-4xl font-extrabold text-center">Sign Up</h1>
          <div>
            <fieldset className="mt-3">
              <div className="mt-0.5 rounded-md shadow-sm">
                <input
                  id="email"
                  {...register("email")}
                  type="text"
                  className={classNames(
                    "appearance-none block w-full px-2 py-[10px] border-1 rounded-md placeholder:text-gray-400 focus:ring-0.5",
                    errors.email
                      ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                      : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                  )}
                  placeholder="drake@example.com"
                />
              </div>

              {errors.email?.message && (
                <div className="mt-1 text-xs text-danger-500">{errors.email?.message}</div>
              )}
            </fieldset>

            <fieldset className="mt-2">
              <div className="mt-0.5 rounded-md shadow-sm relative">
                <input
                  id="password"
                  {...register("password")}
                  type={isPasswordVisible ? "text" : "password"}
                  className={classNames(
                    "appearance-none block w-full pl-2 pr-7 py-[10px] border-1 rounded-md placeholder:text-gray-400 focus:ring-0.5",
                    errors.password
                      ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                      : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                  )}
                  placeholder="Password"
                />

                {passwordValue && (
                  <div
                    className="absolute top-0 right-2 h-full flex items-center text-gray-600 cursor-pointer"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? <EyeClosedIcon /> : <EyeIcon />}
                  </div>
                )}
              </div>

              {errors.password?.message && (
                <div className="mt-1 text-xs text-danger-500">{errors.password?.message}</div>
              )}
            </fieldset>
          </div>

          <div className="flex justify-center w-full mt-3">
            <Button
              classname="w-full"
              htmlType="submit"
              disabled={!emailValue || !passwordValue || !isAgree || isGoogleSubmitting}
              loading={isSubmitting}
              type="auth"
            >
              Sign Up
            </Button>
          </div>
          <p className="text-center mt-2.5">
            <span>Already have an account?</span>
            <Link
              to={"/login"}
              className={classNames("ml-2 font-bold text-primary-500", {
                "cursor-not-allowed opacity-50": isSubmitting || isGoogleSubmitting,
              })}
              aria-disabled={isSubmitting}
            >
              Sign In
            </Link>
          </p>
          <hr className="mt-4 mb-4 border-gray-300" />

          <GoogleAuth
            type="signup"
            isAgree={isAgree}
            title="Sign up with Google"
            isSubmitting={isGoogleSubmitting}
            setIsSubmitting={setIsGoogleSubmitting}
          />
        </div>
        <label className="mt-2.5 flex items-center justify-center gap-1">
          <CheckboxInput
            onChange={() => setIsAgree(!isAgree)}
            style={{
              label: errors.agree ? "text-base text-danger-500" : "text-base",
            }}
          />
          <p>
            I agree with&nbsp;
            <a target="_blank" rel="noreferrer noopener" href={`${WEBSITE_URL}/terms`}>
              Terms and Conditions
            </a>
            &nbsp;&&nbsp;
            <a target="_blank" rel="noreferrer noopener" href={`${WEBSITE_URL}/privacy-policy`}>
              Privacy Policy.
            </a>
          </p>
        </label>
      </form>
    </div>
  );
}

interface IRegisterForm {
  email: string;
  password: string;
  agree: boolean;
}
