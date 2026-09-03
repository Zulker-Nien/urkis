"use client";

import { create } from "zustand";

export type ThemeName = "amber" | "emerald" | "sky" | "rose" | "violet";
export type ModeName = "dark" | "light";

export const THEMES: { name: ThemeName; label: string; swatch: string[] }[] = [
  { name: "amber", label: "Amber", swatch: ["#fbbf24", "#09090b"] },
  { name: "emerald", label: "Emerald", swatch: ["#34d399", "#09090b"] },
  { name: "sky", label: "Sky", swatch: ["#38bdf8", "#09090b"] },
  { name: "rose", label: "Rose", swatch: ["#fb7185", "#09090b"] },
  { name: "violet", label: "Violet", swatch: ["#a78bfa", "#09090b"] },
];

interface ThemeStore {
  theme: ThemeName;
  mode: ModeName;
  setTheme: (theme: ThemeName) => void;
  setMode: (mode: ModeName) => void;
  reset: () => void;
}

const STORAGE_KEY = "urkis-settings";
export const DEFAULT_THEME: ThemeName = "amber";
export const DEFAULT_MODE: ModeName = "dark";

interface Stored {
  theme?: unknown;
  mode?: unknown;
}

function readStored(): Stored {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function applyTheme(theme: ThemeName) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (theme === "amber") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", theme);
}

function applyMode(mode: ModeName) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (mode === "dark") root.removeAttribute("data-mode");
  else root.setAttribute("data-mode", mode);
}

function persist(theme: ThemeName, mode: ModeName) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme, mode }));
}

export const themeStore = create<ThemeStore>((set) => ({
  theme: DEFAULT_THEME,
  mode: DEFAULT_MODE,
  setTheme: (theme) =>
    set((state) => {
      applyTheme(theme);
      persist(theme, state.mode);
      return { theme };
    }),
  setMode: (mode) =>
    set((state) => {
      applyMode(mode);
      persist(state.theme, mode);
      return { mode };
    }),
  reset: () => {
    applyTheme(DEFAULT_THEME);
    applyMode(DEFAULT_MODE);
    persist(DEFAULT_THEME, DEFAULT_MODE);
    set({ theme: DEFAULT_THEME, mode: DEFAULT_MODE });
  },
}));

export function initTheme() {
  if (typeof window === "undefined") return;
  const stored = readStored();
  const theme: ThemeName = THEMES.some((t) => t.name === stored.theme)
    ? (stored.theme as ThemeName)
    : DEFAULT_THEME;
  const mode: ModeName = stored.mode === "light" ? "light" : DEFAULT_MODE;
  applyTheme(theme);
  applyMode(mode);
  themeStore.setState({ theme, mode });
}
