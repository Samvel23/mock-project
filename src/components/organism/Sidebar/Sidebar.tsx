"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Icon } from "@/components/atom/Icon";
import { Typography } from "@/components/atom/Typography";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Products", href: "/products", icon: Package },
] as const;

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-slate-700 bg-slate-900 p-4">
      <Typography
        variant="small"
        className="mb-6 px-3 font-semibold uppercase tracking-wide text-slate-400"
      >
        Navigation
      </Typography>
      <nav aria-label="Main navigation" className="space-y-1">
        {NAV_ITEMS.map(({ label, href, icon: IconComponent }) => {
          const isActive =
            href === "/" ? pathname === href : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100",
              )}
            >
              <Icon
                icon={IconComponent}
                size="md"
                color={isActive ? "primary" : "muted"}
                aria-hidden="true"
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
