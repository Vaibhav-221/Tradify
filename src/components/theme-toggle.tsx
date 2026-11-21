"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

import { usePrototype } from "@/components/prototype-provider";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const { notify } = usePrototype();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setTheme(
        document.documentElement.dataset.theme === "light" ? "light" : "dark",
      );
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.add("theme-transition");
    root.dataset.theme = nextTheme;
    root.classList.toggle("dark", nextTheme === "dark");
    setTheme(nextTheme);

    try {
      window.localStorage.setItem("tradify_theme", nextTheme);
    } catch {
      notify("Theme changed, but this browser could not save your preference.");
    }

    window.setTimeout(() => root.classList.remove("theme-transition"), 360);
  }

  const Icon = theme === "dark" ? Sun : Moon;
  const nextThemeLabel = theme === "dark" ? "light" : "dark";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileTap={{ scale: 0.92 }}
      aria-label={`Switch to ${nextThemeLabel} mode`}
      title={`Switch to ${nextThemeLabel} mode`}
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <motion.span
        key={theme}
        initial={{ opacity: 0, rotate: -35, scale: 0.75 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <Icon aria-hidden="true" className="size-4" />
      </motion.span>
    </motion.button>
  );
}
