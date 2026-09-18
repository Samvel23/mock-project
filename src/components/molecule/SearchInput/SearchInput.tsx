import React from "react";
import { Search } from "lucide-react";
import { Icon } from "@/components/atom/Icon";
import { Input } from "@/components/atom/Input";
import { cn } from "@/lib/utils/cn";
import type { ISearchInputProps } from "./SearchInput.types";

export const SearchInput: React.FC<ISearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search products",
  className,
  ...props
}) => {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
        <Icon icon={Search} size="sm" color="muted" />
      </div>

      <Input
        type="search"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className={cn("pl-10 pr-8", className)}
        {...props}
      />
    </div>
  );
};
