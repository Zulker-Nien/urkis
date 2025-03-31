"use client";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiences } from "../../utils/constant";
import ExperienceCard from "./ExperienceCard";

const Experience = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-800/80 via-pink-600/80 to-pink-800/80 relative pb-0 px-0">
      <h5
        className={`lg:text-[4em] text-[2em] text-slate-200 text-center  sticky top-0 w-full drop-shadow-lg drop-shadow-black z-30 bg-gradient-to-b from-pink-800 from-30% to-transparent`}
      >
        Work Experience
      </h5>

      <div className=" w-full flex flex-col">
        <VerticalTimeline lineColor="#232d3b" className="flex flex-col gap-8">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Experience;
