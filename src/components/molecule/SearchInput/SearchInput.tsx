import * as React from "react";
import { Search } from "lucide-react";
import { Icon } from "@/components/atom/Icon";
import { Input } from "@/components/atom/Input";

export interface ISearchInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> {
  value?: string;
  onChange?: (value: string) => void;
}

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
        onChange={(event) => onChange?.(event.target.value.trim())}
        placeholder={placeholder}
        className={className ?? "pl-10 pr-3"}
        {...props}
      />
    </div>
  );
};
