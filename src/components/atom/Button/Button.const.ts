export const BUTTON_VARIANTS = {
  primary:
    "bg-sky-600 text-white shadow-sm shadow-sky-950/20 hover:bg-sky-500 active:bg-sky-700",
  secondary:
    "border border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700 active:bg-slate-600",
  outline:
    "border border-slate-600 bg-transparent text-slate-200 hover:bg-slate-800 active:bg-slate-700",
  danger:
    "bg-red-600 text-white shadow-sm shadow-red-950/20 hover:bg-red-500 active:bg-red-700",
  ghost:
    "text-slate-300 hover:bg-slate-800 hover:text-slate-100 active:bg-slate-700",
} as const;

export const BUTTON_SIZES = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
} as const;
