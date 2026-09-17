export type TInputVariant = "default" | "error";

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: TInputVariant;
}
