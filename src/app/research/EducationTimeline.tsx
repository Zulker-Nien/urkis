"use client";
import { animated, useInView, useSpring } from "@react-spring/web";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import Image from "next/image";
import { educationType } from "@/utils/types";
import SpotlightCard from "@/components/SpotlightCard";

const EducationTimeline = ({
  education,
  index,
}: {
  education: educationType[0];
  index: number;
}) => {
  const [ref, inView] = useInView({
    rootMargin: "-60px 0px",
    once: true,
  });

  const springStyles = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px)" : "translateY(30px)",
    config: { tension: 140, friction: 18 },
  });

  return (
    <animated.div style={springStyles} ref={ref}>
      <VerticalTimelineElement
        position={index % 2 === 0 ? "left" : "right"}
        visible={true}
        contentStyle={{
          background: "transparent",
          boxShadow: "none",
          padding: "0px",
        }}
        contentArrowStyle={{ borderRight: "7px solid rgba(24, 24, 27, 0.9)" }}
        date={education.date}
        dateClassName="!font-light lg:!text-zinc-300 !text-zinc-400 !opacity-1 lg:mx-4"
        iconStyle={{
          background: education.iconBg || "#18181b",
          boxShadow: "0 0 0 4px rgba(251, 191, 36, 0.3), inset 0 2px 4px rgba(0,0,0,0.5)",
          overflow: "hidden",
        }}
        icon={
          <div className="flex justify-center items-center w-full h-full p-2">
            <Image
              src={education.icon}
              alt={education.university}
              className="w-full h-full object-contain"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
            />
          </div>
        }
      >
        <SpotlightCard
          className="custom-spotlight-card h-full bg-zinc-900/85 border border-amber-400/15 backdrop-blur-md p-5 rounded-2xl shadow-xl shadow-black/60 transition-all duration-300 hover:border-amber-400/40"
          spotlightColor="rgba(251, 191, 36, 0.12)"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-slate-100 lg:text-lg text-base font-semibold tracking-wide">
                {education.title}
              </h3>
              <h4 className="text-sm font-medium text-amber-400/90">
                {education.university}
              </h4>
            </div>

            {education.cgpa !== null && (
              <div className="flex flex-col items-end justify-center border-l border-white/5 pl-4 flex-shrink-0">
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">CGPA</span>
                <span className="text-base font-bold text-amber-400 tracking-wider">
                  {education.cgpa}
                </span>
              </div>
            )}
          </div>
        </SpotlightCard>
      </VerticalTimelineElement>
    </animated.div>
  );
};

export default EducationTimeline;