"use client";

import React from "react";
import { Typography } from "@/components/atom/Typography/Typography";
import { cn } from "@/lib/utils/cn";

export interface HeaderProps {
  title?: string;
  description?: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <header
      className={cn(
        "rounded-2xl border border-slate-700 bg-slate-900 p-5 sm:p-6",
        className,
      )}
    >
      <Typography
        variant="h1"
        className="text-2xl font-bold text-white sm:text-3xl"
      >
        {title}
      </Typography>
      {description && (
        <Typography variant="small" className="mt-2 text-slate-400">
          {description}
        </Typography>
      )}
    </header>
  );
};
