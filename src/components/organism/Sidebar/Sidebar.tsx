"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Icon } from "@/components/atom/Icon";
import { ThemeToggle } from "@/components/molecule/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Products", href: "/products", icon: Package },
] as const;

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* mobile little button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation"
          className={cn(
            "fixed top-20 left-0 z-40 flex h-10 w-5 items-center justify-center rounded-r-lg border-y border-r shadow-md transition-colors md:hidden",
            isDark
              ? "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800"
              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100",
          )}
        >
          <Icon icon={ChevronRight} size="sm" color="muted" />
        </button>
      )}

      {/* mobile overlay */}
      {isOpen && (
        <div
          className={cn(
            "fixed inset-0 z-40 backdrop-blur-sm md:hidden",
            isDark ? "bg-slate-950/80" : "bg-slate-950/40",
          )}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col justify-between border-r transition-all duration-300 ease-in-out md:static",
          isDark
            ? "border-slate-800 bg-slate-900 text-slate-100"
            : "border-slate-200 bg-white text-slate-900",
          isOpen
            ? "translate-x-0 w-64 p-4"
            : "-translate-x-full md:translate-x-0",
          isCollapsed ? "md:w-16 md:p-3" : "md:w-64 md:p-4",
        )}
      >
        <div className="flex flex-col">
          <div className="flex h-9 items-center justify-between">
            <span
              className={cn(
                "text-xs font-semibold uppercase tracking-wide transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap px-1",
                isDark ? "text-slate-400" : "text-slate-500",
                isCollapsed
                  ? "md:max-w-0 md:opacity-0 max-w-[150px] opacity-100"
                  : "max-w-[150px] opacity-100",
              )}
            >
              Navigation
            </span>

            {/* closing button desktop */}
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "hidden rounded-lg p-1.5 transition-colors md:flex items-center justify-center",
                isDark
                  ? "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
                isCollapsed && "mx-auto",
              )}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Icon
                icon={isCollapsed ? ChevronRight : ChevronLeft}
                size="md"
                color="muted"
              />
            </button>

            {/* mobile closing button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className={cn(
                "ml-auto rounded-lg p-1 md:hidden transition-colors",
                isDark
                  ? "text-slate-400 hover:bg-slate-800"
                  : "text-slate-500 hover:bg-slate-100",
              )}
              aria-label="Close menu"
            >
              <Icon icon={X} size="md" color="muted" />
            </button>
          </div>

          {/* navigation links */}
          <nav aria-label="Main navigation" className="mt-6 space-y-1.5">
            {NAV_ITEMS.map(({ label, href, icon: IconComponent }) => {
              const isActive =
                href === "/" ? pathname === href : pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href}
                  title={isCollapsed ? label : undefined}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center rounded-lg px-2.5 py-2.5 text-sm transition-colors",
                    isActive
                      ? isDark
                        ? "bg-slate-800 font-semibold text-white"
                        : "bg-slate-100 font-semibold text-slate-900"
                      : isDark
                        ? "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                  )}
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                    <Icon
                      icon={IconComponent}
                      size="md"
                      color={isActive ? "primary" : "muted"}
                      aria-hidden="true"
                    />
                  </div>

                  <span
                    className={cn(
                      "whitespace-nowrap transition-all duration-300 ease-in-out overflow-hidden ml-3 max-w-[160px] opacity-100",
                      isCollapsed && "md:max-w-0 md:opacity-0",
                    )}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* footer with toggle theme */}
        <div
          className={cn(
            "mt-auto border-t pt-3 transition-colors",
            isDark ? "border-slate-800" : "border-slate-200",
          )}
        >
          <div
            className={cn(
              "flex items-center",
              isCollapsed ? "md:justify-center" : "justify-start px-1",
            )}
          >
            <ThemeToggle />
          </div>
        </div>
      </aside>
    </>
  );
};
