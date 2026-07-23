"use client";
import React from "react";
import EducationTimeline from "./EducationTimeline";
import { VerticalTimeline } from "react-vertical-timeline-component";
import { education, research } from "@/utils/constant";
import { ExternalLink, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Research = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-slate-950 to-slate-950 px-0 pb-24 antialiased overflow-hidden">
      <div className="w-full flex flex-col gap-24">

        <div className="w-full flex flex-col relative max-w-6xl mx-auto px-4">
          <div className="sticky top-0 w-full z-30 bg-gradient-to-b from-blue-950 via-blue-950/90 to-transparent backdrop-blur-sm pt-8 pb-12 text-center">
            <h2 className="lg:text-5xl text-3xl font-extralight tracking-tight text-slate-100 flex items-center justify-center gap-3">
              <GraduationCap className="w-8 h-8 text-sky-400 font-thin" />
              Education
            </h2>
          </div>

          <div className="mt-4">
            <VerticalTimeline lineColor="rgba(148, 163, 184, 0.15)" className="flex flex-col gap-6">
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
          <div className="text-center space-y-3 mb-12">
            <h2 className="lg:text-5xl text-3xl font-extralight tracking-tight text-slate-100 flex items-center justify-center gap-3">
              <BookOpen className="w-7 h-7 text-sky-400 font-thin" />
              Publications
            </h2>
            <p className="text-sm text-slate-400 font-light max-w-md mx-auto">
              Peer-reviewed academic research records, journals, and technical contributions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {research.map((pub, index) => (
              <div className="w-full group" key={index}>
                <div className="w-full h-[45vh] min-h-[360px] flex flex-col bg-slate-900/50 hover:bg-slate-900/80 border border-white/5 hover:border-sky-500/30 shadow-xl shadow-black/20 rounded-2xl p-5 transition-all duration-300 relative overflow-hidden">

                  <div className="flex-1 rounded-xl bg-slate-950/40 border border-white/5 p-4 overflow-y-auto mb-4 relative bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[length:100%_20px]">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-sky-400/60 block mb-2">Title</span>
                    <h3 className="text-slate-100 text-sm font-medium leading-relaxed tracking-wide">
                      {pub.title}
                    </h3>
                  </div>

                  <div className="space-y-3 pt-1 text-xs">
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Type: <strong className="text-slate-300 font-normal">{pub.type}</strong></span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide border ${pub.status === "Published"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-sky-500/10 text-sky-400 border-sky-500/20"
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
                          <Button size="sm" className="bg-slate-100 text-slate-950 hover:bg-white font-medium tracking-wide rounded-xl px-4 flex items-center gap-1.5 shadow-md">
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