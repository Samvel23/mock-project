import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/atom/Button";
import { Icon } from "@/components/atom/Icon";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { isLight, toggleTheme } = useTheme();

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
