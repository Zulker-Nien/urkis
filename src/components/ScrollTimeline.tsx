"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "endorsements", label: "Endorsements" },
  { id: "contact", label: "Contact" },
] as const;

const ACTIVE_OFFSET = 0.4;
const DOT_STEP = 24.4;

export default function ScrollTimeline() {
  const [active, setActive] = useState(-1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * ACTIVE_OFFSET);

      let current = -1;
      for (let i = 0; i < SECTIONS.length; i++) {
        const el = document.getElementById(SECTIONS[i].id);
        if (
          el &&
          el.getBoundingClientRect().top <= window.innerHeight * (1 - ACTIVE_OFFSET)
        ) {
          current = i;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Sections"
      className={`fixed right-5 lg:right-10 top-1/2 z-40 -translate-y-1/2 transition-opacity duration-500 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="relative flex flex-col items-center py-1">
        <span className="pointer-events-none absolute left-1/2 top-2 w-px -translate-x-1/2 bg-white/10" style={{ bottom: "0.5rem" }} />
        <span
          className="pointer-events-none absolute left-1/2 top-2 w-px -translate-x-1/2 rounded-full bg-brand transition-[height] duration-300"
          style={{ height: `${Math.max(0, active) * DOT_STEP}px` }}
        />
        {SECTIONS.map((section, i) => {
          const isReached = i <= active;
          const isActive = i === active;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => goTo(section.id)}
              aria-label={`Go to ${section.label}`}
              title={section.label}
              className="group relative z-10"
            >
              <span
                className={`pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-zinc-950/80 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-slate-300 opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 ${
                  isActive ? "text-brand-light" : ""
                }`}
              >
                {section.label}
              </span>
              <span
                className={`block rounded-full border transition-all duration-300 ${
                  isActive
                    ? "h-3.5 w-3.5 scale-125 border-brand bg-brand shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                    : isReached
                      ? "h-2.5 w-2.5 border-brand/70 bg-brand/70"
                      : "h-2.5 w-2.5 border-white/25 bg-transparent group-hover:border-brand/60"
                }`}
                style={{ margin: i > 0 ? `${DOT_STEP - 10}px 0 0` : 0 }}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}