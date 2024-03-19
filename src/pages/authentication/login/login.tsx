import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
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
import Logo from "../../../assets/images/logo-small.svg";
import { WEBSITE_URL } from "../../../utils/constants";

// Store
import { useAppDispatch } from "../../../hooks/redux";
import { getCurrentSession, loginUser } from "../../../stores/auth";

/**
 *
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const callbackPath = searchParams.get("callback_path");

  //
  const dispatch = useAppDispatch();

  //
  const [isLoading, setIsLoading] = useState(true);

  //
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const formInitialValue: ILoginFormValues = {
    username: "",
    password: "",
  };

  const formResolver = yup.object().shape({
    username: yup
      .string()
      // .username("Username is required")
      .required("Username is required"),
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
    const response = await dispatch(loginUser(values)).unwrap();
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

  const userNameValue = watch("username");
  const passwordValue = watch("password");

  const getSession = async () => {
    const session = await dispatch(getCurrentSession()).unwrap();
    if (session.success) navigate("/");

    setIsLoading(false);
  };

  useEffect(() => {
    getSession();
  }, []);

  // Do not show login page content on initial load
  if (isLoading) return <></>;

  return (
    <div className="flex justify-center items-center px-2 h-full">
      <form onSubmit={handleSubmit(handleLogin)} className="w-full md:w-[400px]">
        <div className="flex flex-col items-center">
          {/* <img
            src={Logo}
            width={76}
            height={60}
            alt="PerceiveNow logo"
            className="w-9 h-8 object-contain"
          /> */}
          <h1 className="text-4xl font-extrabold text-secondary-800 mt-5">Welcome back</h1>
          <p className="mt-1 font-normal">Let’s get back to innovating!</p>
        </div>

        <div>
          <fieldset className="mt-3">
            <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
              Username
            </label>

            <div className="mt-0.5 rounded-md shadow-sm">
              <input
                id="username"
                {...register("username")}
                type="text"
                className={classNames(
                  "appearance-none block w-full px-2 py-[10px] bg-gray-100 border-1 rounded-md placeholder:text-gray-400 focus:ring-0.5",
                  errors.username
                    ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                    : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                )}
                placeholder="Username"
              />
            </div>

            {errors.username?.message && (
              <div className="mt-1 text-xs text-danger-500">{errors.username?.message}</div>
            )}
          </fieldset>

          <fieldset className="mt-2">
            <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
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
                    : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
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
              <div className="mt-1 text-xs text-danger-500">{errors.password?.message}</div>
            )}
          </fieldset>

          <div className="mt-2 text-sm">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </div>

        <div className="flex justify-center mt-3 w-full">
          <Button
            classname="w-full"
            htmlType="submit"
            disabled={!userNameValue || !passwordValue}
            loading={isSubmitting}
            type="gray"
          >
            Login
          </Button>
        </div>

        <hr className="mt-6 mb-3 border-gray-300" />

        <p className="text-center">
          <span>Don't have an account?</span>
          <a href={`${WEBSITE_URL}/signup`} className="ml-2 font-bold text-primary-500">
            Create a free account
          </a>
        </p>
      </form>
    </div>
  );
}

interface ILoginFormValues {
  username: string;
  password: string;
}
