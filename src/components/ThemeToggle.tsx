"use client";

import { TbMoon, TbSun } from "react-icons/tb";

export default function ThemeToggle() {
  return (
    <button
      aria-label="Toggle dark mode"
      className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      onClick={() => {
        const root = document.documentElement;
        const isDark = root.classList.toggle("dark");
        try {
          localStorage.setItem("theme", isDark ? "dark" : "light");
        } catch {}
      }}
    >
      <span className="sr-only">Toggle theme</span>
      <span className="block dark:hidden" aria-hidden>
        <TbMoon />
      </span>
      <span className="hidden dark:block" aria-hidden>
        <TbSun />
      </span>
    </button>
  );
}
