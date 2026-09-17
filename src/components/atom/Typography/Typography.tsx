import type { ITypographyProps } from "./Typography.types";
import { TYPOGRAPHY_VARIANTS } from "./Typography.const";
import { cn } from "@/lib/utils/cn";

export function Typography({
  variant = "body",
  className,
  children,
  ...props
}: ITypographyProps) {
  const Tag = (variant.startsWith("h") ? variant : "p") as React.ElementType;

  return (
    <Tag
      className={cn(
        TYPOGRAPHY_VARIANTS[variant as keyof typeof TYPOGRAPHY_VARIANTS] ??
          TYPOGRAPHY_VARIANTS.body,
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
