export interface ISearchInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> {
  value?: string;
  onChange?: (value: string) => void;
}
