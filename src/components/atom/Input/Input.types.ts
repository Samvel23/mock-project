const INPUT_VARIANT = {
  DEFAULT: "default",
  ERROR: "error"
} as const;

export type TInputVariant = typeof INPUT_VARIANT[keyof typeof INPUT_VARIANT];

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: TInputVariant;
}
