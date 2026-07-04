"use client";
import { animated, useInView, useSpring } from "@react-spring/web";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import Image from "next/image";
import { experienceType } from "@/utils/types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import SpotlightCard from "@/components/SpotlightCard";

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: experienceType[0];
  index: number;
}) => {
  const [ref, inView] = useInView({
    rootMargin: "-60px 0px",
    once: true,
  });
  const [isOpen, setIsOpen] = useState(false);

  const springStyles = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px)" : "translateY(30px)",
    config: { tension: 140, friction: 18 },
  });

  return (
    <animated.div style={springStyles} ref={ref}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <div className="cursor-pointer group">
            <VerticalTimelineElement
              position={index % 2 === 0 ? "left" : "right"}
              visible={true}
              contentStyle={{
                background: "transparent",
                boxShadow: "none",
                padding: "0px",
              }}
              contentArrowStyle={{ borderRight: "7px solid rgba(30, 27, 75, 0.8)" }}
              date={experience.date}
              dateClassName="!font-light lg:!text-slate-300 !text-slate-400 !opacity-1 lg:mx-4"
              iconStyle={{
                background: experience.iconBg || "#0f172a",
                boxShadow: "0 0 0 4px rgba(139, 92, 246, 0.3), inset 0 2px 4px rgba(0,0,0,0.5)",
                overflow: "hidden",
              }}
              icon={
                <div className="flex justify-center items-center w-full h-full p-2">
                  <Image
                    src={experience.icon}
                    alt={experience.company_name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
                  />
                </div>
              }
            >
              {/* Higher contrast cards that float distinctly on the new background */}
              <SpotlightCard
                className="custom-spotlight-card h-full bg-slate-900/85 border border-violet-500/20 backdrop-blur-md p-5 rounded-2xl transition-all duration-300 group-hover:border-violet-400/50 group-hover:bg-slate-900 shadow-xl shadow-black/40"
                spotlightColor="rgba(167, 139, 250, 0.15)"
              >
                <h3 className="text-slate-100 lg:text-lg text-base font-semibold tracking-wide">
                  {experience.title}
                </h3>
                <h4 className="text-sm font-medium text-violet-400 mt-1">
                  {experience.company_name}
                </h4>
              </SpotlightCard>
            </VerticalTimelineElement>
          </div>
        </SheetTrigger>

        {/* Sidebar Panel matching the deep theme aesthetics */}
        <SheetContent className="bg-slate-950/95 border-l border-violet-500/10 backdrop-blur-md text-slate-100 flex flex-col gap-6 w-full sm:max-w-md">
          <SheetHeader className="text-left space-y-4">
            <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-violet-500/20 p-3 flex items-center justify-center shadow-lg">
              <Image
                src={experience.icon}
                alt={experience.company_name}
                className="max-h-full object-contain"
              />
            </div>
            <div>
              <SheetTitle className="text-xl font-semibold tracking-tight text-slate-100">
                {experience.company_name}
              </SheetTitle>
              <SheetDescription className="text-slate-400 font-light text-sm mt-1">
                {experience.title} • <span className="text-violet-400 font-medium">{experience.date}</span>
              </SheetDescription>
            </div>
          </SheetHeader>

          <hr className="border-white/5" />

          <div className="flex-1 overflow-y-auto pr-2 text-slate-300 font-light text-sm leading-relaxed tracking-wide">
            {experience.points}
          </div>
        </SheetContent>
      </Sheet>
    </animated.div>
  );
};

export default ExperienceCard;