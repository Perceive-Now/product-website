import React from "react";
import { LoadingIcon } from "src/components/icons";

interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
  loading?: boolean;
  type?: "button" | "submit" | "reset"; // Define button types
  variant?: "primary" | "secondary"; // Define button variants
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  type,
  text,
  onClick,
  icon,
  className,
  loading = false,
  variant = "primary",
}) => {
  // Define base styles
  const baseStyles = "flex items-center justify-evenly border-4 rounded-[32px] py-1 px-4 text-lg";

  // Define styles for variants
  const variantStyles = {
    primary: "bg-secondary-500 border-[#442873] text-white", // Filled button
    secondary: "border-[#442873] text-black", // Outlined button
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {!loading ? text: <LoadingIcon className="animate-spin text-black" />}
      {icon && <span className="ml-1">{icon}</span>}
    </button>
  );
};

export default PrimaryButton;
