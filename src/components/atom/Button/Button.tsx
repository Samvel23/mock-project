"use client";
import { cn } from "@/lib/utils/cn";
import { BUTTON_SIZES, BUTTON_VARIANTS } from "./Button.const";
import { IButtonProps } from "./Button.types";

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: IButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center cursor-pointer rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        BUTTON_VARIANTS[variant],
        BUTTON_SIZES[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
