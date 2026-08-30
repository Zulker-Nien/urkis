"use client";
import { useEffect, useState } from "react";
import { aboutStore } from "@/store/store";
import Images from "@/utils/image";
import { aboutType } from "@/utils/types";
import Image from "next/image";
import { useSpring, a as web } from "@react-spring/web";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { coreSkills } from "@/utils/constant";
import { ChevronDown, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const About = () => {
  const openAboutSlider = aboutStore(
    (state: aboutType) => state.openAboutSlider
  );
  const setOpenAboutSlider = aboutStore(
    (state: aboutType) => state.setOpenAboutSlider
  );
  const aboutTextStyle = useSpring({ open: Number(openAboutSlider) });
  const [viewCV, setViewCV] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector(".snap-mandatory");

    const handleScroll = () => {
      const scrollY = scrollContainer?.scrollTop || 0;

      if (scrollY > 1600 && !openAboutSlider) {
        setOpenAboutSlider(true);
      } else if (scrollY <= 1600 && openAboutSlider) {
        setOpenAboutSlider(false);
      }
    };
    scrollContainer?.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [openAboutSlider, setOpenAboutSlider]);

  return (
    <div className="h-[300vh] relative flex flex-col antialiased">
      <div
        className={`duration-500 bg-gradient-to-b from-[#1a1303] via-[#0d0c08] to-black h-screen w-screen flex flex-col items-center justify-center sticky top-0 overflow-hidden lg:pr-0 pr-2`}
      >
        <div className="duration-500 flex lg:flex-row flex-col items-center justify-center w-screen tracking-tight font-light">
          <div
            className={`duration-500 transform origin-center ${openAboutSlider ? "-translate-x-[13vh] md:-translate-x-0 -translate-y-[24vh] md:-translate-y-[28vh] scale-80 " : "translate-y-[13.5vh] md:translate-y-0 -translate-x-[17vh] md:-translate-x-0"
              } lg:text-5xl text-3xl font-extralight text-slate-100`}
          >
            Zulker <span className="text-amber-400/60 font-thin">{`{`}</span>
          </div>
          <Image
            className={`duration-500 ease-out ${openAboutSlider
              ? "lg:w-1/6 w-1/3 -translate-y-[34vh] md:-translate-y-[28vh] opacity-40 mix-blend-plus-lighter"
              : "lg:w-1/4 w-1/2 translate-y-0"
              }`}
            src={Images.Logo}
            alt="Logo"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
          />
          <div
            className={`duration-500 transform ${openAboutSlider ? "translate-x-[12vh] md:-translate-x-0 -translate-y-[45vh] md:-translate-y-[28vh] scale-90 " : "-translate-y-[15vh] md:translate-y-0 translate-x-[16vh] md:-translate-x-0"
              } lg:text-5xl text-3xl font-extralight text-slate-100`}
          >
            <span className="text-amber-400/60 font-thin">{`}`}</span> Nien
          </div>
        </div>

        {!openAboutSlider && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-amber-200/70 text-sm tracking-widest uppercase transition-opacity duration-300">
            <span className="text-xs font-medium">Scroll</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-amber-400" />
          </div>
        )}

        <web.div
          style={{
            opacity: aboutTextStyle.open.to([0, 1], [0, 1]),
            transform: aboutTextStyle.open.to([0, 2], ["translateY(100px)", "translateY(0px)"]),
          }}
          className="flex flex-col lg:gap-6 absolute w-full max-w-5xl px-6 pointer-events-none"
        >
          {openAboutSlider && (
            <div className="h-full flex flex-col items-center text-center pointer-events-auto mt-24 lg:mt-12">
              <p className="max-w-3xl lg:text-lg text-base text-slate-100/90 font-light leading-relaxed tracking-wide">
                I blend technology, design, and analysis to craft seamless
                digital experiences. With a Master’s in Software Engineering and
                experience across startups and industries, I merge technical
                innovation with user-focused design to build impactful
                solutions.
              </p>

              <h2 className="text-xs uppercase tracking-[0.2em] text-amber-400/80 font-semibold mt-10 mb-4">
                Core Stack & Expertise
              </h2>

              <div className="w-full bg-black/40 backdrop-blur-md border border-amber-400/10 p-6 rounded-2xl shadow-2xl shadow-black/60">
                <div className="grid grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center items-center">
                  <TooltipProvider>
                    {coreSkills.map((skill, index) => (
                      <Tooltip delayDuration={0} key={index}>
                        <TooltipTrigger className="group w-full flex flex-col items-center justify-center gap-2 transition-all duration-300">
                          <div className="w-12 h-12 rounded-xl bg-black/60 border border-white/5 flex items-center justify-center text-slate-300 group-hover:text-amber-300 group-hover:bg-amber-400/15 group-hover:border-amber-400/40 group-hover:scale-110 shadow-md transition-all duration-300">
                            <skill.icon className="w-5 h-5" />
                          </div>
                          <Label className="text-xs text-slate-400 font-medium tracking-wide group-hover:text-slate-200 transition-colors pointer-events-none truncate max-w-[80px]">
                            {skill.name}
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="bg-slate-900 border border-slate-800 text-slate-100 px-3 py-1.5 rounded-lg text-xs shadow-xl"
                        >
                          {skill.content}
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </TooltipProvider>
                </div>
              </div>
            </div>
          )}

          {openAboutSlider && (
            <div className="w-full py-4 flex items-center justify-center pointer-events-auto mt-6">
              <Button
                size="lg"
                onClick={() => setViewCV(true)}
                className="bg-amber-400 text-black hover:bg-amber-300 font-semibold tracking-wide rounded-full px-8 shadow-lg shadow-amber-950/40 transition-transform duration-200 active:scale-95"
              >
                View CV
              </Button>
            </div>
          )}
        </web.div>

        {viewCV && (
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-lg flex items-center justify-center p-6 z-50 animate-in fade-in duration-300">
            <div className="relative w-full max-w-4xl h-[85vh] bg-slate-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
              <div className="w-full h-12 bg-slate-950/80 border-b border-white/5 flex items-center justify-between px-4">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">Curriculum Vitae</span>
                <button
                  onClick={() => setViewCV(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
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
      </div>
    </div>
  );
};

export default About;