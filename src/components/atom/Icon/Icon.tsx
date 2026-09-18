import { cn } from "@/lib/utils/cn";
import type { IIconProps } from "./Icon.types";
import { ICON_SIZES, ICON_COLORS } from "./Icon.const";

export const Icon = ({
  icon: IconComponent,
  size = "md",
  color = "default",
  className,
  ...props
}: IIconProps) => {
  return (
    <IconComponent
      className={cn(ICON_SIZES[size], ICON_COLORS[color], className)}
      strokeWidth={props.strokeWidth ?? 2}
      {...props}
    />
  );
};
