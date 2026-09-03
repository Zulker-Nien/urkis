"use client";

import { useEffect } from "react";
import { initTheme } from "@/store/themeStore";

export default function ThemeInit() {
  useEffect(() => {
    initTheme();
  }, []);
  return null;
}
