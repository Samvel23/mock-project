export type TButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "outline";

export type TButtonSize = "sm" | "md" | "lg";

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: TButtonVariant;
    size?: TButtonSize;
}
