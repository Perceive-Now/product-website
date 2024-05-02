/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames";
import { EyeClosedIcon, EyeIcon } from "../../icons";

interface IInput {
  label?: string;
  id?: string;
  name?: string;
  type?: "text" | "email" | "textarea" | "number" | "password";
  placeholder?: string;
  register?: any;
  error?: any;
  showPassword?: any;
  visible?: boolean;
  watch?: any;
}

export default function Input({
  label,
  id,
  name,
  type = "text",
  placeholder,
  register,
  error,
  showPassword,
  visible,
  watch,
}: IInput) {
  return (
    <div className="">
      <div className="relative">
        {label && <div className="text-appGray-900 mb-0.5 font-semibold">{label}</div>}
        {type === "textarea" ? (
          <textarea
            id={id || name}
            name={name}
            {...register}
            className={classNames(
              "w-full rounded-lg placeholder:text-sm",
              error
                ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                : "input-field",
            )}
            placeholder={placeholder}
          />
        ) : (
          <input
            id={id || name}
            name={name}
            type={type}
            {...register}
            className={classNames(
              "rounded-lg w-full placeholder:text-sm",
              error
                ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                : "input-field",
            )}
            placeholder={placeholder}
          />
        )}
        {watch && (
          <div
            className="absolute top-0 right-2 h-full flex items-center text-gray-600 cursor-pointer"
            onClick={showPassword}
          >
            {visible ? <EyeClosedIcon /> : <EyeIcon />}
          </div>
        )}
      </div>

      {error && <div className="mt-1 text-xs text-danger-500">{error.message}</div>}
    </div>
  );
}
