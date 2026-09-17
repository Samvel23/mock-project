"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/atom/Button/Button";
import { Icon } from "@/components/atom/Icon";
import { Typography } from "@/components/atom/Typography/Typography";

// These props let the parent customize the text and decide what should happen
// when the user clicks the Add product button.
interface HeaderProps {
  title?: string;
  description?: string;
  onAddProduct?: () => void;
}

export function Header({
  title = "Products",
  description = "Manage your inventory and product performance.",
  onAddProduct,
}: HeaderProps) {
  // Header is presentational: it displays the values it receives and sends
  // the button click back to the parent through onAddProduct.
  return (
    <header className="flex flex-col gap-4 border-b border-slate-800 bg-slate-950 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Typography variant="h1" className="text-2xl font-bold text-white">
          {title}
        </Typography>
        <Typography variant="small" className="mt-1 text-slate-400">
          {description}
        </Typography>
      </div>

      <div className="flex items-center justify-end">
        {/* The products page passes a function here that opens the create modal. */}
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={onAddProduct}
          className="gap-2 rounded-xl bg-sky-600 text-white hover:bg-sky-500"
        >
          <Icon icon={Plus} size="sm" color="default" />
          Add product
        </Button>
      </div>
    </header>
  );
}
