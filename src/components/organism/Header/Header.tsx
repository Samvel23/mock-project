import React from "react";
import { Typography } from "@/components/atom/Typography";
import { cn } from "@/lib/utils/cn";
import { IHeaderProps } from "./Header.types";

export const Header: React.FC<IHeaderProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <header className={cn("py-1", className)}>
      <Typography
        variant="h1"
        className="text-xl font-bold text-white sm:text-2xl"
      >
        {title}
      </Typography>
      {description && (
        <Typography variant="small" className="mt-1 text-slate-400">
          {description}
        </Typography>
      )}
    </header>
  );
};
