"use client";

import { useEffect } from "react";
import { themeStore, THEMES } from "@/store/themeStore";

export default function SupportKoriWidget() {
  const theme = themeStore((s) => s.theme);

  useEffect(() => {
    const color =
      THEMES.find((t) => t.name === theme)?.swatch[0] ?? "#fbbf24";

    const existing = document.getElementById("supportkori-widget");
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.id = "supportkori-widget";
    script.src = "https://www.supportkori.com/widget.js";
    script.dataset.id = "urkis";
    script.dataset.message = "Support urkis";
    script.dataset.color = color;
    script.dataset.position = "right";
    document.body.appendChild(script);
  }, [theme]);

  return null;
}
