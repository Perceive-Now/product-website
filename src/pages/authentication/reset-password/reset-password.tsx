import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

//
import classNames from "classnames";
import { toast } from "react-hot-toast";

//
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//
import Button from "../../../components/reusable/button";
import { EyeClosedIcon, EyeIcon, LoadingIcon } from "../../../components/icons";

//
import Logo from "../../../assets/images/logo-small.svg";

//
import axiosInstance from "../../../utils/axios";

//
const formSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .matches(/[a-z]/)
    .matches(/[A-Z]/)
    .matches(/[0-9]/)
    .matches(/[!@#$%^&*]/)
    .min(8),
});

//
export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const [uid, token] = [searchParams.get("uid"), searchParams.get("token")];

  //
  const navigate = useNavigate();

  //
  const [isLoading, setIsLoading] = useState(false);

  //
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  //
  const {
    watch,
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: { password: "" },
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const passwordValue = watch("password");

  //
  const handleResetConfirm = async (values: IPasswordResetFormValues) => {
    if (!uid || !token) return;

    //
    setIsLoading(true);

    try {
      await axiosInstance.post("/api/v1/user/reset_password_confirm/", {
        uid,
        token,
        new_password: values.password,
        re_new_password: values.password,
      });

      //
      toast.success("Password reset successful!");

      //
      navigate("/login");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorObj = error?.response?.data;
      const errorMessage = (Object.values(errorObj) ?? []).flat()[0] as string;

      //
      toast.error(errorMessage);

      //
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!uid || !token) {
      navigate("/login");
    }
  }, [navigate, token, uid]);

  if (!uid || !token) return <></>;

  //
  return (
    <div className="flex justify-center items-center min-h-screen px-2">
      <div className="flex flex-col w-full max-w-[480px]">
        <form onSubmit={handleSubmit(handleResetConfirm)}>
          <div className="w-full min-h-[500px] flex flex-col justify-between items-stretch">
            <div className="flex justify-center">
              <img
                src={Logo}
                width={76}
                height={60}
                alt="PerceiveNow logo"
                className="w-9 h-8 object-contain"
              />
            </div>

            <fieldset className="mt-2">
              <label
                htmlFor="password"
                className="block text-md font-semibold leading-5 text-gray-700"
              >
                Create a new password
              </label>

              <div className="mt-0.5 rounded-md shadow-sm relative">
                <input
                  id="password"
                  {...register("password")}
                  type={isPasswordVisible ? "text" : "password"}
                  className={classNames(
                    "appearance-none block w-full pl-2 pr-7 py-[10px] bg-gray-100 border-1 rounded-md placeholder:text-gray-400 focus:ring-0.5",
                    "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                  )}
                  placeholder="Enter your password"
                  disabled={isLoading}
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
            </fieldset>

            {/* Password strength meter */}
            <div className="text-sm text-gray-800">
              <div className="mb-1 font-semibold">Password must contain:</div>

              <MessageRule
                message={"Minimum 8 characters"}
                isFullfiled={passwordValue.length > 7}
              />
              <MessageRule
                message={"At-least one lower case character"}
                isFullfiled={Boolean(passwordValue.match(/[a-z]/))}
              />
              <MessageRule
                message={"At-least one upper case character"}
                isFullfiled={Boolean(passwordValue.match(/[A-Z]/))}
              />
              <MessageRule
                message={"At-lease one special character"}
                isFullfiled={Boolean(passwordValue.match(/[!@#$%^&*]/))}
              />
              <MessageRule
                message={"At-least one number"}
                isFullfiled={Boolean(passwordValue.match(/[0-9]/))}
              />
            </div>

            <div className="flex justify-center mt-3">
              <Button
                htmlType="submit"
                disabled={isLoading || !isValid}
                classname="min-w-[10rem] flex justify-center"
              >
                {isLoading ? <LoadingIcon height={24} width={24} /> : "Reset Password"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

//
interface IPasswordResetFormValues {
  password: string;
}

//
const MessageRule = ({ message, isFullfiled }: IMessageRule) => {
  return (
    <div className="flex items-center mb-1 gap-x-1">
      <div
        className={classNames(
          "w-[10px] h-[10px] rounded-full",
          isFullfiled ? "bg-green-600" : "bg-gray-300",
        )}
      />
      <span>{message}</span>
    </div>
  );
};

interface IMessageRule {
  message: string;
  isFullfiled: boolean;
}
