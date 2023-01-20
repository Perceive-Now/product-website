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
  const buttonType = props.type ?? "primary";
  const roundValue = props.rounded ?? "medium";
  const isFullWidth = props.fullWidth ?? false;

  return (
    <button
      disabled={props.disabled || props.loading}
      type={props.htmlType}
      className={classNames(
        "py-[12px] px-[24px]",
        {
          "rounded-md": roundValue === "small",
          "rounded-2xl": roundValue === "medium",
          "rounded-full": roundValue === "full",
        },
        {
          "primary-button": buttonType === "primary",
          "secondary-button": buttonType === "secondary",
          "optional-button": buttonType === "optional",
          "full-width": isFullWidth,
        },
        props.classname,
      )}
      onClick={() => props.handleClick?.()}
    >
      <div className="flex">
        {props.loading && <LoadingIcon width={24} height={24} className="mr-1" />}

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
  classname?: string;
  // Custom
  rounded?: "small" | "medium" | "full";
  type?: "primary" | "secondary" | "optional";
  icon?: ReactElement;
  loading?: boolean;
  fullWidth?: boolean;
  handleClick?: () => void;
}
