import { useState } from "react";
import classNames from "classnames";
import { useNavigate, useParams } from "react-router-dom";

//
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//
import Button from "../../../components/reusable/button";
import { EyeClosedIcon, EyeIcon, LoadingIcon } from "../../../components/icons";

//
import { passwordResetConfirm } from "../../../utils/api/auth";

//
import Logo from "../../../assets/images/logo-small.svg";

function PasswordResetConfirmPage() {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  //
  const [isLoading, setIsLoading] = useState(false);

  //
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const formResolver = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .matches(/[a-z]/)
      .matches(/[A-Z]/)
      .matches(/[0-9]/)
      .matches(/[!@#$%^&*]/),
  });

  const formInitialValue: IPasswordResetFormValues = {
    password: "",
  };

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
    mode: "onChange",
  });

  const passwordValue = watch("password");

  //
  const handleResetConfirm = async (values: IPasswordResetFormValues) => {
    if (!(uid && token && values.password)) return;
    setIsLoading(true);

    const response = await passwordResetConfirm({
      uid: uid,
      token: token,
      new_password: values.password,
      re_new_password: values.password,
    });
    setIsLoading(false);

    if (response.success) {
      navigate("/login");
    } else {
      alert(response.message);
    }
  };

  const hasError = Object.keys(errors ?? {}).length > 0;

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

            <div className="text-sm text-gray-800">
              <div className="mb-1">Password must contain:</div>

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
              <Button htmlType="submit" disabled={!passwordValue || isLoading || hasError}>
                {isLoading ? <LoadingIcon height={16} width={16} /> : "Reset Password"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordResetConfirmPage;

interface IPasswordResetFormValues {
  password: string;
}

const MessageRule = ({ message, isFullfiled }: IMessageRule) => {
  return (
    <div className="flex items-center mb-1">
      <div
        className={`w-[10px] h-[10px] rounded-full ${
          isFullfiled ? "bg-green-600" : "bg-gray-300"
        }  mr-1`}
      />{" "}
      {message}
    </div>
  );
};

interface IMessageRule {
  message: string;
  isFullfiled: boolean;
}
