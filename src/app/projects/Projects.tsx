"use client";
import { useEffect, useState } from "react";
import { projects } from "@/utils/constant";
import Techstack from "./Techstack";
import { projectStore } from "@/store/store";
import { projectType, tagType } from "@/utils/types";
import TechstackMobile from "./TechstackMobile";
import { Globe, Github, ArrowUpRight } from "lucide-react";
import Fade from "@/components/Fade";
import SectionIntro from "@/components/SectionIntro";
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
    <section id="projects" className="relative bg-zinc-950 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.06),transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 lg:pt-32">
        <SectionIntro
          index="03 — Selected Work"
          title="Built to ship, built to last."
          description="A curation of live products — each one a blend of engineering discipline and obsessive attention to the details people feel."
        />

        <div className="mt-10 flex justify-center lg:justify-start">
          {isLargeScreen ? <Techstack /> : <TechstackMobile />}
        </div>

        <div className="mt-10 pb-16">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <Fade key={`${project.name}-${index}`} y={24}>
                <div className="group border-t border-white/10 py-8 lg:py-10 grid gap-4 md:grid-cols-12 items-center transition-colors duration-300 hover:bg-white/[0.02]">
                  <span className="md:col-span-1 font-mono text-sm text-amber-400/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <a
                    href={project.website || project.source_code_link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="md:col-span-5 block"
                  >
                    <h3 className="text-3xl md:text-4xl font-extralight tracking-tight text-slate-100 group-hover:text-amber-400 transition-all duration-300 group-hover:translate-x-2 flex flex-wrap items-center gap-3">
                      {project.name}
                      <ArrowUpRight className="w-7 h-7 text-amber-400 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                    </h3>
                  </a>

                  <div className="md:col-span-4 flex flex-wrap gap-x-3 gap-y-1">
                    {project.tags.slice(0, 4).map((tag, i) => (
                      <span
                        key={`${project.name}-${tag.name}`}
                        className="text-xs font-mono font-normal text-zinc-500 uppercase tracking-wider"
                      >
                        {tag.name.toLowerCase()}
                        {i < Math.min(project.tags.length, 4) - 1 && <span className="text-amber-400/60"> / </span>}
                      </span>
                    ))}
                  </div>

                  <div className="md:col-span-2 flex items-center gap-2 md:justify-end">
                    {project.website && (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Live Website"
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 text-slate-400 hover:text-amber-300 hover:border-amber-400/40 hover:bg-amber-400/10 transition-all duration-200"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                    {project.source_code_link && (
                      <a
                        href={project.source_code_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Source Code"
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 text-slate-400 hover:text-amber-300 hover:border-amber-400/40 hover:bg-amber-400/10 transition-all duration-200"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </Fade>
            ))
          ) : (
            <Fade>
              <div className="border-t border-white/10 py-16 flex items-center justify-center">
                <p className="text-sm text-slate-500 font-light text-center max-w-xs">
                  No projects match this stack selection just yet — but the
                  keyboard is warm.
                </p>
              </div>
            </Fade>
          )}

          <Fade>
            <Link
              href="https://github.com/Zulker-Nien?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-t border-b border-white/10 py-8 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors duration-300"
            >
              <span className="text-slate-300 font-light tracking-wide text-lg lg:text-xl group-hover:text-amber-400 transition-colors duration-300">
                More experiments on GitHub
              </span>
              <ArrowUpRight className="w-6 h-6 text-amber-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Link>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default Projects;