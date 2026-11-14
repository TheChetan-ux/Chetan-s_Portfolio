import type { ButtonHTMLAttributes } from "react";

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> & {
  variant?: "default" | "ghost";
  size?: "default" | "sm" | "icon";
};

export function Button({
  variant = "default",
  size = "default",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`portfolio-button ${className}`.trim()}
      data-variant={variant}
      data-size={size}
    />
  );
}
