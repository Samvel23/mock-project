"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Icon } from "@/components/atom/Icon";
import { Typography } from "@/components/atom/Typography";
import { ThemeToggle } from "@/components/molecule/ThemeToggle";
import { Button } from "@/components/atom/Button/Button";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Products", href: "/products", icon: Package },
] as const;

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Автоматически закрывать мобильное меню при переходе по ссылкам
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Кнопка-гамбургер для мобильных */}
      {!isOpen && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation"
          className="fixed top-4 left-4 z-40 h-10 w-10 border border-slate-700 bg-slate-900 p-0 text-slate-300 shadow-md hover:bg-slate-800 md:hidden"
        >
          <Icon icon={Menu} size="md" color="muted" />
        </Button>
      )}

      {/* Затенение фона при открытом меню на мобильных */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Сайдбар / Выдвижное мобильное меню */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col justify-between border-r border-slate-700 bg-slate-900 p-4 transition-transform duration-300 ease-in-out md:static md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between pb-2 md:pb-0">
            <Typography
              variant="small"
              className="px-3 font-semibold uppercase tracking-wide text-slate-400"
            >
              Navigation
            </Typography>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 md:hidden"
              aria-label="Close menu"
            >
              <Icon icon={X} size="md" color="muted" />
            </button>
          </div>

          <nav aria-label="Main navigation" className="mt-4 space-y-1 md:mt-6">
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
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-slate-700/80 px-3 pt-4">
          <Typography
            variant="small"
            className="text-xs font-medium text-slate-400"
          >
            Theme
          </Typography>
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
};
