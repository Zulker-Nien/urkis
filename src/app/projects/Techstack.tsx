"use client";
import { useSpring, animated, useInView } from "@react-spring/web";
import { projectStore } from "@/store/store";
import { projectType } from "@/utils/types";

// Define tech stack items
const techStackItems = [
  "All Projects",
  "Typescript",
  "Reactjs",
  "Threejs",
  "Nextjs",
  "Nodejs",
  "GraphQL",
];

const useTechSpring = (index: number, inView: boolean) => {
  return useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(100px)",
    config: { tension: 120, friction: 14 },
    delay: index * 100,
  });
};

const Techstack = () => {
  // InView detection
  const [ref, inView] = useInView({
    rootMargin: "-50px 0px",
  });

  // Project store state
  const selectedStack = projectStore(
    (state: projectType) => state.selectedStack
  );
  const setSelectedStack = projectStore(
    (state: projectType) => state.setSelectedStack
  );

  return (
    <div className="w-full flex h-full m-0 p-0 ">
      <div className="w-full flex items-center justify-center gap-8" ref={ref}>
        {techStackItems.map((item, index) => {
          const techStyles = useTechSpring(index, inView);

          return (
            <animated.h4
              key={item}
              style={techStyles}
              className={`min-w-max cursor-pointer ${
                selectedStack === item ? "text-gray-800" : "text-white"
              }`}
              onClick={() => setSelectedStack(item)}
            >
              {item}
            </animated.h4>
          );
        })}
      </div>
    </div>
  );
};

export default Techstack;
