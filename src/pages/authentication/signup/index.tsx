import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";

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
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { newSignupUser, signUpUser } from "../../../stores/auth";
import CheckboxInput from "../../../components/reusable/check-box/checkbox";
import GoogleAuth from "../../../components/@auth/google";
import { AppConfig } from "src/config/app.config";

// images
import perceiveNowImage from "../../../assets/images/pn.svg";
import quotes from "./_constants/quote";
import backgroundImage from "./_assets/background.png";
import pnCloveSvg from "src/assets/images/pn_clove.svg";
import { setSession } from "src/stores/session";

const WEBSITE_URL = AppConfig.WEBSITE_URL;

/**
 *
 */

export default function SignupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const userInvited = location?.state?.invited;
  const callbackPath = searchParams.get("callback_path");

  // const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);
  // const session = useAppSelector((state) => state.sessionDetail.session);

  const invitedData = {
    invited: searchParams.get("invited"),
    email: searchParams.get("email"),
    organization_name: searchParams.get("organization_name"),
    role: searchParams.get("role"),
    organization_industry: searchParams.get("organization_industry"),
  };

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
      email: values.email,
      password: values.password,
    };
    // Signup user
    const response = await dispatch(newSignupUser(params)).unwrap();
    if (response.success) {
      if (callbackPath) {
        navigate(callbackPath);
      } else {
        toast.success("User is registered", {
          position: "top-right",
        });
        if (userInvited?.invited && userInvited?.token) {
          toast.success("User is registered, please accept invitation from your email", {
            position: "top-right",
          });
          return;
        }
        navigate("/signup/confirm");
      }
    } else {
      toast.error(response.message, {
        position: "top-right",
      });
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

  useEffect(() => {
    if (
      invitedData.invited &&
      invitedData.email &&
      invitedData.organization_name &&
      invitedData.role
    ) {
      console.log("invitedData", invitedData);
      navigate("/signup/success", { state: { invitedData } });
    }
  }, [invitedData, navigate]);

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <div className="flex h-screen lg:min-h-screen justify-center items-center px-2 bg-gradient-to-b from-white to-[#F7F5FF]">
      <form onSubmit={handleSubmit(handleLogin)} className="">
        <div className="w-full p-1 md:p-0 md:w-[400px]">
          <img
            src={perceiveNowImage}
            alt="Welcome to Perceive Now"
            className="w-[3rem] h-[3rem] mb-1"
          />
          <h1 className="text-2xl font-semibold text-[#373D3F] text-left">
            Enter your email to sign up.
          </h1>
          <p className="text-left text-[#373D3F] mt-2 mb-1">
            <span>Already have an account?</span>
            <Link
              to={"/login"}
              className={classNames("ml-1 font-bold text-primary-500", {
                "cursor-not-allowed opacity-50": isSubmitting || isGoogleSubmitting,
              })}
              aria-disabled={isSubmitting}
            >
              Sign In
            </Link>
          </p>
          <div>
            <fieldset>
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
                  placeholder="Email*"
                />
              </div>

              {errors.email?.message && (
                <div className="mt-1 text-xs text-danger-500">{errors.email?.message}</div>
              )}
            </fieldset>

            {/* <fieldset className="mt-2">
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
          </fieldset> */}
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
          <div className="my-2">
            <label className="text-[15px] text-[#373D3F] font-medium">
              By continuing, I agree to Perceive Now&apos;s{" "}
              <a
                target="_blank"
                className="text-inherit underline"
                rel="noreferrer noopener"
                href={`${WEBSITE_URL}/privacy-policy`}
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                target="_blank"
                className="text-inherit underline"
                rel="noreferrer noopener"
                href={`${WEBSITE_URL}/terms`}
              >
                Terms of Use
              </a>
            </label>
          </div>
          <div className="flex justify-end w-full mt-2">
            <Button
              classname="w-[160px]"
              rounded="full"
              htmlType="submit"
              // disabled={!emailValue}
              loading={isSubmitting}
              type="primary"
            >
              <span className="font-[400]">Continue</span>
            </Button>
          </div>
          {/* <hr className="mt-4 mb-4 border-gray-300" /> */}

          {/* <GoogleAuth
          type="signup"
          isAgree={isAgree}
          title="Sign up with Google"
          isSubmitting={isGoogleSubmitting}
          setIsSubmitting={setIsGoogleSubmitting}
        /> */}
        </div>
        {/* <label className="mt-2.5 flex items-center justify-center gap-1">
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
      </label> */}
      </form>
    </div>
  );
}

interface IRegisterForm {
  email: string;
  password: string;
  agree: boolean;
}
