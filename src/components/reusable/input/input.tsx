/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames";

interface IInput {
  label?: string;
  id?: string;
  name?: string;
  type?: "text" | "email" | "textarea" | "number";
  placeholder?: string;
  register?: any;
  error?: any;
}

export default function Input({
  label,
  id,
  name,
  type = "text",
  placeholder,
  register,
  error,
}: IInput) {
  return (
    <div>
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
      {error && <div className="mt-1 text-xs text-danger-500">{error.message}</div>}
    </div>
  );
}
