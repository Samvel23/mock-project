import type { LucideIcon } from "lucide-react";
import type { ICON_SIZES, ICON_COLORS } from "./Icon.const";

export type TIconSize = keyof typeof ICON_SIZES;
export type TIconColor = keyof typeof ICON_COLORS;

export interface IIconProps extends Omit<
  React.SVGProps<SVGSVGElement>,
  "color"
> {
  icon: LucideIcon;
  size?: TIconSize;
  color?: TIconColor;
}
