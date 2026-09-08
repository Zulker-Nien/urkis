"use client";

import { useEffect, useRef } from "react";
import { themeStore, THEMES } from "@/store/themeStore";

export default function SupportKoriWidget() {
  const theme = themeStore((s) => s.theme);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const color =
      THEMES.find((t) => t.name === theme)?.swatch[0] ?? "#fbbf24";

    const existing = document.getElementById("supportkori-widget");
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.id = "supportkori-widget";
    script.src = "https://www.supportkori.com/widget.js";
    script.dataset.id = "urkis";
    script.dataset.message = "Buy me a coffee";
    script.dataset.color = color;
    script.dataset.position = "right";
    script.className = "relative z-50";
    document.body.appendChild(script);

    const setVisible = (visible: boolean) => {
      document
        .querySelectorAll<HTMLElement>(
          ".sk-widget-btn, .sk-widget-iframe-container"
        )
        .forEach((el) => {
          el.style.display = visible ? "" : "none";
        });
    };

    const host = hostRef.current;
    if (host) {
      const observer = new IntersectionObserver(
        (entries) => setVisible(entries[0]?.isIntersecting ?? true),
        { threshold: 0 }
      );
      observer.observe(host);
      return () => {
        observer.disconnect();
        const el = document.getElementById("supportkori-widget");
        if (el) el.remove();
        document
          .querySelectorAll<HTMLElement>(
            ".sk-widget-btn, .sk-widget-iframe-container"
          )
          .forEach((el) => el.remove());
      };
    }
  }, [theme]);

  return <div ref={hostRef} className="h-px w-px" aria-hidden="true" />;
}