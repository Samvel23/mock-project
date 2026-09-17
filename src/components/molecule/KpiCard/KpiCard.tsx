import React from "react";
import { KpiCardProps } from "./KpiCard.types";
import { Icon } from "@/components/atom/Icon";
import { Typography } from "@/components/atom/Typography/Typography";
import { cn } from "@/lib/utils/cn";
const ICON_VARIANTS = {
  default: "bg-sky-500/15 ring-sky-400/20",
  success: "bg-emerald-500/15 ring-emerald-400/20",
  warning: "bg-amber-500/15 ring-amber-400/20",
  danger: "bg-red-500/15 ring-red-400/20",
} as const;

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtext,
  icon: IconGlyph,
  variant = "default",
  className,
}) => {
  return (
    <div
      className={cn(
        "group rounded-2xl border border-slate-700 bg-slate-900 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-600 hover:bg-slate-800",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <Typography variant="small" className="font-medium text-slate-400">
          {title}
        </Typography>
        <div
          className={cn(
            "rounded-xl p-2.5 ring-1 transition-transform duration-200 group-hover:scale-105",
            ICON_VARIANTS[variant],
          )}
        >
          {IconGlyph && <Icon icon={IconGlyph} size="md" color={variant} />}
        </div>
      </div>
      <Typography variant="h2" className="mt-5 text-2xl font-bold text-white">
        {value}
      </Typography>
      {subtext && (
        <Typography variant="small" className="mt-2 text-slate-400">
          {subtext}
        </Typography>
      )}
    </div>
  );
};
