"use client";
import { useSprings, animated, useInView } from "@react-spring/web";
import { projectStore } from "@/store/store";
import { projectType } from "@/utils/types";

const techStackItems = [
  "All Projects",
  "Typescript",
  "Reactjs",
  "Threejs",
  "Nextjs",
  "Nodejs",
  "GraphQL",
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
      delay: index * 40, // Crisper sequential animation cascade
    }))
  );

  return (
    <div className="w-full flex items-center justify-center" ref={ref}>
      <div className="flex flex-wrap items-center justify-center gap-3 bg-slate-950/40 p-2 rounded-2xl border border-white/5 backdrop-blur-md">
        {springs.map((techStyles, index) => {
          const isSelected = selectedStack === techStackItems[index];
          return (
            <animated.button
              key={techStackItems[index]}
              style={techStyles}
              onClick={() => setSelectedStack(techStackItems[index])}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium tracking-wide transition-all duration-300 ${isSelected
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/30 border border-blue-400/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
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