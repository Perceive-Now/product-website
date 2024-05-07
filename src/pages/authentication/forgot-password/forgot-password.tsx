import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//
import classNames from "classnames";
import { toast } from "react-hot-toast";

//
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//
// import { BackIcon } from "../../../components/icons";
import Button from "../../../components/reusable/button";

//
// import Logo from "../../../assets/images/logo-small.svg";

//
import { useAppDispatch } from "../../../hooks/redux";
import { getCurrentSession } from "../../../stores/auth";

//
import axiosInstance from "../../../utils/axios";
import InsertLinkIcon from "../../../components/icons/social/insert-link";

//
const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email address is required"),
});

/**
 *
 */
export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  //
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(formSchema),
  });

  //
  const emailValue = watch("email");

  //
  const handleForgotPassword = async (values: IForgotPasswordFormValues) => {
    try {
      await axiosInstance.post("/api/v1/user/reset_password/", {
        email: values.email,
      });

      setIsSubmitted(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error("Unable to proceed with your reqeust!");
    }
  };

  //
  const getSession = useCallback(async () => {
    const session = await dispatch(getCurrentSession()).unwrap();
    if (session.success) navigate("/");

    setIsLoading(false);
  }, [dispatch, navigate]);

  //
  useEffect(() => {
    getSession();
  }, [getSession]);

  // Do not show login page content on initial load
  if (isLoading) return <></>;

  return (
    <div className="flex justify-center items-center h-[calc(100vh-120px)] px-2">
      <form onSubmit={handleSubmit(handleForgotPassword)} className="w-full md:w-[400px] py-10">
        <div className="flex flex-col items-center">
          <InsertLinkIcon />

          <div className="mt-5 text-sm text-center max-w-[320px] text-secondary-800">
            {!isSubmitted && (
              <p>Enter your email and we will send you a link to reset your password!</p>
            )}

            {isSubmitted && (
              <p className="pb-15">
                Please check your email and follow the instrustions to reset your password!
              </p>
            )}
          </div>
        </div>

        {!isSubmitted && (
          <>
            <div>
              <fieldset className="mt-3">
                {/* <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Email
                </label> */}

                <div className="mt-0.5 rounded-md shadow-sm">
                  <input
                    id="email"
                    {...register("email")}
                    type="text"
                    className={classNames(
                      "appearance-none block w-full px-2 py-[10px] bg-gray-100 border-1 rounded-md placeholder:text-gray-400 focus:ring-0.5",
                      errors.email
                        ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                        : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                    )}
                    placeholder="Enter your email address"
                  />
                </div>

                {errors.email?.message && (
                  <div className="mt-1 text-xs text-danger-500">{errors.email?.message}</div>
                )}
              </fieldset>
            </div>

            <div className="flex justify-center mt-3 w-full">
              <Button htmlType="submit" disabled={!emailValue} classname="w-full">
                Send Now
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

interface IForgotPasswordFormValues {
  email: string;
}
