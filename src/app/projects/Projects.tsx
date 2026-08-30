"use client";
import { useEffect, useState } from "react";
import { projects } from "@/utils/constant";
import Techstack from "./Techstack";
import { projectStore } from "@/store/store";
import { projectType, tagType } from "@/utils/types";
import ProjectCard from "./ProjectCard";
import TechstackMobile from "./TechstackMobile";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";


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
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-start relative py-16 px-0 antialiased overflow-hidden">
      <div className="sticky top-0 w-full z-30 bg-gradient-to-b from-zinc-950 via-zinc-950/90 to-transparent backdrop-blur-sm pt-8 pb-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.07),transparent_70%)]" />
        <SectionHeading
          index="02"
          title="Selected Work"
          description="Live projects that showcase my obsession with immersive web experiences and clean engineering."
        />
        <div className="hidden lg:flex justify-center mt-8">
          <Techstack />
        </div>
        <div className="flex lg:hidden justify-center mt-8">
          <TechstackMobile />
        </div>
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
            <div className="py-6 px-8 border border-dashed border-amber-400/25 bg-black/40 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center text-slate-400 max-w-sm text-center">
              <p className="text-sm font-light">No projects found matching this selection stack.</p>
            </div>
          )}
          <div className="col-span-1 md:col-span-2 text-white border-amber-400/20 bg-black/40 hover:text-amber-400 transition-all backdrop-blur-md rounded-2xl flex flex-col items-center justify-center text-center">
            <Link href="https://github.com/Zulker-Nien?tab=repositories" target="_blank" className="w-full h-full py-8">
              View my personal projects at github
            </Link>

          </div>

        </div>
      </div>
    </div >
  );
};

export default Projects;