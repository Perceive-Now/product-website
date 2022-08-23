import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//
import * as yup from "yup";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//
import Button from "../../../components/reusable/button";
import { EyeClosedIcon, EyeIcon } from "../../../components/icons";

//
import Logo from "../../../assets/images/logo-small.svg";
import { WEBSITE_URL } from "../../../utils/constants";

/**
 *
 */
export default function LoginPage() {
  const navigate = useNavigate();

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
  });

  const { errors } = formState;

  const handleLogin = (values: ILoginFormValues) => {
    console.log(values, "values");

    // TODO:: Make API call for login

    navigate("/");
  };

  const emailValue = watch("email");
  const passwordValue = watch("password");

  return (
    <div className="flex justify-center items-center min-h-screen px-2">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full md:w-[480px] py-10"
      >
        <div className="flex flex-col items-center">
          <img
            src={Logo}
            width={76}
            height={60}
            alt="PerceiveNow logo"
            className="w-9 h-8 object-contain"
          />
          <h1 className="text-4xl font-semibold mt-5">Welcome back</h1>
          <p className="mt-1 font-normal">Let’s get back to innovating!</p>
        </div>

        <div>
          <fieldset className="mt-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Email
            </label>

            <div className="mt-0.5 rounded-md shadow-sm">
              <input
                id="email"
                {...register("email")}
                type="text"
                className={classNames(
                  "appearance-none block w-full px-2 py-[10px] bg-gray-100 border-1 rounded-md placeholder:text-gray-400 focus:ring-0.5",
                  errors.email
                    ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                    : "border-gray-400 focus:border-primary-500 focus:ring-primary-500"
                )}
                placeholder="Enter your email address"
              />
            </div>

            {errors.email?.message && (
              <div className="mt-1 text-xs text-danger-500">
                {errors.email?.message}
              </div>
            )}
          </fieldset>

          <fieldset className="mt-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Password
            </label>

            <div className="mt-0.5 rounded-md shadow-sm relative">
              <input
                id="password"
                {...register("password")}
                type={isPasswordVisible ? "text" : "password"}
                className={classNames(
                  "appearance-none block w-full pl-2 pr-7 py-[10px] bg-gray-100 border-1 rounded-md placeholder:text-gray-400 focus:ring-0.5",
                  errors.password
                    ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                    : "border-gray-400 focus:border-primary-500 focus:ring-primary-500"
                )}
                placeholder="Enter your password"
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
              <div className="mt-1 text-xs text-danger-500">
                {errors.password?.message}
              </div>
            )}
          </fieldset>

          <div className="mt-2 text-sm">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </div>

        <div className="flex justify-center mt-3">
          <Button htmlType="submit" disabled={!emailValue || !passwordValue}>
            Login
          </Button>
        </div>

        <hr className="mt-6 mb-3 border-gray-300" />

        <p className="text-center">
          <span>Don't have an account?</span>
          <a href={`${WEBSITE_URL}/signup`} className="ml-2">
            Create a free account
          </a>
        </p>
      </form>
    </div>
  );
}

interface ILoginFormValues {
  email: string;
  password: string;
}
