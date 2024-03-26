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
        defaultCountry="united-arab-emirates"
        placeholder={placeholder}
        // onChange={onChange}
        // value={value}
        className={classNames(
          "w-full rounded-lg placeholder:text-sm",
          error ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500" : "input-field",
        )}
        // disabled={disabled}
      />
      {error && <div className="mt-1 text-xs text-danger-500">{error.message}</div>}
    </>
  );
}
