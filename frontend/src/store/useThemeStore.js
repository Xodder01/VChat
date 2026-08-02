import { create } from "zustand";

const getInitialTheme = () => {
  const saved = localStorage.getItem("vchat-theme");
  // If user has never set a preference, default to light
  if (saved === "dark" || saved === "light") return saved;
  return "light";
};

export const useThemeStore = create((set, get) => ({
  theme: "light", // will be replaced in initTheme

  toggleTheme: () => {
    set((state) => {
      const next = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("vchat-theme", next);
      if (next === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return { theme: next };
    });
  },

  initTheme: () => {
    const theme = getInitialTheme();
    // Save so it persists next visit
    localStorage.setItem("vchat-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    set({ theme });
  },
}));
