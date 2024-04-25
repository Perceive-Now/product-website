import classNames from "classnames";
import React, { InputHTMLAttributes } from "react";
// extends InputHTMLAttributes<HTMLInputElement>

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "style"> {
  className?: string;
  label?: string;
  style?: {
    label?: string;
  };
}

const CheckboxInput: React.FC<Props> = (Props) => {
  const { className, label, style, onChange, ...rest } = Props;
  return (
    <label className={classNames(className, "label-checkbox gap-1 items-center text-sm")}>
      <input type="checkbox" onChange={onChange} {...rest} />
      <span className="fake-checkbox"></span>
      {label && (
        <span className={classNames("font-semibold text-secondary-800", style?.label)}>
          {label}
        </span>
      )}
    </label>
  );
};

export default CheckboxInput;
