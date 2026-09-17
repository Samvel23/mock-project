import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { INPUT_VARIANTS } from "./Input.const";
import type { IInputProps } from "./Input.types";

export const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "h-11 w-full rounded-xl px-3 text-sm transition-colors",
          INPUT_VARIANTS[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
