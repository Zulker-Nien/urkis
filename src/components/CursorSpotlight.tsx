"use client";

import { useEffect, useRef } from "react";

const CursorSpotlight = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      el.style.setProperty("--spotlight-x", `${e.clientX}px`);
      el.style.setProperty("--spotlight-y", `${e.clientY}px`);
    };

    const onMouseLeave = () => {
      el.style.opacity = "0";
    };

    const onMouseEnter = () => {
      el.style.opacity = "1";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0"
      style={{
        zIndex: 50,
        opacity: 1,
        transition: "opacity 0.3s ease-in-out",
        background:
          "radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(251, 191, 36, 0.07), transparent 70%)",
      }}
    />
  );
};

export default CursorSpotlight;
