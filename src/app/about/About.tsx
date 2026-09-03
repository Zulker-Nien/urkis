"use client";
import { useState } from "react";
import Image from "next/image";
import Images from "@/utils/image";
import { coreSkills } from "@/utils/constant";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Fade from "@/components/Fade";
import Link from "next/link";

const stats = [
  { value: "6+", label: "Years of craft", link: "/#experience" },
  { value: "20+", label: "Companies served", link: "/#clients" },
  { value: "★★★★★", label: "Topseller on Upwork", link: "https://www.upwork.com/freelancers/~0130cad0881a233037" },
  { value: "3", label: "Publications", link: "/#publications" },
];

const About = () => {
  const [viewCV, setViewCV] = useState(false);

  return (
    <section id="about" className="relative bg-zinc-950 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.10),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 lg:pt-36 lg:pb-20 flex flex-col gap-12 lg:gap-16">
        <Fade>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-brand/60" />
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-brand">
              {`/// 01 — About`}
            </span>
          </div>
        </Fade>

        <Fade>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extralight tracking-tight text-slate-100 leading-[1.05] max-w-4xl">
            Design-minded engineer building{" "}
            <span className="text-brand">on the web&apos;s edge.</span>
          </h2>
        </Fade>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          <Fade>
            <p className="text-slate-300 font-light leading-relaxed text-lg max-w-xl">
              I blend technology, design, and analysis to craft seamless digital
              experiences. With a Master&apos;s in Software Engineering and
              experience across startups and industries, I merge technical
              innovation with user-focused design to build impactful solutions.
            </p>
          </Fade>

          <Fade>
            <div className="h-px w-full bg-white/5 mb-8 lg:hidden lg:mb-0" />
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Link
                  key={index}
                  href={stat.link}
                  className="border border-white/5 bg-zinc-900/40 rounded-2xl p-5 transition-colors duration-300 hover:border-brand/30"
                  target={stat.value === "★★★★★" ? "_blank" : undefined}
                  rel={stat.value === "★★★★★" ? "noopener noreferrer" : undefined}
                >
                  <div className="text-3xl font-extralight text-brand tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Button
                size="lg"
                onClick={() => setViewCV(true)}
                className="bg-brand text-black hover:bg-brand-light font-semibold tracking-wide rounded-full px-8 shadow-lg shadow-brand-dark/40 transition-all duration-300 active:scale-95"
              >
                View CV
              </Button>
            </div>
          </Fade>
        </div>
      </div>

      <Fade>
        <div className="relative border-y border-white/5 bg-black/30 py-5 overflow-hidden">
          <div className="flex overflow-hidden">
            <div className="marquee-track flex items-center w-max shrink-0">
              {[...coreSkills, ...coreSkills].map((skill, index) => (
                <span
                  key={index}
                  className="flex items-center gap-8 pr-8 text-slate-300 font-light text-sm tracking-wide uppercase whitespace-nowrap"
                >
                  {skill.name}
                  <span className="text-brand">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </Fade>

      <Image
        src={Images.Logo}
        alt="Zulker Nien"
        className="pointer-events-none absolute bottom-2 right-0 w-48 lg:w-64 opacity-[0.05] mix-blend-luminosity select-none"
      />

      {viewCV && (
        <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl h-[85vh] bg-zinc-900 rounded-2xl overflow-hidden border border-brand/15 shadow-2xl shadow-black/60 flex flex-col">
            <div className="w-full h-12 bg-black/60 border-b border-white/5 flex items-center justify-between px-5">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-medium font-mono">
                Curriculum Vitae
              </span>
              <button
                onClick={() => setViewCV(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-brand-light hover:bg-white/5 transition-all duration-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <iframe
              src="/Zulker_CV.pdf"
              className="w-full flex-1 border-none"
              title="Zulker CV"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default About;