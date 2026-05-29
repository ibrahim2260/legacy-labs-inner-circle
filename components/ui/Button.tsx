"use client";

import { forwardRef } from "react";
import { clsx } from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "cyan";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-blue-primary text-white border border-blue-primary hover:bg-blue-glow hover:shadow-glow-blue active:scale-[0.98]",
  secondary:
    "bg-transparent text-text-primary border border-blue-dim hover:border-blue-primary hover:text-white hover:shadow-glow-blue-sm active:scale-[0.98]",
  ghost:
    "bg-transparent text-text-secondary border border-transparent hover:text-text-primary hover:border-text-ghost active:scale-[0.98]",
  cyan: "bg-cyan-primary text-bg-primary font-semibold border border-cyan-primary hover:bg-cyan-dim hover:border-cyan-dim hover:shadow-glow-cyan active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-lg font-body font-medium",
          "transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
