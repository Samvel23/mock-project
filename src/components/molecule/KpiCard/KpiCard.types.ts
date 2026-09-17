import { LucideIcon } from "lucide-react";

export type KpiCardVariant = "default" | "success" | "warning" | "danger";

export interface KpiCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon?: LucideIcon;
  variant?: KpiCardVariant;
  className?: string;
}
