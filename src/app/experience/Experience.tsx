"use client";
import { useState } from "react";
import Image from "next/image";
import { experiences } from "@/utils/constant";
import { Button } from "@/components/ui/button";
import { ChevronDown, X, FileText } from "lucide-react";
import Fade from "@/components/Fade";
import SectionIntro from "@/components/SectionIntro";

const Experience = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [viewJRL, setViewJRL] = useState<number | null>(null);

  return (
    <section id="experience" className="relative bg-zinc-950 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.06),transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 lg:pt-32">
        <SectionIntro
          index="02 — Experience"
          title="A track record, not a timeline."
          description="Six years shipping real products — from agency intern and business analyst to freelance engineer and team lead."
        />

        <div className="mt-14 lg:mt-20 pb-16">
          {experiences.map((experience, index) => {
            const isOpen = expanded === index;
            return (
              <Fade key={index} y={24}>
                <div
                  className="group border-t border-white/5 py-8 lg:py-10 grid gap-4 md:grid-cols-12 items-start cursor-pointer transition-colors duration-300 hover:bg-white/[0.02]"
                  onClick={() => setExpanded(isOpen ? null : index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setExpanded(isOpen ? null : index);
                    }
                  }}
                >
                  <div className="md:col-span-3 font-mono text-xs lg:text-sm text-amber-400/80 pt-1">
                    {experience.date}
                  </div>

                  <div className="md:col-span-7 space-y-2">
                    <h3 className="text-2xl lg:text-4xl font-extralight tracking-tight text-slate-100 group-hover:text-amber-400 transition-colors duration-300 leading-tight">
                      {experience.company_name}
                    </h3>
                    <p className="text-sm lg:text-base text-zinc-400 font-light">
                      {experience.title}
                    </p>

                    <div
                      className={`grid transition-all duration-500 ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100 pt-4"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-slate-400 text-sm font-light leading-relaxed border-l-2 border-amber-400/30 pl-5">
                          {experience.points}
                        </p>
                        {experience.jrl && (
                          <div className="mt-5 pl-5">
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setViewJRL(index);
                              }}
                              className="bg-amber-400 text-black hover:bg-amber-300 font-semibold rounded-full px-5 gap-2"
                            >
                              View JRL
                              <FileText className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between gap-4 md:flex-col md:items-end md:justify-end h-full">
                    <span className="font-mono text-xs text-zinc-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="hidden md:flex h-12 w-12 rounded-xl bg-white items-center justify-center overflow-hidden">
                      <Image
                        src={experience.icon}
                        alt={experience.company_name}
                        height={28}
                        width={28}
                        className="w-7 h-7 object-contain"
                      />
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              </Fade>
            );
          })}
          <div className="border-t border-white/5" />
        </div>
      </div>

      {viewJRL !== null && experiences[viewJRL]?.jrl && (
        <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl h-[85vh] bg-zinc-900 rounded-2xl overflow-hidden border border-amber-400/15 shadow-2xl shadow-black/60 flex flex-col">
            <div className="w-full h-12 bg-black/60 border-b border-white/5 flex items-center justify-between px-5">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-medium font-mono">
                Job Reference Letter
              </span>
              <button
                onClick={() => setViewJRL(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-white/5 transition-all duration-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <iframe
              src={experiences[viewJRL].jrl}
              className="w-full flex-1 border-none"
              title="Job Reference Letter"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Experience;