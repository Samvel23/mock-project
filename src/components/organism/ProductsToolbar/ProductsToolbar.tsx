"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/atom/Button/Button";
import { Icon } from "@/components/atom/Icon";
import { SearchInput } from "@/components/molecule/SearchInput/SearchInput";
import { cn } from "@/lib/utils/cn";

interface ProductsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  page: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
  onAddNew?: () => void;
}

const categories = [
  "All",
  "Electronics",
  "Accessories",
  "Lifestyle",
  "Wearables",
  "Office",
  "Home",
] as const;

export const ProductsToolbar: React.FC<ProductsToolbarProps> = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  page,
  totalPages,
  totalItems,
  onPageChange,
  onAddNew,
}) => {
  return (
    <div className="rounded-[24px] border border-slate-700 bg-slate-900 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.35)]">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
          <div className="w-full md:max-w-md">
            <SearchInput
              value={search}
              onChange={onSearchChange}
              placeholder="Search products"
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-2.5 py-2 text-slate-300">
              <Icon icon={SlidersHorizontal} size="sm" color="muted" />
              <select
                value={category}
                onChange={(event) => onCategoryChange(event.target.value)}
                className="bg-transparent text-sm text-slate-200 outline-none"
                aria-label="Filter by category"
              >
                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                    className="bg-slate-900 text-slate-200"
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-slate-400">
            {totalItems} items
          </div>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onAddNew}
            className="gap-2 rounded-xl bg-sky-600 text-white hover:bg-sky-500"
          >
            <Icon icon={Plus} size="sm" color="default" />
            Add product
          </Button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-700 pt-4">
        <div className="text-sm text-slate-400">
          Page {page} of {totalPages}
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            aria-label="Previous page"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className={cn(
              "h-9 w-9 rounded-lg border p-0",
              page <= 1
                ? "cursor-not-allowed border-slate-700 bg-slate-800 text-slate-500"
                : "border-slate-600 bg-slate-800 text-slate-200 hover:bg-slate-700",
            )}
          >
            <Icon icon={ChevronLeft} size="sm" color="default" />
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            aria-label="Next page"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className={cn(
              "h-9 w-9 rounded-lg border p-0",
              page >= totalPages
                ? "cursor-not-allowed border-slate-700 bg-slate-800 text-slate-500"
                : "border-slate-600 bg-slate-800 text-slate-200 hover:bg-slate-700",
            )}
          >
            <Icon icon={ChevronRight} size="sm" color="default" />
          </Button>
        </div>
      </div>
    </div>
  );
};
