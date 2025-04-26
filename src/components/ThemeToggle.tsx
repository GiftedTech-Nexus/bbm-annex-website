
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn, getInitialTheme, applyTheme } from "@/lib/utils";

// Needs the "dark:" classes to be enabled in Tailwind!

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Sync with system preference (listen for changes)
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (!localStorage.getItem("theme")) {
        setTheme(mql.matches ? "dark" : "light");
      }
    };
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme(t => (t === "dark" ? "light" : "dark"));
  };

  return (
    <button
      aria-label="Toggle dark/light mode"
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center justify-center transition-colors rounded-full w-10 h-10 border border-border bg-muted/50 hover:bg-techwork-purple/10 focus:outline-none focus:ring-2 focus:ring-techwork-purple",
      )}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      type="button"
    >
      <Sun className="h-5 w-5 text-yellow-400 transition-all duration-300 dark:opacity-0 dark:scale-75" />
      <Moon className="h-5 w-5 text-techwork-purple absolute transition-all duration-300 opacity-0 dark:opacity-100 dark:scale-100" />
    </button>
  );
};
