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
import { loginUser, signUpUser } from "../../../stores/auth";
import GoogleIcon from "../../../components/icons/social/google";
import CheckboxInput from "../../../components/reusable/check-box/checkbox";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const formInitialValue: ILoginFormValues = {
    email: "",
    password: "",
  };

  const formResolver = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email address is required"),
    password: yup.string().required("Password is required"),
  });

  const { watch, register, formState, handleSubmit } = useForm({
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });

  const { errors } = formState;

  const handleLogin = async (values: ILoginFormValues) => {
    setIsSubmitting(true);

    // Login user
    const response = await dispatch(signUpUser(values)).unwrap();
    if (response.success) {
      if (callbackPath) {
        navigate(callbackPath);
      } else {
        navigate("/");
      }
    } else {
      toast.error(response.message);
    }

    setIsSubmitting(false);
  };

  const emailValue = watch("email");
  const passwordValue = watch("password");

  return (
    <div className="flex justify-center items-center px-2 h-full">
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
              disabled={!emailValue || !passwordValue}
              loading={isSubmitting}
              type="gray"
            >
              Sign Up
            </Button>
          </div>
          <p className="text-center mt-2.5">
            <span>Already have an account?</span>
            <Link to={"/login"} className="ml-2 font-bold text-primary-500">
              Sign In
            </Link>
          </p>
          <hr className="mt-4 mb-4 border-gray-300" />
          <Button classname="w-full" htmlType="button" type="gray" startIcon={<GoogleIcon />}>
            Sign up with Google
          </Button>
        </div>
        <div className="mt-2.5 flex items-center justify-center gap-2.5">
          <CheckboxInput
            label="I agree with Terms and Conditions & Privacy Policy"
            style={{
              label: "text-base",
            }}
          />
        </div>
      </form>
    </div>
  );
}

interface ILoginFormValues {
  email: string;
  password: string;
}
