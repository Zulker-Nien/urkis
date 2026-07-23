"use client";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiences } from "../../utils/constant";
import ExperienceCard from "./ExperienceCard";

const Experience = () => {
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-900 via-slate-950 to-purple-950 relative pb-16 px-0 antialiased">
      <div className="sticky top-0 w-full z-30 bg-gradient-to-b from-violet-900 via-violet-900/90 to-transparent backdrop-blur-sm pt-8 pb-12 text-center">
        <h2 className="lg:text-5xl text-3xl font-extralight tracking-tight text-slate-100">
          Work Experience
        </h2>
      </div>

      <div className="w-full flex flex-col max-w-6xl mx-auto px-4 mt-4">
        <VerticalTimeline lineColor="rgba(139, 92, 246, 0.2)" className="flex flex-col gap-6">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Experience;