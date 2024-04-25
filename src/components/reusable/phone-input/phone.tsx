/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface Props {
  placeholder?: string;
  register?: any;
  error?: any;
}

export default function PhoneNumberInput({ placeholder, register, error }: Props) {
  return (
    <>
      <PhoneInput
        {...register}
        countrySelectorStyleProps={{
          buttonStyle: { height: "40px" },
        }}
        // defaultCountry="united-arab-emirates"
        placeholder={placeholder}
        // onChange={onChange}
        // value={value}
        className={classNames(
          "w-full rounded-lg placeholder:text-sm border",
          error
            ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
            : "rounded-lg  bg-gray-100 border border-gray-600 focus:ring-0 focus:border-primary-500 w-full ",
        )}
        // disabled={disabled}
      />
      {error && <div className="mt-1 text-xs text-danger-500">{error.message}</div>}
    </>
  );
}
