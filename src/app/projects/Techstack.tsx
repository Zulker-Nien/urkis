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
    rootMargin: "-50px 0px",
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
      transform: inView ? "translateX(0)" : "translateX(100px)",
      config: { tension: 120, friction: 14 },
      delay: index * 100,
    }))
  );

  return (
    <div className="w-full flex h-full m-0 p-0 ">
      <div className="w-full flex items-center justify-center gap-8" ref={ref}>
        {springs.map((techStyles, index) => (
          <animated.h4
            key={techStackItems[index]}
            style={techStyles}
            className={`min-w-max cursor-pointer ${
              selectedStack === techStackItems[index]
                ? "text-slate-950"
                : "text-slate-200"
            }`}
            onClick={() => setSelectedStack(techStackItems[index])}
          >
            {techStackItems[index]}
          </animated.h4>
        ))}
      </div>
    </div>
  );
};

export default Techstack;
