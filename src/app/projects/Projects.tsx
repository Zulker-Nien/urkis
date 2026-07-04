"use client";
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
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-slate-950 to-blue-950 flex flex-col items-center justify-start relative py-16 px-0 antialiased overflow-hidden">
      <div className="text-center space-y-3 mb-10 z-20">
        <h2 className="lg:text-5xl text-3xl font-extralight tracking-tight text-slate-100">
          My Projects
        </h2>
        <p className="text-sm text-slate-400 font-light max-w-md mx-auto px-4">
          A collection of digital systems, architecture designs, and frontend craft.
        </p>
      </div>

      <div className="z-30 mb-12">
        {isLargeScreen ? <Techstack /> : <TechstackMobile />}
      </div>

      <div className="w-full flex-1 flex items-start justify-center z-20 max-w-7xl mx-auto px-4 lg:px-12">
        <div
          className={`w-full transition-all duration-500 ${filteredProjects.length > 0
              ? "grid lg:grid-cols-2 grid-cols-1 gap-6"
              : "flex items-center justify-center min-h-[30vh]"
            }`}
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
            <div className="py-6 px-8 border border-dashed border-white/10 bg-slate-900/40 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center text-slate-400 max-w-sm text-center">
              <p className="text-sm font-light">No projects found matching this selection stack.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;