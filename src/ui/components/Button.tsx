import classNames from "classnames";
import React from "react";

type ButtonProps = {
  title: string;
  type?: "submit" | "button";
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
};

const baseStyles =
  "px-6 py-3 font-semibold rounded-xl transition duration-300 cursor-pointer";

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  type = "button",
  className,
  onClick,
}) => {
  const buttonClass = classNames(baseStyles, className, {
    "bg-primary text-white shadow hover:bg-primary-dark": variant === "primary",
    "border border-secondary text-white hover:bg-secondary-darker hover:text-white":
      variant === "secondary",
  });

  return (
    <button className={buttonClass} onClick={onClick} type={type}>
      {title}
    </button>
  );
};

export default Button;
