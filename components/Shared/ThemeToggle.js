"use client";

import { useTheme } from "@/context/ThemeContext";
import { HiSun, HiMoon } from "react-icons/hi";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="btn btn-ghost btn-circle btn-sm text-ink hover:bg-primary/10 transition-all duration-300"
    >
      {theme === "dark" ? (
        <HiSun size={20} className="text-yellow-400" />
      ) : (
        <HiMoon size={20} className="text-primary" />
      )}
    </button>
  );
}
