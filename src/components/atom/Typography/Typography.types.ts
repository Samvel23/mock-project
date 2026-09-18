const TYPOGRAPHY_VARIANT = {
  H1: "h1",
  H2: "h2",
  H3: "h3",
  BODY: "body",
  CAPTION: "caption",
  SMALL: "small",
  MUTED: "muted",
};

export type TTypographyVariant =
  (typeof TYPOGRAPHY_VARIANT)[keyof typeof TYPOGRAPHY_VARIANT];

export interface ITypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TTypographyVariant;
}
