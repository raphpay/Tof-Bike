import classNames from "classnames";
import React from "react";

type ButtonProps = {
  title: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
};

const baseStyles =
  "px-6 py-3 font-semibold rounded-xl transition duration-300 cursor-pointer";

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  onClick,
  className,
}) => {
  const buttonClass = classNames(baseStyles, className, {
    "bg-primary text-white shadow hover:bg-primary-dark": variant === "primary",
    "border border-secondary text-white hover:bg-secondary-darker hover:text-white":
      variant === "secondary",
  });

  return (
    <button className={buttonClass} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
