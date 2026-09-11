"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

export default function ModelLoader() {
  const { active, progress } = useProgress();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!active && progress >= 100) {
      const t = setTimeout(() => setHidden(true), 400);
      return () => clearTimeout(t);
    }
  }, [active, progress]);

  if (hidden) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col items-center gap-3 pb-8 transition-opacity duration-500"
      style={{ opacity: active ? 1 : 0 }}
    >
      <div className="relative h-1 w-48 overflow-hidden rounded-full bg-white/10">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-brand transition-all duration-300"
          style={{ width: `${Math.max(progress, 2)}%` }}
        />
      </div>
      <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-slate-500">
        Loading experience
      </span>
    </div>
  );
}