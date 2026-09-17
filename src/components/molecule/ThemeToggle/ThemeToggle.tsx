"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/atom/Button/Button";
import { Icon } from "@/components/atom/Icon";

export function ThemeToggle() {
  const isLight = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("dashboard-theme-change", onChange);
      return () =>
        window.removeEventListener("dashboard-theme-change", onChange);
    },
    () => window.localStorage.getItem("dashboard-theme") === "light",
    () => false,
  );

  // Apply the saved theme after hydration. The server snapshot remains dark so
  // the initial button markup stays hydration-safe.
  useEffect(() => {
    document.documentElement.dataset.theme = isLight ? "light" : "dark";
  }, [isLight]);

  const toggleTheme = () => {
    const nextIsLight = !isLight;
    window.localStorage.setItem(
      "dashboard-theme",
      nextIsLight ? "light" : "dark",
    );
    window.dispatchEvent(new Event("dashboard-theme-change"));
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className="h-10 w-10 rounded-xl border border-slate-700 bg-slate-900 p-0 text-slate-300 hover:bg-slate-800"
    >
      <Icon icon={isLight ? Moon : Sun} size="sm" color="primary" />
    </Button>
  );
}
