import { toast } from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
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
// import Logo from "../../../assets/images/logo-small.svg";
// import { WEBSITE_URL } from "../../../utils/constants";

// Store
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getCurrentSession, loginUser } from "../../../stores/auth";
import GoogleAuth from "../../../components/@auth/google";
import { setSession } from "../../../stores/session";

interface ILoginFormValues {
  username: string;
  password: string;
}

/**
 *
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);
  const session = useAppSelector((state) => state.sessionDetail.session);

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
    username: yup.string().required("Username is required"),
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
      dispatch(
        setSession({
          session_data: {
            ...sessionDetail,
            last_session_id: session?.session_id,
          },
        }),
      );
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

  const getSession = useCallback(async () => {
    const session = await dispatch(getCurrentSession()).unwrap();
    if (session.success) navigate("/");

    setIsLoading(false);
  }, [dispatch, navigate]);

  useEffect(() => {
    getSession();
  }, [getSession]);

  // Do not show login page content on initial load
  if (isLoading) return <></>;

  return (
    <div className="flex justify-center items-center px-2 h-full">
      <form onSubmit={handleSubmit(handleLogin)} className="w-full md:w-[400px] h-full">
        <div className="flex flex-col items-center">
          {/* <img
            src={Logo}
            width={76}
            height={60}
            alt="PerceiveNow logo"
            className="w-9 h-8 object-contain"
          /> */}
          <h1 className="text-4xl font-extrabold text-secondary-800 mt-5">Sign In</h1>
        </div>

        <div>
          <fieldset className="mt-3">
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
                placeholder="Username/Email"
              />
            </div>

            {errors.username?.message && (
              <div className="mt-1 text-xs text-danger-500">{errors.username?.message}</div>
            )}
          </fieldset>

          <fieldset className="mt-2">
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

          <div className="text-sm text-primary-500 font-bold mt-0.5">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </div>

        <div className="flex justify-center w-full mt-3">
          <Button
            classname="w-full"
            htmlType="submit"
            disabled={!userNameValue || !passwordValue}
            loading={isSubmitting}
            type="auth"
          >
            Sign In
          </Button>
        </div>

        <p className="text-center mt-2.5">
          <span>Don’t have an account?</span>
          <Link to={"/signup"} className="ml-2 font-bold text-primary-500">
            Sign Up
          </Link>
        </p>
        <hr className="mt-4 mb-4 border-gray-300" />
        <GoogleAuth type="signin" isAgree={true} title="Sign in with Google" />
      </form>
    </div>
  );
}
