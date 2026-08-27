"use client";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "pill";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-neutral-950 text-white hover:bg-neutral-800 shadow-sm",
  secondary: "bg-white text-neutral-800 border border-border-default hover:border-border-strong hover:text-black",
  ghost: "bg-transparent text-neutral-700 hover:bg-surface-secondary hover:text-neutral-900",
  pill: "bg-neutral-950 text-white hover:bg-neutral-800 shadow-sm",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "py-2 px-4 text-xs",
  md: "py-3 px-6 text-xs tracking-widest uppercase",
  lg: "py-3.5 px-10 text-xs tracking-widest uppercase",
};

const radiusClasses: Record<ButtonVariant, string> = {
  primary: "rounded-lg",
  secondary: "rounded-lg",
  ghost: "rounded-lg",
  pill: "rounded-full",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`font-sans font-semibold transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${radiusClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Backward compatibility aliases
export { Button };
export function ButtonSecond(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="secondary" {...props} />;
}