"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-24 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-zinc-900/80 text-slate-400 backdrop-blur-sm shadow-lg shadow-black/40 transition-all duration-300 hover:scale-110 hover:text-brand hover:border-brand/30 ${
        visible
          ? "pointer-events-auto opacity-100 translate-y-0"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp size={18} />
    </button>
  );
}