"use client";
import React from "react";
import EducationTimeline from "./EducationTimeline";
import { VerticalTimeline } from "react-vertical-timeline-component";
import { education, research } from "@/utils/constant";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";

const Research = () => {
  return (
    <div className="min-h-screen bg-zinc-950 px-0 pb-24 antialiased overflow-hidden">
      <div className="w-full flex flex-col gap-24">

        <div className="w-full flex flex-col relative max-w-6xl mx-auto px-4">
          <div className="sticky top-0 w-full z-30 bg-gradient-to-b from-zinc-950 via-zinc-950/90 to-transparent backdrop-blur-sm pt-8 pb-12">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.07),transparent_70%)]" />
            <SectionHeading index="03" title="Education" />
          </div>

          <div className="mt-4">
            <VerticalTimeline lineColor="rgba(251, 191, 36, 0.15)" className="flex flex-col gap-6">
              {education.map((edu, index) => (
                <EducationTimeline
                  education={edu}
                  key={index}
                  index={index}
                />
              ))}
            </VerticalTimeline>
          </div>
        </div>

        <div className="w-full flex flex-col relative max-w-7xl mx-auto px-4 lg:px-12">
          <SectionHeading
            index="04"
            title="Publications"
            description="Peer-reviewed academic research records, journals, and technical contributions."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {research.map((pub, index) => (
              <div className="w-full group" key={index}>
                <div className="w-full h-[45vh] min-h-[360px] flex flex-col bg-zinc-900/50 hover:bg-zinc-900/80 border border-amber-400/10 hover:border-amber-400/40 shadow-xl shadow-black/60 rounded-2xl p-5 transition-all duration-300 relative overflow-hidden">

                  <div className="flex-1 rounded-xl bg-black/40 border border-white/5 p-4 overflow-y-auto mb-4 relative bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[length:100%_20px]">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400/70 block mb-2">Title</span>
                    <h3 className="text-slate-100 text-sm font-medium leading-relaxed tracking-wide">
                      {pub.title}
                    </h3>
                  </div>

                  <div className="space-y-3 pt-1 text-xs">
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Type: <strong className="text-slate-300 font-normal">{pub.type}</strong></span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide border ${pub.status === "Published"
                          ? "bg-amber-400/10 text-amber-400 border-amber-400/30"
                          : "bg-white/5 text-zinc-400 border-white/10"
                        }`}>
                        {pub.status}
                      </span>
                    </div>

                    <p className="text-slate-300 font-light line-clamp-2 leading-relaxed border-t border-white/5 pt-3">
                      {pub.journal === undefined ? `Book: ${pub.book}` : `Journal: ${pub.journal}`}
                    </p>

                    <div className="flex items-center justify-end w-full pt-1">
                      {pub.link && (
                        <Link href={`${pub.link}`} passHref target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="bg-amber-400 text-black hover:bg-amber-300 font-semibold tracking-wide rounded-xl px-4 flex items-center gap-1.5 shadow-md shadow-amber-950/40">
                            <span>View</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Research;