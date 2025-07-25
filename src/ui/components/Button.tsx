import classNames from "classnames";
import React from "react";

type ButtonProps = {
  title: string;
  variant?: "primary" | "secondary" | "underline";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const baseStyles =
  "px-6 py-3 font-semibold rounded-xl transition duration-300 cursor-pointer";

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  onClick,
  className,
  disabled = false,
}) => {
  const buttonClass = classNames(baseStyles, className, {
    "bg-primary text-white shadow hover:bg-primary-dark": variant === "primary",
    "border border-secondary text-white hover:bg-secondary-darker hover:text-white":
      variant === "secondary",
    "underline text-primary hover:text-primary-light": variant === "underline",
    "opacity-50 cursor-not-allowed pointer-events-none": disabled,
  });

  return (
    <button className={buttonClass} onClick={disabled ? undefined : onClick}>
      {title}
    </button>
  );
};

export default Button;
