import { useEffect, useState } from "react";
import { projects } from "@/utils/constant";
import Techstack from "./Techstack";
import { projectStore } from "@/store/store";
import { projectType, tagType } from "@/utils/types";
import ProjectCard from "./ProjectCard";
import TechstackMobile from "./TechstackMobile";

const Projects = () => {
  const selectedStack = projectStore(
    (state: projectType) => state.selectedStack
  );

  const filteredProjects = projects.filter((project) =>
    selectedStack === "All Projects"
      ? true
      : project.tags.some(
          (tag: tagType) =>
            tag.name.toLowerCase() === selectedStack.toLowerCase()
        )
  );

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800/80 via-blue-500/80 to-blue-800/80 flex flex-col items-center justify-start relative">
      <h5 className={`lg:text-[4em] text-[2em] text-center text-white`}>
        My Projects
      </h5>
      {isLargeScreen ? <Techstack /> : <TechstackMobile />}
      <div className="flex items-start justify-center min-h-[50vh] lg:max-h-screen z-20 ">
        <div
          className={`duration-300  ${
            filteredProjects.length > 0
              ? "grid lg:grid-cols-2 grid-cols-1 lg:gap-8 gap-4"
              : "flex items-center justify-start"
          } lg:!px-64 px-4`}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard
                key={`project-${index}`}
                index={index}
                {...project}
              />
            ))
          ) : (
            <p className=" py-2 px-4 text-xl border border-white rounded-3xl flex items-center justify-center text-white text-center h-full">
              No projects found for this stack.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
