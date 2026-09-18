const BUTTON_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  DANGER: "danger",
  GHOST: "ghost",
  OUTLINE: "outline",
} as const;

const BUTTON_SIZES = {
  SM: "sm",
  MD: "md",
  LG: "lg",
} as const;

export type TButtonVariant =
  (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS];
export type TButtonSize = (typeof BUTTON_SIZES)[keyof typeof BUTTON_SIZES];

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TButtonVariant;
  size?: TButtonSize;
}
