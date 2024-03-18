import classNames from "classnames";
import { PropsWithChildren, ReactElement } from "react";

//
import { LoadingIcon } from "../../icons";

//
import "./button.css";

/**
 *
 */
export default function Button(props: PropsWithChildren<IButtonProps>) {
  const buttonSize = props.size ?? "medium";
  const buttonType = props.type ?? "primary";
  const roundValue = props.rounded ?? "medium";
  const isFullWidth = props.fullWidth ?? false;

  //
  const handleSubmit = () => {
    if (props.disabled || props.loading) return;
    if (!props.handleClick) return;

    props.handleClick();
  };

  //
  return (
    <button
      disabled={props.disabled || props.loading}
      type={props.htmlType}
      className={classNames(
        {
          "py-1 px-3": buttonSize === "small",
          "py-[12px] px-[24px]": buttonSize === "medium",
        },
        {
          "rounded-md": roundValue === "small",
          "rounded-lg": roundValue === "medium",
          "rounded-2xl": roundValue === "large",
          "rounded-full": roundValue === "full",
        },
        {
          "primary-button": buttonType === "primary",
          "secondary-button": buttonType === "secondary",
          "optional-button": buttonType === "optional",
          "gray-button": buttonType === "gray",
          white: buttonType === "default",
          "full-width": isFullWidth,
        },
        "font-semibold",
        props.classname,
      )}
      onClick={handleSubmit}
    >
      <div className="flex justify-center items-center gap-1">
        {props.loading && <LoadingIcon width={24} height={24} className="mr-1" />}
        {props.startIcon && <div className="">{props.startIcon}</div>}

        <div>{props.children}</div>

        {props.icon && <div className="ml-3">{props.icon}</div>}
      </div>
    </button>
  );
}

interface IButtonProps {
  // Built in
  disabled?: boolean;
  htmlType?: "button" | "submit" | "reset";
  size?: "small" | "medium";
  classname?: string;
  // Custom
  rounded?: "small" | "medium" | "large" | "full";
  type?: "primary" | "secondary" | "optional" | "default" | "gray";
  icon?: ReactElement;
  loading?: boolean;
  fullWidth?: boolean;
  handleClick?: () => void;
  startIcon?: ReactElement;
}
