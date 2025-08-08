import classNames from "classnames";
import React from "react";

type ButtonProps = {
  title: string;
  type?: "submit" | "button";
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
};

const baseStyles =
  "px-6 py-3 font-semibold rounded-xl transition duration-300 cursor-pointer";

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  type = "button",
  disabled = false,
  className,
  onClick,
  href,
}) => {
  const buttonClass = classNames(baseStyles, className, {
    // PRIMARY
    "bg-primary text-white shadow hover:bg-primary-darker":
      variant === "primary" && !disabled,
    "bg-primary text-white opacity-50 cursor-not-allowed":
      variant === "primary" && disabled,

    // SECONDARY
    "border border-secondary text-primary hover:bg-secondary-darker hover:text-white":
      variant === "secondary" && !disabled,
    "border border-secondary text-primary opacity-50 cursor-not-allowed":
      variant === "secondary" && disabled,
  });

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        onClick={onClick}
        aria-disabled={disabled}
      >
        {title}
      </a>
    );
  }

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
