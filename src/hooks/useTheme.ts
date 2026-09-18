import { useEffect, useSyncExternalStore } from "react";

const THEME_KEY = "dashboard-theme";
const THEME_EVENT = "dashboard-theme-change";

function subscribe(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}

function getSnapshot() {
  return window.localStorage.getItem(THEME_KEY) === "light";
}

function getServerSnapshot() {
  return false;
}

export const useTheme = () => {
  const isLight = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    document.documentElement.dataset.theme = isLight ? "light" : "dark";
  }, [isLight]);

  const toggleTheme = () => {
    const nextIsLight = !isLight;
    window.localStorage.setItem(THEME_KEY, nextIsLight ? "light" : "dark");
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return {
    isLight,
    theme: isLight ? "light" : "dark",
    toggleTheme,
  };
};
