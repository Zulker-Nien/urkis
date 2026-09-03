"use client";
import { useSprings, animated, useInView } from "@react-spring/web";
import { projectStore } from "@/store/store";
import { projectType } from "@/utils/types";

const techStackItems = [
  "All Projects",
  "Typescript",
  "Threejs",
  "Nextjs",
  "Nestjs",
  "Redis",
  "PostgreSQL",
];

const Techstack = () => {
  const [ref, inView] = useInView({
    rootMargin: "-40px 0px",
    once: true,
  });
  const selectedStack = projectStore(
    (state: projectType) => state.selectedStack
  );
  const setSelectedStack = projectStore(
    (state: projectType) => state.setSelectedStack
  );

  const springs = useSprings(
    techStackItems.length,
    techStackItems.map((_, index) => ({
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0px)" : "translateY(15px)",
      config: { tension: 150, friction: 16 },
      delay: index * 40,
    }))
  );

  return (
    <div className="w-full flex items-center justify-center" ref={ref}>
      <div className="flex flex-wrap items-center justify-center gap-3 bg-black/40 p-2 rounded-2xl border border-brand/10 backdrop-blur-md">
        {springs.map((techStyles, index) => {
          const isSelected = selectedStack === techStackItems[index];
          return (
            <animated.button
              key={techStackItems[index]}
              style={techStyles}
              onClick={() => setSelectedStack(techStackItems[index])}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium tracking-wide transition-all duration-300 ${isSelected
                  ? "bg-brand text-black shadow-md shadow-brand-dark/40 border border-brand-light/60"
                  : "text-slate-400 hover:text-brand-light hover:bg-brand/10 border border-transparent"
                }`}
            >
              {techStackItems[index]}
            </animated.button>
          );
        })}
      </div>
    </div>
  );
};

export default Techstack;