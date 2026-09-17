export type TTypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "caption"
  | "small"
  | "muted";

export interface ITypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TTypographyVariant;
}