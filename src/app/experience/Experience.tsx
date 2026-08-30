"use client";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiences } from "../../utils/constant";
import ExperienceCard from "./ExperienceCard";
import SectionHeading from "@/components/SectionHeading";

const Experience = () => {
  return (
    <div className="min-h-screen bg-zinc-950 relative pb-16 px-0 antialiased">
      <div className="sticky top-0 w-full z-30 bg-gradient-to-b from-zinc-950 via-zinc-950/90 to-transparent backdrop-blur-sm pt-8 pb-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.07),transparent_70%)]" />
        <SectionHeading
          index="01"
          title="Work Experience"
          description="From agency intern to freelance and startup engineer — a track record of shipping real products people use."
        />
      </div>

      <div className="w-full flex flex-col max-w-6xl mx-auto px-4 mt-4">
        <VerticalTimeline lineColor="rgba(251, 191, 36, 0.25)" className="flex flex-col gap-6">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Experience;