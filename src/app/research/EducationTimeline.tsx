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
    rootMargin: "-50px 0px",
  });

  const springStyles = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(50px)",
    config: { tension: 120, friction: 14 },
  });

  return (
    <animated.div style={springStyles} ref={ref}>
      {/* shadow-md blur-2xl bg-white/10 */}
      <VerticalTimelineElement
        position={index % 2 === 0 ? "left" : "right"}
        visible={true}
        contentStyle={{
          background: "transparent",
          color: "#3d3d3d",
          fontWeight: "800",
          boxShadow: "0 0 0 0 #000",
          padding: "0px",
        }}
        contentArrowStyle={{ borderRight: "7px solid #000" }}
        date={education.date}
        dateClassName="!font-bold !text-black !opacity-1"
        iconStyle={{
          background: education.iconBg,
          overflow: "hidden",
        }}
        icon={
          <div className="flex justify-center items-center w-full h-full">
            <Image
              src={education.icon}
              alt={education.university}
              className="w-full h-full object-contain"
            />
          </div>
        }
      >
        <SpotlightCard
          className="custom-spotlight-card h-full"
          spotlightColor="rgba(255, 170, 0, 0.38)"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white lg:text-xl font-bold">
                {education.title}
              </h3>
              <h3 className="text-md font-bold text-orange-500 !m-0">
                {education.university}
              </h3>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3
                className={`text-md font-bold text-white !m-0 ${
                  education.cgpa === null && "hidden"
                }`}
              >
                CGPA
              </h3>
              <h3 className="text-md font-bold text-orange-500 !m-0">
                {education.cgpa}
              </h3>
            </div>
          </div>
        </SpotlightCard>
      </VerticalTimelineElement>
    </animated.div>
  );
};
export default EducationTimeline;
