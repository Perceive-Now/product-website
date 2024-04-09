import React from "react";
import classNames from "classnames";

export type ButtonColors = "primary" | "secondary" | "gray" | "default";

interface VButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: ButtonColors;
  rounded?: boolean;
  icon?: React.ReactNode;
}

export const ButtonColorStyle: Record<ButtonColors, string> = {
  primary: "bg-primary-900",
  secondary: "",
  gray: "bg-appGray-200",
  default: "",
};

export function IconButton({
  color,
  rounded = true,
  children,
  className,
  icon,
  ...rest
}: VButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      className={classNames(
        className,
        "capitalize flex items-center justify-center gap-2 text-white",
        rounded && "rounded-full",
        ButtonColorStyle[color],
      )}
    >
      {icon}
      {children}
    </button>
  );
}
