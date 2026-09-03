"use client";
import { education, research } from "@/utils/constant";
import { ExternalLink } from "lucide-react";
import Fade from "@/components/Fade";
import SectionIntro from "@/components/SectionIntro";

const Research = () => {
  return (
    <section id="research" className="relative bg-zinc-950 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.06),transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 lg:pt-32">
        <SectionIntro
          index="04 — Research"
          title="Learning, and leaving receipts."
          description="Formal education and peer-reviewed work — the foundations underneath the craft."
        />

        <div className="mt-14 lg:mt-16">
          {education.map((edu, index) => (
            <Fade key={index} y={20}>
              <div className="group border-t border-white/5 py-6 lg:py-7 grid gap-2 md:grid-cols-12 items-center transition-colors duration-300 hover:bg-white/[0.02]">
                <div className="md:col-span-3 font-mono text-xs lg:text-sm text-zinc-500">
                  {edu.date}
                </div>
                <div className="md:col-span-6">
                  <h3 className="text-lg lg:text-2xl font-light tracking-tight text-slate-100 group-hover:text-brand transition-colors duration-300">
                    {edu.title}
                  </h3>
                  <p className="text-sm text-brand/80 font-normal mt-0.5">
                    {edu.university}
                  </p>
                </div>
                <div className="md:col-span-3 md:text-right">
                  {edu.cgpa ? (
                    <span className="inline-block border border-brand/25 text-brand rounded-full px-3 py-1 text-xs font-mono">
                      CGPA {edu.cgpa}
                    </span>
                  ) : (
                    <span className="inline-block border border-white/10 text-zinc-500 rounded-full px-3 py-1 text-xs font-mono">
                      Certificate
                    </span>
                  )}
                </div>
              </div>
            </Fade>
          ))}
          <div className="border-t border-white/5" />
        </div>

        <div className="mt-16 lg:mt-24 pb-16" id="publications">
          <Fade>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-6 bg-gradient-to-r from-transparent to-brand/60" />
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-brand">
                {`/// 05 — Publications`}
              </span>
            </div>
          </Fade>

          <div>
            {research.map((pub, index) => (
              <Fade key={index} y={20}>
                <div className="group border-t border-white/10 py-7 lg:py-8 grid gap-3 md:grid-cols-12 items-start transition-colors duration-300 hover:bg-white/[0.02]">
                  <span className="md:col-span-1 font-mono text-sm text-zinc-600 pt-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="md:col-span-8 space-y-2">
                    <h3 className="text-xl lg:text-3xl font-extralight tracking-tight text-slate-100 leading-snug group-hover:text-brand transition-colors duration-300">
                      {pub.title}
                    </h3>
                    <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
                      {pub.type}
                      <span className="text-brand/60"> — </span>
                      {pub.journal ? `Journal: ${pub.journal}` : `Book: ${pub.book}`}
                    </p>
                  </div>

                  <div className="md:col-span-3 flex flex-wrap items-start justify-end gap-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border ${pub.status === "Published"
                          ? "bg-brand/10 text-brand border-brand/30"
                          : "bg-white/5 text-zinc-400 border-white/10"
                        }`}
                    >
                      {pub.status}
                    </span>
                    {pub.link && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-brand-light transition-colors duration-200 mt-1"
                      >
                        View
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </Fade>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;