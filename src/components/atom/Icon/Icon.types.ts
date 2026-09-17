import type { LucideIcon } from "lucide-react";
import type { SVGProps } from "react";

export type TIconSize = "xs" | "sm" | "md" | "lg" | "xl";
export type TIconColor =
  | "default"
  | "muted"
  | "primary"
  | "success"
  | "warning"
  | "danger";

export interface IIconProps extends Omit<SVGProps<SVGSVGElement>, "color"> {
  icon: LucideIcon;
  size?: TIconSize;
  color?: TIconColor;
}
