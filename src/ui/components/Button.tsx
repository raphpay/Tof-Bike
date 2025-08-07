import classNames from "classnames";
import React from "react";

type ButtonProps = {
  title: string;
  type?: "submit" | "button";
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

const baseStyles = "px-6 py-3 font-semibold rounded-xl transition duration-300";

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  type = "button",
  disabled = false,
  className,
  onClick,
}) => {
  const buttonClass = classNames(baseStyles, className, {
    // PRIMARY variant
    "bg-primary text-white shadow hover:bg-primary-dark":
      variant === "primary" && !disabled,
    "bg-primary text-white opacity-50 cursor-not-allowed":
      variant === "primary" && disabled,

    // SECONDARY variant
    "border border-secondary text-white hover:bg-secondary-darker hover:text-white":
      variant === "secondary" && !disabled,
    "border border-secondary text-white opacity-50 cursor-not-allowed":
      variant === "secondary" && disabled,
  });

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
